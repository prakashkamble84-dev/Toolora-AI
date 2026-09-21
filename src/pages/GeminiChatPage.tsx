import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Copy,
  Check,
  Trash2,
  Cpu,
  Coins,
  Terminal,
  PenTool,
  BrainCircuit,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  systemInstruction: string;
}

const ROLES: RoleOption[] = [
  {
    id: 'general',
    title: 'General Assistant',
    description: 'Everyday creative reasoning and synthesis',
    icon: Bot,
    systemInstruction:
      'You are Toolora AI, a world-class multi-modal creative intelligence assistant. Provide structured, accurate, well-crafted, and concise responses.',
  },
  {
    id: 'coder',
    title: 'Code Architect',
    description: 'Full-stack software engineering and architecture',
    icon: Terminal,
    systemInstruction:
      'You are an expert Lead Software Engineer and Architect. Provide production-ready, clean, well-commented code and explain design trade-offs.',
  },
  {
    id: 'writer',
    title: 'Content Strategist',
    description: 'High-converting copy and editorial prose',
    icon: PenTool,
    systemInstruction:
      'You are an award-winning creative copywriter and content strategist. Write engaging, evocative copy tailored to target audiences with crisp cadence.',
  },
  {
    id: 'analyst',
    title: 'Strategic Analyst',
    description: 'Deep business synthesis and market breakdown',
    icon: BrainCircuit,
    systemInstruction:
      'You are a Senior Strategic Research Analyst. Provide structured, executive-level breakdowns with clear headers, bullet points, and actionable insights.',
  },
];

const MODELS = [
  {
    id: 'gemini-3.5-flash',
    name: 'Gemini 3.5 Flash',
    desc: 'Ultra-fast multimodal reasoning and quick generation',
  },
  {
    id: 'gemini-3.1-pro-preview',
    name: 'Gemini 3.1 Pro',
    desc: 'Complex analysis, long-form logic, and coding architecture',
  },
];

interface GeminiChatPageProps {
  onNavigate: (path: string) => void;
}

