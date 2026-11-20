export interface User {
  id: string;
  uid?: string;
  name: string;
  username: string;
  phone: string;
  email?: string;
  avatar: string;
  bio: string;
  online: boolean;
  lastSeen?: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  replyTo?: {
    id: string;
    senderName: string;
    text: string;
  };
  mediaUrl?: string;
  mediaType?: 'image' | 'file' | 'audio';
  reactions?: Reaction[];
  isSecret?: boolean;
  expiresAt?: number; // timestamp for self-destructing messages
}

export interface Chat {
  id: string;
  type: 'direct' | 'group' | 'channel' | 'saved' | 'secret';
  name: string;
  avatar: string;
  phone?: string;
  username?: string;
  bio?: string;
  online?: boolean;
  lastSeen?: string;
  membersCount?: number;
  unreadCount: number;
  isPinned?: boolean;
  isMuted?: boolean;
  isArchived?: boolean;
  lastMessage?: {
    text: string;
    timestamp: string;
    senderName: string;
    isRead: boolean;
  };
  encryptedKey?: string;
  secretTimer?: number; // seconds
}

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  mediaUrl: string;
  caption?: string;
  timestamp: string;
  viewsCount: number;
  isViewed?: boolean;
}
