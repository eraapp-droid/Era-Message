import React, { useEffect } from 'react';
import { Shield, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200); // Quick professional splash transition

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100 select-none">
      {/* Background glow effects */}
      <div className="absolute w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Glowing Circle with Era App Name */}
        <div className="relative mb-8">
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 opacity-75 blur-lg animate-spin" style={{ animationDuration: '6s' }}></div>
          
          <div className="relative w-40 h-40 rounded-full bg-slate-900 border-2 border-cyan-500/60 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(6,182,212,0.5)]">
            <Shield className="w-10 h-10 text-cyan-400 mb-2 animate-bounce" />
            <h1 className="text-4xl font-black tracking-widest bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Era
            </h1>
            <span className="text-[10px] text-cyan-300/80 tracking-wider uppercase mt-1">
              Secure Messenger
            </span>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-2 text-white">Era Messenger</h2>
        <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
          تطبيق المراسلة الآمن المدعوم بالتشفير التام وقاعدة بيانات حقيقية
        </p>

        <div className="mt-8 flex items-center gap-2 text-cyan-400 text-xs font-medium">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>جاري الاتصال بقنوات Era الآمنة...</span>
        </div>

        <div className="absolute bottom-8 text-[10px] text-slate-500">
          حقوق الملكية الفكرية محفوظة لشركة Era © 2026
        </div>
      </div>
    </div>
  );
};