export const GeminiChatPage: React.FC<GeminiChatPageProps> = ({ onNavigate }) => {
  const { user, deductCredits } = useAuth();
  const { showToast } = useToast();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.5-flash');
  const [selectedRole, setSelectedRole] = useState<RoleOption>(ROLES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPrompt = inputPrompt.trim();
    if (!cleanPrompt || isLoading) return;

    if ((user?.credits ?? 0) < 1) {
      showToast('Insufficient credits. Please upgrade your plan.', 'error');
      onNavigate('/pricing');
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: cleanPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          model: selectedModel,
          systemInstruction: selectedRole.systemInstruction,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to receive response from Gemini server');
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || selectedModel,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      deductCredits(1);
    } catch (err: any) {
      console.error('Chat error:', err);
      showToast(err.message || 'Error communicating with Gemini', 'error');

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Encountered an issue: ${err.message}. Please check your connection or API key.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    if (messages.length === 0) return;
    setMessages([]);
    showToast('Conversation cleared', 'info');
  };

  const samplePrompts = [
    'Design a scalable multimodal pipeline architecture for enterprise creators',
    'Write an engaging launch announcement for Toolora AI creative studio',
    'Explain the differences between diffusion models and autoregressive video generation',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col h-[calc(100vh-5.5rem)] text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DED4] shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[24px] font-bold text-[#172033] tracking-tight font-display flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-[10px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
                <MessageSquare className="w-4.5 h-4.5" />
              </span>
              <span>Gemini Chat</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-[6px] text-[11px] font-bold bg-[#FAF7F2] text-[#FF5A36] border border-[#E5DED4]">
              Multi-Turn
            </span>
          </div>
          <p className="text-[13px] text-[#5F6878] mt-0.5">
            Conversational reasoning, copywriting, and code synthesis powered by Gemini.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-white border border-[#E5DED4] text-[#172033] text-[13px] font-bold shadow-xs">
            <Coins className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>1 Credit / msg</span>
          </div>

          <button
            onClick={handleClearChat}
            disabled={messages.length === 0}
            className="p-2 rounded-[10px] bg-white hover:bg-[#FAF7F2] border border-[#E5DED4] text-[#5F6878] hover:text-[#D64545] transition-colors disabled:opacity-40 cursor-pointer shadow-xs"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Two Column Chat Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 flex-1 min-h-0">
        {/* Left Column: Model & Persona Selection (4 Cols) */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-4 overflow-y-auto pr-1">
          {/* Model Selector Card */}
          <div className="p-4 rounded-[16px] bg-white border border-[#E5DED4] space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-[13px] font-bold text-[#172033]">
              <Cpu className="w-4 h-4 text-[#FF5A36]" />
              <span>Model Selection</span>
            </div>
            <div className="space-y-2">
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className={`w-full text-left p-3 rounded-[12px] border transition-all cursor-pointer ${
                    selectedModel === m.id
                      ? 'bg-[#FAF7F2] border-[#FF5A36] shadow-xs'
                      : 'bg-white border-[#E5DED4] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <p className="text-[13px] font-bold text-[#172033]">{m.name}</p>
                  <p className="text-[11px] text-[#5F6878] mt-0.5">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Persona / Role Selector */}
          <div className="p-4 rounded-[16px] bg-white border border-[#E5DED4] space-y-3 flex-1 shadow-xs">
            <div className="flex items-center gap-2 text-[13px] font-bold text-[#172033]">
              <Bot className="w-4 h-4 text-[#FF5A36]" />
              <span>Persona &amp; System Role</span>
            </div>
            <div className="space-y-2">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole.id === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full text-left p-3 rounded-[12px] border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#FAF7F2] border-[#FF5A36] shadow-xs'
                        : 'bg-white border-[#E5DED4] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-[10px] mt-0.5 ${
                        isSelected ? 'bg-[#FFF0EB] text-[#FF5A36]' : 'bg-[#FAF7F2] text-[#5F6878]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#172033]">{role.title}</p>
                      <p className="text-[11px] text-[#5F6878] mt-0.5">{role.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Chat Messages & Input (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col h-full rounded-[20px] bg-white border border-[#E5DED4] overflow-hidden shadow-xs">
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAF7F2]/40">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto py-12">
                <div className="w-14 h-14 rounded-[14px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36] mb-4 shadow-xs">
                  <Bot className="w-7 h-7" />
                </div>
                <h3 className="text-[20px] font-bold text-[#172033] font-display mb-2">
                  No conversations yet
                </h3>
                <p className="text-[14px] text-[#5F6878] mb-6 leading-relaxed">
                  Brainstorm scripts, outline campaigns, review code, or design multi-modal generation pipelines with Toolora AI.
                </p>
                <div className="space-y-2 w-full">
                  {samplePrompts.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInputPrompt(sample)}
                      className="w-full text-left p-3 rounded-[12px] bg-white hover:bg-[#FAF7F2] border border-[#E5DED4] text-[13px] text-[#5F6878] hover:text-[#172033] transition-colors cursor-pointer block truncate shadow-xs font-medium"
                    >
                      💡 {sample}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => {
                const isUser = message.role === 'user';
                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 ${
                        isUser
                          ? 'bg-[#FF5A36] text-white shadow-xs'
                          : 'bg-white border border-[#E5DED4] text-[#172033] shadow-xs'
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-[16px] p-4 text-[14px] leading-relaxed shadow-xs ${
                        isUser
                          ? 'bg-[#172033] text-white rounded-tr-none'
                          : 'bg-white border border-[#E5DED4] text-[#172033] rounded-tl-none'
                      }`}
                    >
                      <div className="whitespace-pre-wrap select-text">{message.content}</div>

                      <div
                        className={`flex items-center justify-between gap-3 mt-2 text-[11px] pt-1.5 border-t ${
                          isUser ? 'border-white/20 text-white/70' : 'border-[#E5DED4] text-[#8F97A3]'
                        }`}
                      >
                        <span>{message.timestamp}</span>
                        {!isUser && (
                          <button
                            onClick={() => handleCopy(message.id, message.content)}
                            className="hover:text-[#172033] transition-colors flex items-center gap-1 cursor-pointer font-medium"
                          >
                            {copiedId === message.id ? (
                              <>
                                <Check className="w-3 h-3 text-[#238B6F]" />
                                <span className="text-[#238B6F]">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* AI Loading State */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-[10px] bg-white border border-[#E5DED4] flex items-center justify-center text-[#FF5A36] shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="rounded-[16px] rounded-tl-none bg-white border border-[#E5DED4] p-4 flex items-center gap-3 shadow-xs">
                  <div className="w-4 h-4 ai-loading-ring shrink-0" />
                  <span className="text-[13px] text-[#5F6878] font-medium">
                    Thinking with Gemini...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form */}
          <div className="p-3 sm:p-4 bg-white border-t border-[#E5DED4]">
            <form onSubmit={handleSendMessage} className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                rows={2}
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask Toolora AI anything or describe what you want to create..."
                className="flex-1 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4] p-3 text-[14px] text-[#172033] placeholder-[#8F97A3] focus:outline-none focus:border-[#FF5A36] focus:ring-2 focus:ring-[#FF5A36]/20 transition-all resize-none leading-relaxed"
              />

              <button
                type="submit"
                disabled={!inputPrompt.trim() || isLoading}
                className="h-12 w-12 rounded-[12px] bg-[#FF5A36] text-white flex items-center justify-center hover:bg-[#E84C28] shadow-[0_4px_16px_rgba(255,90,54,0.25)] transition-all cursor-pointer disabled:opacity-40 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
