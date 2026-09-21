import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { SYSTEM_CONFIG } from '../config/constants';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateCredits: (amount: number) => void;
  deductCredits: (amount: number) => void;
  changePlan: (plan: import('../types').PlanType, credits: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial guest/seed profile for Phase 1 exploration
const INITIAL_DEMO_USER: UserProfile = {
  uid: 'usr_phase1_demo',
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  photoURL: '',
  plan: 'FREE',
  credits: SYSTEM_CONFIG.defaultStarterCredits,
  monthlyCredits: SYSTEM_CONFIG.defaultStarterCredits,
  creditsUsed: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  role: 'user',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('toolora_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_DEMO_USER;
      }
    }
    return INITIAL_DEMO_USER;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('toolora_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('toolora_user');
    }
  }, [user]);

  const login = async (email: string, _pass: string, _remember: boolean = true) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // UI pacing
    setIsLoading(false);

    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    const updatedUser: UserProfile = {
      uid: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: email.split('@')[0],
      email,
      plan: 'FREE',
      credits: SYSTEM_CONFIG.defaultStarterCredits,
      monthlyCredits: SYSTEM_CONFIG.defaultStarterCredits,
      creditsUsed: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: 'user',
    };
    setUser(updatedUser);
    return { success: true };
  };

  const signup = async (name: string, email: string, _pass: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);

    if (!name.trim()) return { success: false, error: 'Full name is required.' };
    if (!email || !email.includes('@')) return { success: false, error: 'Valid email is required.' };

    const newUser: UserProfile = {
      uid: 'usr_' + Math.random().toString(36).substring(2, 9),
      name,
      email,
      plan: 'FREE',
      credits: SYSTEM_CONFIG.defaultStarterCredits,
      monthlyCredits: SYSTEM_CONFIG.defaultStarterCredits,
      creditsUsed: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: 'user',
    };
    setUser(newUser);
    return { success: true };
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsLoading(false);

    const googleUser: UserProfile = {
      uid: 'usr_g_' + Math.random().toString(36).substring(2, 9),
      name: 'Google User',
      email: 'user@gmail.com',
      photoURL: '',
      plan: 'FREE',
      credits: SYSTEM_CONFIG.defaultStarterCredits,
      monthlyCredits: SYSTEM_CONFIG.defaultStarterCredits,
      creditsUsed: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: 'user',
    };
    setUser(googleUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('toolora_user');
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsLoading(false);
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please provide a valid email.' };
    }
    return { success: true };
  };

  const updateCredits = (amount: number) => {
    if (!user) return;
    setUser({
      ...user,
      credits: Math.max(0, user.credits + amount),
      updatedAt: new Date().toISOString(),
    });
  };

  const deductCredits = (amount: number) => {
    updateCredits(-amount);
  };

  const changePlan = (plan: import('../types').PlanType, credits: number) => {
    if (!user) return;
    setUser({
      ...user,
      plan,
      credits: user.credits + credits,
      monthlyCredits: credits,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        loginWithGoogle,
        logout,
        resetPassword,
        updateCredits,
        deductCredits,
        changePlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
