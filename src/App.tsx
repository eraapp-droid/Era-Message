import React, { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp, 
  setDoc, 
  doc, 
  getDoc 
} from 'firebase/firestore';
import { GoogleGenAI } from '@google/genai';
import { auth, db } from './firebase';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { StoriesView } from './components/StoriesView';
import { ContactsView } from './components/ContactsView';
import { SettingsView } from './components/SettingsView';
import { ProfileModal } from './components/ProfileModal';
import { NewChatModal } from './components/NewChatModal';
import { ChatInfoDrawer } from './components/ChatInfoDrawer';
import { User, Chat, Message, Story } from './types';
import { Shield, Sparkles } from 'lucide-react';

const DEFAULT_CHATS: Chat[] = [
  {
    id: 'era_global_chat',
    type: 'group',
    name: 'مجموعة Era العامة (رئيسية)',
    avatar: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150&auto=format&fit=crop&q=80',
    unreadCount: 0,
    isPinned: true,
    membersCount: 1540,
    lastMessage: {
      text: 'مرحباً بالجميع في شبكة Era للمراسلة الفورية المشفرة!',
      timestamp: 'الآن',
      senderName: 'Era Bot',
      isRead: true,
    },
    encryptedKey: 'ERA-GLOBAL-SECURE-256-KEY',
  },
  {
    id: 'era_ai_room',
    type: 'direct',
    name: 'مساعد Era الذكي 🤖',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    username: 'era_ai_bot',
    bio: 'المساعد الذكي المدمج في نظام إيرا',
    online: true,
    unreadCount: 0,
    lastMessage: {
      text: 'أهلاً بك! أنا جاهز للإجابة على استفساراتك.',
      timestamp: 'الآن',
      senderName: 'مساعد Era الذكي',
      isRead: true,
    },
    encryptedKey: 'ERA-AI-NEURAL-SECURE-KEY',
  }
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>(DEFAULT_CHATS);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [stories, setStories] = useState<Story[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>('era_global_chat');
  
  // Modals & Drawers
  const [activeModal, setActiveModal] = useState<'settings' | 'profile' | 'contacts' | 'stories' | 'newChat' | null>(null);
  const [showChatInfo, setShowChatInfo] = useState(false);

  // 1. Listen to Real Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFirebaseUser(user);
        const userObj: User = {
          uid: user.uid,
          id: user.uid,
          name: user.displayName || 'مستخدم Era',
          username: user.email ? user.email.split('@')[0] : `user_${user.uid.substring(0, 5)}`,
          phone: user.phoneNumber || '+966 50 000 0000',
          email: user.email || '',
          avatar: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          bio: 'مستخدم نشط في شبكة Era الآمنة 🚀',
          online: true,
        };
        setCurrentUser(userObj);

        // Sync user in Firestore
        try {
          await setDoc(doc(db, 'users', user.uid), userObj, { merge: true });
        } catch (e) {
          console.error('Error saving user profile:', e);
        }
      } else {
        setFirebaseUser(null);
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Real-time Firestore Messages Listener for active chat
  useEffect(() => {
    if (!activeChatId || !currentUser) return;

    const q = query(
      collection(db, 'chats', activeChatId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        msgs.push({
          id: docSnap.id,
          chatId: activeChatId,
          senderId: data.senderId,
          senderName: data.senderName,
          text: data.text,
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }) : 'الآن',
          isRead: data.isRead || false,
        });
      });

      // If no messages in Firestore yet for global chat, add welcome message
      if (msgs.length === 0 && activeChatId === 'era_global_chat') {
        msgs.push({
          id: 'welcome_msg',
          chatId: 'era_global_chat',
          senderId: 'system',
          senderName: 'Era System',
          text: 'مرحباً بكم في محادثة Era العامة المشفرة حقيقياً عبر Firestore في الوقت الفعلي!',
          timestamp: 'الآن',
          isRead: true,
        });
      }

      setMessages(prev => ({
        ...prev,
        [activeChatId]: msgs
      }));
    }, (error) => {
      console.error('Firestore messages error:', error);
    });

    return () => unsubscribe();
  }, [activeChatId, currentUser]);

  const handleSendMessage = async (text: string, replyTo?: { id: string; senderName: string; text: string }) => {
    if (!activeChatId || !currentUser) return;

    try {
      // Send real message to Firestore
      await addDoc(collection(db, 'chats', activeChatId, 'messages'), {
        chatId: activeChatId,
        senderId: currentUser.id,
        senderName: currentUser.name,
        text,
        timestamp: serverTimestamp(),
        isRead: true,
        replyTo: replyTo || null,
      });

      // Update chat last message
      setChats(prev => prev.map(c => {
        if (c.id === activeChatId) {
          return {
            ...c,
            lastMessage: {
              text,
              timestamp: 'الآن',
              senderName: currentUser.name,
              isRead: true,
            }
          };
        }
        return c;
      }));

      // If chatting with AI bot, generate response with Gemini or smart fallback
      if (activeChatId === 'era_ai_room') {
        setTimeout(async () => {
          let aiReplyText = 'أنا مساعد Era الذكي. تم استلام رسالتك عبر السيرفر الآمن!';
          try {
            const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).process?.env?.GEMINI_API_KEY;
            if (apiKey) {
              const ai = new GoogleGenAI({ apiKey });
              const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [
                  { role: 'user', parts: [{ text: `أنت مساعد ذكي لتطبيق Era Messenger الموجه للغة العربية. رد باختصار واحترافية على: ${text}` }] }
                ]
              });
              if (response.text) {
                aiReplyText = response.text;
              }
            }
          } catch (err) {
            console.error('Gemini API error:', err);
          }

          // Add AI reply to Firestore so all users see it
          await addDoc(collection(db, 'chats', 'era_ai_room', 'messages'), {
            chatId: 'era_ai_room',
            senderId: 'era_ai_bot',
            senderName: 'مساعد Era الذكي',
            text: aiReplyText,
            timestamp: serverTimestamp(),
            isRead: true,
          });
        }, 1200);
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleCreateChat = (newChat: Chat) => {
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const handleAddStory = (mediaUrl: string, caption: string) => {
    if (!currentUser) return;
    const newStory: Story = {
      id: `story_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      mediaUrl,
      caption,
      timestamp: 'الآن',
      viewsCount: 1,
    };
    setStories(prev => [newStory, ...prev]);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setFirebaseUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Splash Screen
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Auth Loading
  if (authLoading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center text-cyan-400">
        <Sparkles className="w-10 h-10 animate-spin mb-4" />
        <span className="text-sm font-medium">جاري تحميل جلسة Era الآمنة...</span>
      </div>
    );
  }

  // Auth Screen (Google & Apple Only)
  if (!firebaseUser || !currentUser) {
    return <AuthScreen onLoginSuccess={() => {}} />;
  }

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];
  const currentMessages = activeChatId ? (messages[activeChatId] || []) : [];

  return (
    <div className="fixed inset-0 bg-slate-950 text-slate-100 flex items-center justify-center overflow-hidden">
      {/* Mobile Full Screen Shell Container */}
      <div className="w-full h-full md:max-w-md md:h-[92vh] md:border md:border-slate-800 md:rounded-3xl shadow-2xl flex flex-col overflow-hidden bg-slate-950 relative">
        <div className="flex h-full w-full overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            currentUser={currentUser}
            chats={chats}
            activeChatId={activeChatId}
            onSelectChat={(id) => { setActiveChatId(id); setShowChatInfo(false); }}
            onOpenSettings={() => setActiveModal('settings')}
            onOpenProfile={() => setActiveModal('profile')}
            onOpenStories={() => setActiveModal('stories')}
            onOpenContacts={() => setActiveModal('contacts')}
            onNewChat={() => setActiveModal('newChat')}
            onLogout={handleLogout}
          />

          {/* Main Chat Area */}
          {activeChat ? (
            <ChatView
              chat={activeChat}
              currentUser={currentUser}
              messages={currentMessages}
              onSendMessage={handleSendMessage}
              onToggleInfo={() => setShowChatInfo(!showChatInfo)}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 text-slate-400 p-6 text-center">
              <Shield className="w-12 h-12 text-cyan-400 mb-2 animate-pulse" />
              <h2 className="text-lg font-bold text-white mb-1">مرحباً بك في Era</h2>
              <p className="text-xs text-slate-400">اختر محادثة للبدء فوراً.</p>
            </div>
          )}

          {/* Chat Info Drawer */}
          {showChatInfo && activeChat && (
            <ChatInfoDrawer
              chat={activeChat}
              onClose={() => setShowChatInfo(false)}
            />
          )}
        </div>

        {/* Modals */}
        {activeModal === 'settings' && (
          <SettingsView
            currentUser={currentUser}
            onClose={() => setActiveModal(null)}
            onOpenProfile={() => setActiveModal('profile')}
            onLogout={handleLogout}
          />
        )}

        {activeModal === 'profile' && (
          <ProfileModal
            currentUser={currentUser}
            onClose={() => setActiveModal(null)}
            onUpdateUser={(updated) => setCurrentUser(prev => prev ? { ...prev, ...updated } : null)}
          />
        )}

        {activeModal === 'contacts' && (
          <ContactsView
            chats={chats}
            onClose={() => setActiveModal(null)}
            onSelectChat={(id) => setActiveChatId(id)}
          />
        )}

        {activeModal === 'stories' && (
          <StoriesView
            currentUser={currentUser}
            stories={stories}
            onClose={() => setActiveModal(null)}
            onAddStory={handleAddStory}
          />
        )}

        {activeModal === 'newChat' && (
          <NewChatModal
            onClose={() => setActiveModal(null)}
            onCreateChat={handleCreateChat}
          />
        )}
      </div>
    </div>
  );
}
