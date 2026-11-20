import React, { useState } from 'react';
import { 
  Menu, Search, Shield, Settings, User as UserIcon, BookOpen, 
  Bookmark, Users, Hash, Lock, Plus, Check, Moon, Sun, LogOut, 
  Smartphone, Sparkles, Filter
} from 'lucide-react';
import { Chat, User } from '../types';

interface SidebarProps {
  currentUser: User;
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  onOpenStories: () => void;
  onOpenContacts: () => void;
  onNewChat: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  chats,
  activeChatId,
  onSelectChat,
  onOpenSettings,
  onOpenProfile,
  onOpenStories,
  onOpenContacts,
  onNewChat,
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'personal' | 'groups' | 'channels' | 'saved'>('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Filter chats
  const filteredChats = chats.filter((chat) => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (chat.lastMessage?.text && chat.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (activeTab === 'personal') return chat.type === 'direct' || chat.type === 'secret';
    if (activeTab === 'groups') return chat.type === 'group';
    if (activeTab === 'channels') return chat.type === 'channel';
    if (activeTab === 'saved') return chat.type === 'saved';
    return true; // 'all'
  });

  return (
    <aside className="w-full md:w-80 lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-full relative select-none">
      {/* Top Header */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors relative"
            title="القائمة الرئيسية"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Era
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenStories}
            className="p-2 hover:bg-slate-800 rounded-xl text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-xs font-medium"
            title="القصص"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">القصص</span>
          </button>

          <button
            onClick={onNewChat}
            className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-xl transition-colors"
            title="محادثة جديدة"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Telegram-style Drawer / Menu (Dropdown or Slide) */}
      {isMenuOpen && (
        <div className="absolute top-16 right-3 left-3 z-50 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-4 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/50"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-sm truncate">{currentUser.name}</h3>
              <p className="text-xs text-cyan-400 truncate">@{currentUser.username}</p>
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => { setIsMenuOpen(false); onOpenProfile(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <UserIcon className="w-4 h-4 text-cyan-400" />
              <span>الملف الشخصي وتعديل البيانات</span>
            </button>

            <button
              onClick={() => { setIsMenuOpen(false); onOpenContacts(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <Users className="w-4 h-4 text-indigo-400" />
              <span>جهات الاتصال</span>
            </button>

            <button
              onClick={() => { setIsMenuOpen(false); onOpenStories(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>قصص الأصدقاء</span>
            </button>

            <button
              onClick={() => { setIsMenuOpen(false); onOpenSettings(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <Settings className="w-4 h-4 text-purple-400" />
              <span>الإعدادات والخصوصية</span>
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Era Messenger v3.5</span>
            <button
              onClick={() => { setIsMenuOpen(false); onLogout(); }}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="px-3 pt-3 pb-2">
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في المحادثات (تشفير تام)..."
            className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl pr-10 pl-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Tabs Filter (Telegram Style Folders) */}
      <div className="px-3 pb-2 flex items-center gap-1 overflow-x-auto no-scrollbar border-b border-slate-800/60">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === 'all'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          الكل
        </button>
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === 'personal'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          الخاص
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === 'groups'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          المجموعات
        </button>
        <button
          onClick={() => setActiveTab('channels')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === 'channels'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          القنوات
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === 'saved'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          المحفوظة
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-500 text-xs p-4 text-center">
            <Search className="w-8 h-8 mb-2 opacity-40" />
            <span>لا توجد محادثات تطابق بحثك</span>
          </div>
        ) : (
          filteredChats.map((chat) => {
            const isActive = chat.id === activeChatId;
            return (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`flex items-center gap-3 p-3 cursor-pointer transition-colors relative group ${
                  isActive
                    ? 'bg-slate-800/80 border-r-4 border-cyan-500'
                    : 'hover:bg-slate-800/40'
                }`}
              >
                {/* Avatar with online indicator */}
                <div className="relative flex-shrink-0">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-700"
                  />
                  {chat.online && (
                    <span className="absolute bottom-0 left-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                  )}
                  {chat.type === 'secret' && (
                    <span className="absolute -top-1 -right-1 bg-cyan-600 text-white p-0.5 rounded-full shadow">
                      <Lock className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Chat Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-white text-sm truncate flex items-center gap-1.5">
                      {chat.name}
                      {chat.type === 'channel' && <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded">قناة</span>}
                    </h4>
                    <span className="text-[11px] text-slate-500 flex-shrink-0">
                      {chat.lastMessage?.timestamp || ''}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400 truncate">
                      <span className="text-slate-300 font-medium ml-1">{chat.lastMessage?.senderName}:</span>
                      {chat.lastMessage?.text || 'لا توجد رسائل'}
                    </p>
                    
                    {chat.unreadCount > 0 && (
                      <span className="bg-cyan-500 text-slate-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ml-1">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Era Branding Footer in Sidebar */}
      <div className="p-3 border-t border-slate-800 text-center bg-slate-950/40">
        <p className="text-[10px] text-slate-500">
          Era Secure Messenger • تشفير تام 256-bit
        </p>
      </div>
    </aside>
  );
};
