import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardHeader } from './components/layout/DashboardHeader';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { PricingPage } from './pages/PricingPage';
import { DashboardHome } from './pages/DashboardHome';
import { GeminiChatPage } from './pages/GeminiChatPage';
import { TextGeneratorPage } from './pages/TextGeneratorPage';
import { ImageGeneratorPage } from './pages/ImageGeneratorPage';
import { VoiceGeneratorPage } from './pages/VoiceGeneratorPage';
import { VideoGeneratorPage } from './pages/VideoGeneratorPage';
import { HistoryPage } from './pages/HistoryPage';
import { CreditsPage } from './pages/CreditsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync with browser history and address bar
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route protection logic
  const isDashboardRoute = currentPath.startsWith('/dashboard') || currentPath === '/admin';
  const isAuthRoute = currentPath === '/login' || currentPath === '/signup' || currentPath === '/forgot-password';

  // Render the appropriate view
  const renderCurrentView = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/login':
        return <LoginPage onNavigate={navigate} />;
      case '/signup':
        return <SignupPage onNavigate={navigate} />;
      case '/forgot-password':
        return <ForgotPasswordPage onNavigate={navigate} />;
      case '/pricing':
        return <PricingPage onNavigate={navigate} />;
      case '/dashboard':
        return <DashboardHome onNavigate={navigate} />;
      case '/dashboard/chat':
        return <GeminiChatPage onNavigate={navigate} />;
      case '/dashboard/text':
        return <TextGeneratorPage onNavigate={navigate} />;
      case '/dashboard/image':
        return <ImageGeneratorPage onNavigate={navigate} />;
      case '/dashboard/voice':
        return <VoiceGeneratorPage onNavigate={navigate} />;
      case '/dashboard/video':
        return <VideoGeneratorPage onNavigate={navigate} />;
      case '/dashboard/history':
        return <HistoryPage onNavigate={navigate} />;
      case '/dashboard/credits':
        return <CreditsPage onNavigate={navigate} />;
      case '/dashboard/settings':
        return <SettingsPage onNavigate={navigate} />;
      case '/admin':
        return <AdminPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  const getPageTitle = () => {
    switch (currentPath) {
      case '/dashboard':
        return 'Overview';
      case '/dashboard/chat':
        return 'Gemini AI Assistant';
      case '/dashboard/text':
        return 'AI Text Generator';
      case '/dashboard/image':
        return 'AI Image Generator';
      case '/dashboard/voice':
        return 'AI Voice Generator';
      case '/dashboard/video':
        return 'AI Video Generator';
      case '/dashboard/history':
        return 'Generation Archive';
      case '/dashboard/credits':
        return 'Credits & Usage';
      case '/dashboard/settings':
        return 'Workspace Settings';
      case '/admin':
        return 'System Administration';
      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-screen bg-[#090D1A] ambient-glow text-slate-100 flex flex-col font-sans">
      {isDashboardRoute ? (
        // DASHBOARD WORKSPACE SHELL
        <div className="flex min-h-screen">
          {/* Responsive Sidebar */}
          <Sidebar
            currentPath={currentPath}
            onNavigate={navigate}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Dashboard Workspace Content */}
          <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all">
            <DashboardHeader
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              onNavigate={navigate}
              title={getPageTitle()}
            />
            <main className="flex-1 overflow-x-hidden">
              {renderCurrentView()}
            </main>
          </div>
        </div>
      ) : (
        // PUBLIC / MARKETING / AUTH SHELL
        <div className="flex-1 flex flex-col">
          <Navbar currentPath={currentPath} onNavigate={navigate} />
          <main className="flex-1">{renderCurrentView()}</main>
          {!isAuthRoute && <Footer onNavigate={navigate} />}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}
