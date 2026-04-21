import { useState } from 'react';
import { NavigationRail } from '@/components/NavigationRail';
import { ChatList } from '@/components/ChatList';
import { ChatWindow } from '@/components/ChatWindow';
import { mockChats } from '@/mockData';
import { FirebaseProvider, useAuth } from '@/lib/FirebaseProvider';
import { signInWithGoogle } from '@/lib/firebase';
import { Button } from './components/ui/button';
import { Loader2, Zap } from 'lucide-react';
import { motion } from 'motion/react';

function ChatContent() {
  const [selectedChatId, setSelectedChatId] = useState<string>(mockChats[0].id);
  const selectedChat = mockChats.find(c => c.id === selectedChatId) || mockChats[0];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans antialiased text-foreground dark">
      <NavigationRail />
      <ChatList 
        chats={mockChats} 
        selectedChatId={selectedChatId} 
        onSelectChat={setSelectedChatId} 
      />
      <ChatWindow chat={selectedChat} />
    </div>
  );
}

function LoginScreen() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background dark overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm p-8 glass-dark rounded-3xl z-10 flex flex-col items-center text-center gap-8"
      >
        <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center text-primary shadow-2xl shadow-primary/20">
          <Zap className="w-10 h-10 fill-current" />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">ColdChat</h1>
          <p className="text-muted-foreground text-sm px-4">
            Connect in the icy realm of high-performance messaging.
          </p>
        </div>

        <Button 
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-lg font-semibold hover:bg-primary/90 transition-all active:scale-95 group"
        >
          {isLoggingIn ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              Sign in with Google
            </span>
          )}
        </Button>

        <p className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">
          Powered by Ice Engine
        </p>
      </motion.div>
    </div>
  );
}

function RootContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background dark">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return user ? <ChatContent /> : <LoginScreen />;
}

export default function App() {
  return (
    <FirebaseProvider>
      <RootContent />
    </FirebaseProvider>
  );
}


