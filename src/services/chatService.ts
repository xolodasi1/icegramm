import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  orderBy, 
  doc, 
  updateDoc, 
  getDocs,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Chat, Message, User } from '../types';

export const getMyChats = (userId: string, callback: (chats: Chat[]) => void) => {
  const q = query(
    collection(db, 'chats'),
    where('participants', 'array-contains', userId),
    orderBy('updatedAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const chats = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Chat));
    callback(chats);
  });
};

export const getMessages = (chatId: string, callback: (messages: Message[]) => void) => {
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('timestamp', 'asc'),
    limit(100)
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Message));
    callback(messages);
  });
};

export const sendMessage = async (chatId: string, senderId: string, text: string) => {
  const messageData = {
    senderId,
    text,
    timestamp: Date.now(), // Rules check for request.time, but client can send this. 
    // Wait, rules said data.timestamp == request.time. I should use serverTimestamp() in real code.
    status: 'sent'
  };

  // Update chat last message
  await updateDoc(doc(db, 'chats', chatId), {
    lastMessage: { text, senderId, timestamp: Date.now() },
    updatedAt: serverTimestamp()
  });

  return addDoc(collection(db, 'chats', chatId, 'messages'), {
    ...messageData,
    timestamp: serverTimestamp() // Correct for rules
  });
};

export const searchUsers = async (searchTerm: string) => {
  const q = query(
    collection(db, 'users'),
    where('name', '>=', searchTerm),
    where('name', '<=', searchTerm + '\uf8ff'),
    limit(10)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
};
