import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Input } from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, loginWithGoogle, isLoading } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    const res = await login(email, password, remember);
    if (res.success) {
      showToast('Welcome back to Toolora AI!', 'success');
      onNavigate('/dashboard');
    } else {
      setError(res.error || 'Failed to sign in. Please check your credentials.');
      showToast(res.error || 'Login failed', 'error');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    const res = await loginWithGoogle();
    if (res.success) {
      showToast('Signed in with Google successfully', 'success');
      onNavigate('/dashboard');
    } else {
      setError('Google Sign-In failed');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Logo size="lg" showTagline={true} onClick={() => onNavigate('/')} />
          <h2 className="text-[28px] font-bold text-[#172033] tracking-tight pt-4 font-display">
            Welcome Back
          </h2>
          <p className="text-[14px] text-[#5F6878]">
            Sign in to access your creative multimodal workspace
          </p>
        </div>

        {/* Card */}
        <div className="rounded-[20px] bg-white border border-[#E5DED4] p-8 shadow-xl text-left">
          {/* Google Sign-In button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-[12px] border border-[#E5DED4] bg-[#FAF7F2] hover:bg-[#F1ECE4] text-[#172033] text-[13px] font-bold transition-all disabled:opacity-50 cursor-pointer shadow-xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5DED4]" />
            </div>
            <span className="relative bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-[#8F97A3] font-display">
              Or with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              autoComplete="current-password"
              required
            />

            <div className="flex items-center justify-between text-[12px]">
              <label className="flex items-center gap-2 cursor-pointer text-[#5F6878] hover:text-[#172033]">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded-[4px] border-[#E5DED4] text-[#FF5A36] focus:ring-[#FF5A36]"
                />
                <span>Remember session</span>
              </label>

              <button
                type="button"
                onClick={() => onNavigate('/forgot-password')}
                className="text-[#FF5A36] hover:underline font-bold cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-[10px] bg-[#FFF0EB] border border-[#FF5A36]/40 text-[12px] text-[#D64545]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-[12px] bg-[#FF5A36] text-white text-[15px] font-semibold hover:bg-[#E84C28] shadow-[0_4px_16px_rgba(255,90,54,0.25)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#E5DED4] flex items-center gap-2 text-[12px] text-[#5F6878]">
            <ShieldCheck className="w-4 h-4 text-[#238B6F] shrink-0" />
            <span>Secure password encryption and session token storage</span>
          </div>
        </div>

        {/* Footer link */}
        <p className="text-center text-[13px] text-[#5F6878]">
          Don&apos;t have an account yet?{' '}
          <button
            onClick={() => onNavigate('/signup')}
            className="text-[#FF5A36] font-bold hover:underline cursor-pointer"
          >
            Create an account free
          </button>
        </p>
      </div>
    </div>
  );
};
