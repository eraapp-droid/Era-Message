import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Shield, Lock, Phone, Search, MoreVertical, Paperclip, 
  Smile, Mic, Check, CheckCheck, Image as ImageIcon, FileText, 
  Trash2, X, CornerUpRight, Sparkles, Clock
} from 'lucide-react';
import { Chat, Message, User } from '../types';

interface ChatViewProps {
  chat: Chat;
  currentUser: User;
  messages: Message[];
  onSendMessage: (text: string, replyTo?: { id: string; senderName: string; text: string }) => void;
  onToggleInfo: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  chat,
  currentUser,
  messages,
  onSendMessage,
  onToggleInfo,
}) => {
  const [inputText, setInputText] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ id: string; senderName: string; text: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim(), replyingTo || undefined);
    setInputText('');
    setReplyingTo(null);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 relative select-none">
      {/* Chat Header */}
      <div className="h-16 px-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between backdrop-blur z-20 sticky top-0">
        <div 
          onClick={onToggleInfo}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-700"
            />
            {chat.online && (
              <span className="absolute bottom-0 left-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            )}
          </div>

          <div>
            <h3 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              {chat.name}
              {chat.type === 'secret' && <Lock className="w-3.5 h-3.5 text-cyan-400" />}
            </h3>
            <p className="text-[11px] text-slate-400">
              {chat.online ? 'متصل الآن' : chat.lastSeen || 'تشفير تام 256-bit'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-300">
          <button 
            onClick={onToggleInfo}
            className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
            title="معلومات المحادثة"
          >
            <Shield className="w-5 h-5 text-cyan-400" />
          </button>
          <button 
            onClick={onToggleInfo}
            className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
            title="البحث والملفات"
          >
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={onToggleInfo}
            className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
            title="المزيد"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Encryption & Secret Banner */}
      <div className="bg-cyan-950/40 border-b border-cyan-500/20 px-4 py-2 flex items-center justify-center gap-2 text-cyan-300 text-xs text-center">
        <Lock className="w-3.5 h-3.5 flex-shrink-0" />
        <span>
          {chat.type === 'secret' 
            ? 'محادثة سرية محمية بتشفير تام من طرف لطرف مع خاصية التدمير الذاتي 🔒'
            : 'جميع الرسائل والوسائط في تطبيق Era محمية بتشفير تام 256-bit AES.'
          }
        </span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <div className="text-center my-2">
          <span className="bg-slate-900/80 border border-slate-800 text-slate-400 text-[10px] px-3 py-1 rounded-full">
            اليوم
          </span>
        </div>

        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group`}
            >
              <div 
                className={`max-w-[75%] md:max-w-md rounded-2xl p-3.5 relative shadow-md transition-all ${
                  isMe
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-bl-none'
                }`}
              >
                {!isMe && chat.type !== 'direct' && (
                  <span className="text-[11px] font-bold text-cyan-400 block mb-1">
                    {msg.senderName}
                  </span>
                )}

                {/* Reply Quote if exists */}
                {msg.replyTo && (
                  <div className={`mb-2 p-2 rounded-xl text-xs border-r-2 ${isMe ? 'bg-black/20 border-white/60 text-white/90' : 'bg-slate-950/60 border-cyan-400 text-slate-300'}`}>
                    <span className="font-bold block text-[10px]">{msg.replyTo.senderName}</span>
                    <p className="truncate">{msg.replyTo.text}</p>
                  </div>
                )}

                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                {/* Message Footer (Time & Checkmarks) */}
                <div className={`flex items-center justify-end gap-1.5 mt-1.5 text-[10px] ${isMe ? 'text-cyan-200' : 'text-slate-400'}`}>
                  {msg.isSecret && (
                    <span className="flex items-center gap-0.5 text-amber-400">
                      <Clock className="w-3 h-3" /> سرية
                    </span>
                  )}
                  <span>{msg.timestamp}</span>
                  {isMe && (
                    msg.isRead ? <CheckCheck className="w-3.5 h-3.5 text-cyan-200" /> : <Check className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Quick Reply Button on hover */}
                <button
                  onClick={() => setReplyingTo({ id: msg.id, senderName: msg.senderName, text: msg.text })}
                  className={`absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-slate-300 ${
                    isMe ? '-left-8' : '-right-8'
                  }`}
                  title="رد"
                >
                  <CornerUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Reactions display */}
              {msg.reactions && msg.reactions.length > 0 && (
                <div className="flex items-center gap-1 mt-1">
                  {msg.reactions.map((r, i) => (
                    <span key={i} className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full text-xs flex items-center gap-1 shadow">
                      <span>{r.emoji}</span>
                      <span className="text-[10px] text-slate-400">{r.count}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Replying banner */}
      {replyingTo && (
        <div className="bg-slate-900 border-t border-slate-800 px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-cyan-400 border-r-2 border-cyan-400 pr-2">
            <CornerUpRight className="w-3.5 h-3.5" />
            <div>
              <span className="font-bold">الرد على {replyingTo.senderName}:</span>
              <p className="text-slate-300 truncate max-w-xs">{replyingTo.text}</p>
            </div>
          </div>
          <button onClick={() => setReplyingTo(null)} className="text-slate-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Chat Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <button
          type="button"
          className="p-2.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-xl transition-colors"
          title="إرفاق ملف أو صورة"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <button
          type="button"
          className="p-2.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-xl transition-colors hidden sm:block"
          title="ملصقات وإيموجي"
        >
          <Smile className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={chat.type === 'secret' ? 'اكتب رسالة سرية مشفرة...' : 'اكتب رسالة...' }
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />

        {inputText.trim() ? (
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 rounded-xl shadow-lg shadow-cyan-500/20 transition-all font-bold flex items-center justify-center"
            title="إرسال"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            className="p-3 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-xl transition-colors"
            title="تسجيل رسالة صوتية"
          >
            <Mic className="w-5 h-5" />
          </button>
        )}
      </form>
    </div>
  );
};
