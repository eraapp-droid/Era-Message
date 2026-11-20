import React from 'react';
import { X, Shield, Lock, Bell, BellOff, Trash2, FileText, ImageIcon, Key, UserCheck } from 'lucide-react';
import { Chat } from '../types';

interface ChatInfoDrawerProps {
  chat: Chat;
  onClose: () => void;
}

export const ChatInfoDrawer: React.FC<ChatInfoDrawerProps> = ({
  chat,
  onClose,
}) => {
  return (
    <div className="w-full md:w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-full select-none z-30">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="font-bold text-white text-sm">معلومات المحادثة</h3>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Profile Card */}
        <div className="flex flex-col items-center text-center">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500 shadow-md mb-3"
          />
          <h4 className="font-bold text-white text-base">{chat.name}</h4>
          <p className="text-xs text-cyan-400 mt-0.5">{chat.username || '@era_user'}</p>
          <p className="text-xs text-slate-400 mt-2">{chat.bio || 'مستخدم نشط في Era Messenger'}</p>
        </div>

        {/* Encryption Key Fingerprint */}
        <div className="bg-slate-950/60 border border-cyan-500/30 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
            <Lock className="w-4 h-4" />
            <span>بصمة مفتاح التشفير التام</span>
          </div>
          <p className="text-[11px] font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-cyan-300 break-all select-all">
            {chat.encryptedKey || 'ERA-E2EE-256-SHA-FINGERPRINT-AUTH'}
          </p>
          <p className="text-[10px] text-slate-500">
            إذا كانت هذه البصمة مطابقة على جهازي الطرفين، فمحادثاتكم مشفرة تماماً وآمنة من أي تنصت.
          </p>
        </div>

        {/* Quick Options */}
        <div className="space-y-1 bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/60">
          <div className="flex items-center justify-between p-3.5 hover:bg-slate-800/40 cursor-pointer text-xs text-slate-200">
            <span className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" /> كتم الإشعارات
            </span>
            <span className="text-[10px] text-slate-400">إيقاف مؤقت</span>
          </div>

          <div className="flex items-center justify-between p-3.5 hover:bg-slate-800/40 cursor-pointer text-xs text-slate-200">
            <span className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-cyan-400" /> عرض الملف الشخصي
            </span>
          </div>
        </div>

        {/* Shared Media */}
        <div className="space-y-2">
          <h5 className="text-xs font-bold text-slate-400 px-1">الملفات والوسائط المشتركة</h5>
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center text-slate-500">
              <ImageIcon className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="aspect-square bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center text-slate-500">
              <FileText className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="aspect-square bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center text-slate-500">
              <Shield className="w-6 h-6 text-teal-400" />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <button className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2">
          <Trash2 className="w-4 h-4" />
          <span>حذف وسجل المحادثة</span>
        </button>
      </div>
    </div>
  );
};
