import React, { useState } from 'react';
import { X, Search, UserPlus, Shield, MessageSquare, Phone } from 'lucide-react';
import { Chat, User } from '../types';

interface ContactsViewProps {
  chats: Chat[];
  onClose: () => void;
  onSelectChat: (chatId: string) => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({
  chats,
  onClose,
  onSelectChat,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const directChats = chats.filter(c => c.type === 'direct' || c.type === 'secret');
  const filtered = directChats.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">جهات الاتصال الآمنة</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في جهات الاتصال..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40 p-2">
          {filtered.map((chat) => (
            <div
              key={chat.id}
              onClick={() => { onSelectChat(chat.id); onClose(); }}
              className="flex items-center justify-between p-3 hover:bg-slate-800/60 rounded-xl cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-700"
                  />
                  {chat.online && (
                    <span className="absolute bottom-0 left-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{chat.name}</h4>
                  <p className="text-xs text-cyan-400">@{chat.username || 'era_user'}</p>
                  <p className="text-[11px] text-slate-400">{chat.phone || 'متصل عبر التشفير التام'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-xl transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/60 text-xs text-slate-400">
          <span>إجمالي الجهات: {filtered.length}</span>
          <button className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium">
            <UserPlus className="w-4 h-4" />
            <span>إضافة جهة اتصال جديدة</span>
          </button>
        </div>
      </div>
    </div>
  );
};
