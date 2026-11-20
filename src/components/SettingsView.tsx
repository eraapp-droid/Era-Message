import React from 'react';
import { 
  X, Shield, Lock, Bell, Moon, Smartphone, Globe, 
  HelpCircle, FileText, LogOut, User as UserIcon, Check, Key
} from 'lucide-react';
import { User } from '../types';

interface SettingsViewProps {
  currentUser: User;
  onClose: () => void;
  onOpenProfile: () => void;
  onLogout: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentUser,
  onClose,
  onOpenProfile,
  onLogout,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">الإعدادات والخصوصية</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Profile Card */}
          <div 
            onClick={onOpenProfile}
            className="flex items-center gap-4 p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl cursor-pointer hover:border-cyan-500/50 transition-all group"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/50"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                {currentUser.name}
              </h3>
              <p className="text-xs text-cyan-400">@{currentUser.username}</p>
              <p className="text-xs text-slate-400 mt-0.5">{currentUser.phone}</p>
            </div>
            <UserIcon className="w-5 h-5 text-slate-500 group-hover:text-cyan-400" />
          </div>

          {/* Privacy & Security */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider px-1">الخصوصية والأمان</h4>
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl overflow-hidden divide-y divide-slate-800/60">
              <div className="flex items-center justify-between p-3.5 hover:bg-slate-800/40 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-medium text-slate-200">التشفير التام (256-bit AES)</span>
                </div>
                <span className="text-[11px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">مفعل</span>
              </div>

              <div className="flex items-center justify-between p-3.5 hover:bg-slate-800/40 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <Key className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-medium text-slate-200">التحقق بخطوتين</span>
                </div>
                <span className="text-[11px] text-slate-400">محمي</span>
              </div>

              <div className="flex items-center justify-between p-3.5 hover:bg-slate-800/40 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-medium text-slate-200">الأجهزة النشطة</span>
                </div>
                <span className="text-[11px] text-slate-400">جهاز واحد</span>
              </div>
            </div>
          </div>

          {/* Chat & Notifications */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider px-1">المظهر والإشعارات</h4>
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl overflow-hidden divide-y divide-slate-800/60">
              <div className="flex items-center justify-between p-3.5 hover:bg-slate-800/40 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-medium text-slate-200">الوضع الداكن المتقدم (Era Dark)</span>
                </div>
                <span className="text-[11px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">افتراضي</span>
              </div>

              <div className="flex items-center justify-between p-3.5 hover:bg-slate-800/40 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-medium text-slate-200">الإشعارات والأصوات</span>
                </div>
                <span className="text-[11px] text-slate-400">ممكّن</span>
              </div>

              <div className="flex items-center justify-between p-3.5 hover:bg-slate-800/40 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-medium text-slate-200">لغة التطبيق</span>
                </div>
                <span className="text-[11px] text-slate-300">العربية (Arabic)</span>
              </div>
            </div>
          </div>

          {/* About & Copyrights */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider px-1">حول التطبيق</h4>
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span className="font-bold text-white text-sm">Era Messenger v3.5</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                تطبيق مراسلة فورية متطور مع تشفير تام وحماية كاملة للخصوصية.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                حقوق الملكية الفكرية والتصاميم محفوظة بالكامل لشركة Era © 2026.
              </div>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={() => { onClose(); onLogout(); }}
            className="w-full py-3.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج من الحساب</span>
          </button>
        </div>
      </div>
    </div>
  );
};
