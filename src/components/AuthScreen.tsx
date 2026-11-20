import React, { useState } from 'react';
import { Shield, Globe, Apple, Sparkles } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, appleProvider } from '../firebase';

interface AuthScreenProps {
  onLoginSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      onLoginSuccess();
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setError(err.message || 'فشل تسجيل الدخول بواسطة Google');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithPopup(auth, appleProvider);
      onLoginSuccess();
    } catch (err: any) {
      console.error('Apple Auth Error:', err);
      setError(err.message || 'فشل تسجيل الدخول بواسطة Apple / iCloud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100 select-none">
      {/* Background glowing gradients */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-slate-900/90 border border-slate-800/80 rounded-3xl shadow-2xl p-8 backdrop-blur-xl flex flex-col items-center text-center">
        {/* Header Icon */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-6">
          <Shield className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-2">
          Era Messenger
        </h1>
        <p className="text-slate-400 text-xs mb-8 leading-relaxed">
          تطبيق المراسلة الفورية الآمن مع تشفير تام من طرف إلى طرف. يرجى تسجيل الدخول للمتابعة.
        </p>

        {error && (
          <div className="mb-6 w-full p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs text-center">
            {error}
          </div>
        )}

        {/* Real Firebase Auth Buttons: Google & Apple Only */}
        <div className="w-full space-y-3 mb-8">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-sm font-bold text-white transition-all shadow-md hover:border-cyan-500/50"
          >
            <Globe className="w-5 h-5 text-cyan-400" />
            <span>المتابعة باستخدام Google</span>
          </button>
          
          <button
            onClick={handleAppleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-sm font-bold text-white transition-all shadow-md hover:border-indigo-500/50"
          >
            <Apple className="w-5 h-5 text-white" />
            <span>المتابعة باستخدام Apple / iCloud</span>
          </button>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-medium mb-4 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>جاري المصادقة مع Firebase...</span>
          </div>
        )}

        {/* Era Footer Copyrights */}
        <div className="text-[11px] text-slate-500">
          جميع حقوق الملكية والتصاميم محفوظة لصالح Era © 2026
        </div>
      </div>
    </div>
  );
};
