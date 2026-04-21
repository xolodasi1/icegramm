import { Chat, User, Message } from '@/types';

export const currentUser: User = {
  id: 'me',
  name: 'Alex Cold',
  status: 'online',
};

export const mockUsers: User[] = [
  { id: '1', name: 'Frosty Joe', status: 'online', avatar: 'https://picsum.photos/seed/frosty/100/100' },
  { id: '2', name: 'Icy Sarah', status: 'away', lastSeen: Date.now() - 3600000, avatar: 'https://picsum.photos/seed/icy/100/100' },
  { id: '3', name: 'Winter Dev Group', status: 'online' },
  { id: '4', name: 'Arctic Support', status: 'offline', lastSeen: Date.now() - 86400000, avatar: 'https://picsum.photos/seed/arctic/100/100' },
];

export const mockChats: Chat[] = [
  {
    id: 'chat1',
    type: 'private',
    participants: [currentUser, mockUsers[0]],
    unreadCount: 2,
    lastMessage: {
      id: 'm1',
      senderId: '1',
      text: 'Did you see the new update? It looks freezing!',
      timestamp: Date.now() - 300000,
      status: 'delivered',
    },
    pinned: true,
  },
  {
    id: 'chat2',
    type: 'private',
    participants: [currentUser, mockUsers[1]],
    unreadCount: 0,
    lastMessage: {
      id: 'm2',
      senderId: 'me',
      text: 'Yeah, I love the cold vibes.',
      timestamp: Date.now() - 7200000,
      status: 'read',
    },
  },
  {
    id: 'chat3',
    type: 'group',
    participants: [currentUser, ...mockUsers],
    unreadCount: 45,
    lastMessage: {
      id: 'm3',
      senderId: '3',
      text: 'System: New user joined the icy realm.',
      timestamp: Date.now() - 60000,
      status: 'sent',
    },
  },
];
