import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;

// Lazy initialized Gemini client
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set in environment. Gemini features will return informative errors.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();

  // Allow larger payload for image uploads (base64)
  app.use(express.json({ limit: '35mb' }));
  app.use(express.urlencoded({ extended: true, limit: '35mb' }));

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // 2. Gemini Multi-turn Chat API
  // Supported models: gemini-3.1-pro-preview (complex), gemini-3.5-flash (general), gemini-3.1-flash-lite (fast)
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, model = 'gemini-3.5-flash', systemInstruction } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      const ai = getGeminiClient();

      // Format messages into Gemini contents format
      const formattedContents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      // Selected model or fallback
      const targetModel = model || 'gemini-3.5-flash';

      const response = await ai.models.generateContent({
        model: targetModel,
        contents: formattedContents,
        config: {
          systemInstruction:
            systemInstruction ||
            'You are Toolora AI, a world-class multi-modal creative intelligence assistant. You help users generate compelling content, images, videos, code, and creative ideas with high precision and engaging clarity.',
        },
      });

      res.json({
        reply: response.text || 'No response generated.',
        modelUsed: targetModel,
      });
    } catch (err: any) {
      console.error('Error in /api/chat:', err);
      // If preferred model fails, attempt fallback to gemini-3.8-flash
      try {
        const { messages, systemInstruction } = req.body;
        const ai = getGeminiClient();
        const formattedContents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents,
          config: { systemInstruction },
        });
        return res.json({
          reply: response.text || 'No response generated.',
          modelUsed: 'gemini-3.8-flash (fallback)',
        });
      } catch (fallbackErr: any) {
        return res.status(500).json({
          error: err.message || 'Gemini chat processing failed',
        });
      }
    }
  });

  // 3. Image Generation and Editing API (using gemini-3.1-flash-image-preview)
  app.post('/api/generate-image', async (req, res) => {
    try {
      const {
        prompt,
        image, // optional base64 image for image editing mode
        mimeType = 'image/png',
        aspectRatio = '1:1',
        model = 'gemini-3.1-flash-image-preview',
      } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const ai = getGeminiClient();

      const parts: any[] = [];
      if (image) {
        // Strip base64 prefix if present
        const cleanBase64 = image.replace(/^data:image\/[a-z]+;base64,/, '');
        parts.push({
          inlineData: {
            data: cleanBase64,
            mimeType: mimeType || 'image/png',
          },
        });
      }
      parts.push({ text: prompt });

      // Primary model: gemini-3.1-flash-image-preview (with fallback)
      let primaryModel = model || 'gemini-3.1-flash-image-preview';
      let response;

      try {
        response = await ai.models.generateContent({
          model: primaryModel,
          contents: { parts },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio || '1:1',
            },
          },
        });
      } catch (firstErr: any) {
        console.warn(`Primary image model ${primaryModel} failed, trying fallback:`, firstErr.message);
        primaryModel = 'gemini-3.1-flash-image';
        response = await ai.models.generateContent({
          model: primaryModel,
          contents: { parts },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio || '1:1',
            },
          },
        });
      }

      let generatedImageUrl = '';
      let textFeedback = '';

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            const returnedMime = part.inlineData.mimeType || 'image/png';
            generatedImageUrl = `data:${returnedMime};base64,${part.inlineData.data}`;
          } else if (part.text) {
            textFeedback += part.text;
          }
        }
      }

      if (!generatedImageUrl) {
        return res.status(500).json({
          error: textFeedback || 'No image was returned by the model.',
        });
      }

      res.json({
        imageUrl: generatedImageUrl,
        feedback: textFeedback,
        modelUsed: primaryModel,
      });
    } catch (err: any) {
      console.error('Error in /api/generate-image:', err);
      res.status(500).json({
        error: err.message || 'Image generation failed',
      });
    }
  });

  // 4. Video Generation (Text to Video & Animate Image to Video with Veo)
  // Model: veo-3.1-fast-generate-preview
  app.post('/api/generate-video', async (req, res) => {
    try {
      const {
        prompt,
        image, // optional base64 photo for image-to-video animation
        mimeType = 'image/png',
        aspectRatio = '16:9', // '16:9' or '9:16'
        model = 'veo-3.1-fast-generate-preview',
      } = req.body;

      const ai = getGeminiClient();
      const targetModel = model || 'veo-3.1-fast-generate-preview';
      const cleanAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';

      let operation;

      if (image) {
        // Photo animation (image-to-video)
        const cleanBase64 = image.replace(/^data:image\/[a-z]+;base64,/, '');
        operation = await ai.models.generateVideos({
          model: targetModel,
          prompt: prompt || 'Animate this photo with cinematic natural camera motion, smooth motion and realistic atmospheric depth',
          image: {
            imageBytes: cleanBase64,
            mimeType: mimeType || 'image/png',
          },
          config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: cleanAspectRatio,
          },
        });
      } else {
        // Text-to-video
        if (!prompt) {
          return res.status(400).json({ error: 'Prompt is required for text-to-video' });
        }
        operation = await ai.models.generateVideos({
          model: targetModel,
          prompt: prompt,
          config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: cleanAspectRatio,
          },
        });
      }

      res.json({
        operationName: operation.name,
        modelUsed: targetModel,
        aspectRatio: cleanAspectRatio,
      });
    } catch (err: any) {
      console.error('Error in /api/generate-video:', err);
      res.status(500).json({
        error: err.message || 'Veo video generation failed to initiate',
      });
    }
  });

  // 5. Poll Veo Video Generation Status
  app.post('/api/video-status', async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: 'operationName is required' });
      }

      const ai = getGeminiClient();
      const op = new GenerateVideosOperation();
      op.name = operationName;

      const updated = await ai.operations.getVideosOperation({ operation: op });

      res.json({
        done: Boolean(updated.done),
        error: updated.error || null,
      });
    } catch (err: any) {
      console.error('Error in /api/video-status:', err);
      res.status(500).json({
        error: err.message || 'Failed to check video status',
      });
    }
  });

  // 6. Download / Stream Veo Video
  app.post('/api/video-download', async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: 'operationName is required' });
      }

      const ai = getGeminiClient();
      const op = new GenerateVideosOperation();
      op.name = operationName;

      const updated = await ai.operations.getVideosOperation({ operation: op });
      const videoUri = updated.response?.generatedVideos?.[0]?.video?.uri;

      if (!videoUri) {
        return res.status(404).json({ error: 'Video URI not found in operation response' });
      }

      const apiKey = process.env.GEMINI_API_KEY || '';
      const videoRes = await fetch(videoUri, {
        headers: {
          'x-goog-api-key': apiKey,
        },
      });

      if (!videoRes.ok) {
        return res.status(videoRes.status).json({ error: 'Failed to stream video from storage' });
      }

      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', 'inline; filename="toolora-video.mp4"');

      // Convert web stream to node stream
      const arrayBuffer = await videoRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      res.send(buffer);
    } catch (err: any) {
      console.error('Error in /api/video-download:', err);
      res.status(500).json({
        error: err.message || 'Failed to download video',
      });
    }
  });

  // 7. General Text Copywriting / Generation API
  app.post('/api/generate-text', async (req, res) => {
    try {
      const { prompt, tone = 'Professional', contentType = 'General', length = 'Medium', language = 'English' } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const ai = getGeminiClient();
      const systemInstruction = `You are Toolora AI's high-performance content engine. 
Write ${contentType} in ${language}. Tone: ${tone}. Length requirement: ${length}.
Produce polished, well-formatted, compelling output.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: { systemInstruction },
      });

      res.json({
        text: response.text || '',
        modelUsed: 'gemini-3.5-flash',
      });
    } catch (err: any) {
      console.error('Error in /api/generate-text:', err);
      res.status(500).json({
        error: err.message || 'Text generation failed',
      });
    }
  });

  // Vite middleware setup (Express + Vite)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Toolora AI Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
