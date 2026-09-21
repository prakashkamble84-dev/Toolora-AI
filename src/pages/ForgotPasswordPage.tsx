import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface ForgotPasswordPageProps {
  onNavigate: (path: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const { resetPassword, isLoading } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    const res = await resetPassword(email);
    if (res.success) {
      setSubmitted(true);
      showToast('Password reset link sent to your email.', 'success');
    } else {
      setError(res.error || 'Failed to send reset link.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Logo size="lg" showTagline={true} onClick={() => onNavigate('/')} />
          <h2 className="text-[28px] font-bold text-[#172033] tracking-tight pt-4 font-display">
            Reset Password
          </h2>
          <p className="text-[14px] text-[#5F6878]">
            Enter your email and we will dispatch a secure recovery link
          </p>
        </div>

        <div className="rounded-[20px] bg-white border border-[#E5DED4] p-8 shadow-xl text-left">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#E8F5E9] border border-[#238B6F]/30 flex items-center justify-center mx-auto text-[#238B6F]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-[18px] font-bold text-[#172033] font-display">Reset Link Dispatched</h3>
              <p className="text-[14px] text-[#5F6878] leading-relaxed">
                If an account exists for <span className="text-[#172033] font-bold">{email}</span>, instructions to reset your password are on their way.
              </p>
              <Button
                variant="outline"
                size="md"
                className="w-full mt-4"
                onClick={() => onNavigate('/login')}
              >
                Back to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              {error && (
                <div className="p-3 rounded-[10px] bg-[#FFF0EB] border border-[#FF5A36]/30 text-xs text-[#D64545]">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-[12px] bg-[#FF5A36] text-white text-[15px] font-semibold hover:bg-[#E84C28] shadow-[0_4px_16px_rgba(255,90,54,0.25)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>Send Reset Link</span>
                <Send className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="w-full text-center text-xs text-[#5F6878] hover:text-[#172033] flex items-center justify-center gap-1.5 pt-2 cursor-pointer font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to login</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
