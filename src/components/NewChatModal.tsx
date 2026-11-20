import React, { useState } from 'react';
import { X, Shield, Lock, Users, Hash, UserPlus, Sparkles } from 'lucide-react';
import { Chat } from '../types';

interface NewChatModalProps {
  onClose: () => void;
  onCreateChat: (chat: Chat) => void;
}

export const NewChatModal: React.FC<NewChatModalProps> = ({
  onClose,
  onCreateChat,
}) => {
  const [chatType, setChatType] = useState<'direct' | 'group' | 'channel' | 'secret'>('direct');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newChat: Chat = {
      id: `chat_${Date.now()}`,
      type: chatType,
      name: name.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      username: username ? `@${username}` : '@era_user',
      unreadCount: 0,
      online: true,
      encryptedKey: `ERA-SECURE-${Math.random().toString(36).substring(7).toUpperCase()}`,
      lastMessage: {
        text: 'تم بدء المحادثة بنجاح مع التشفير التام 🔒',
        timestamp: 'الآن',
        senderName: 'النظام',
        isRead: true,
      }
    };

    onCreateChat(newChat);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">إنشاء محادثة جديدة</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleCreate} className="p-6 space-y-4">
          {/* Chat Type Selector */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setChatType('direct')}
              className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                chatType === 'direct'
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>محادثة خاصة</span>
            </button>

            <button
              type="button"
              onClick={() => setChatType('secret')}
              className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                chatType === 'secret'
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>محادثة سرية 🔒</span>
            </button>

            <button
              type="button"
              onClick={() => setChatType('group')}
              className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                chatType === 'group'
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>مجموعة جديدة</span>
            </button>

            <button
              type="button"
              onClick={() => setChatType('channel')}
              className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                chatType === 'channel'
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Hash className="w-4 h-4" />
              <span>قناة جديدة</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {chatType === 'group' ? 'اسم المجموعة' : chatType === 'channel' ? 'اسم القناة' : 'اسم المستخدم أو الصديق'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={chatType === 'group' ? 'مثال: أصدقاء العمل' : 'مثال: محمد خالد'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">المعرف (@username)</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-cyan-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-xs transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow"
            >
              إنشاء وبدء الدردشة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
