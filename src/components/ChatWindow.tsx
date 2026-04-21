import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, MoreVertical, Phone, Video, Smile, Check, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Chat, Message } from '@/types';
import { motion, AnimatePresence } from 'motion/react';
import { currentUser } from '@/mockData';

interface ChatWindowProps {
  chat: Chat;
}

export function ChatWindow({ chat }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      text: 'Привет! Посмотрел твой набросок интерфейса.',
      timestamp: Date.now() - 1000000,
      status: 'read'
    },
    {
      id: '2',
      senderId: '1',
      text: 'Цветовая гамма выглядит очень профессионально. Настоящий «Cold Style».',
      timestamp: Date.now() - 900000,
      status: 'read'
    },
    {
      id: '3',
      senderId: 'me',
      text: 'Спасибо! Старался выдержать баланс между функциональностью и эстетикой.',
      timestamp: Date.now() - 500000,
      status: 'read'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const participant = chat.participants.find(p => p.id !== 'me') || chat.participants[0];

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputValue,
      timestamp: Date.now(),
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-background relative overflow-hidden">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-6 border-b border-border bg-card z-10">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 border border-muted-foreground/20">
            <AvatarImage src={participant.avatar} />
            <AvatarFallback className="bg-muted text-primary text-xs font-bold">
              {participant.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-sm font-bold">{participant.name}</h2>
            <p className="text-[10px] text-primary font-medium tracking-wide">
              {participant.status === 'online' ? 'в сети' : 'был недавно'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary w-8 h-8">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary w-8 h-8">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary w-8 h-8">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 p-6 relative z-0">
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          <AnimatePresence initial={false}>
            {messages.map((m) => {
              const isMe = m.senderId === 'me';
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] px-4 py-2.5 shadow-sm text-[13.5px] leading-relaxed relative ${
                    isMe 
                      ? 'bg-[#0369a1] text-[#f0f9ff] rounded-xl rounded-br-none' 
                      : 'bg-secondary text-foreground rounded-xl rounded-bl-none'
                  }`}>
                    <p>{m.text}</p>
                    <span className={`block text-[9px] mt-1 text-right opacity-60 font-mono`}>
                      {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {isMe && (
                        <span className="ml-1 inline-block">
                          {m.status === 'read' ? '✓✓' : '✓'}
                        </span>
                      )}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 bg-card border-t border-border z-10 shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0 hover:text-primary w-9 h-9">
              <Paperclip className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Написать сообщение..."
              className="bg-transparent border-none text-sm placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
            />
            <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0 hover:text-primary w-9 h-9">
              <Smile className="w-5 h-5" />
            </Button>
          </div>
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="rounded-md bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-tighter h-9 px-5 transition-all active:scale-95 shrink-0"
          >
            ОТПР.
          </Button>
        </div>
      </div>
    </div>
  );
}
