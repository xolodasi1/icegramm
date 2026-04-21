import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Chat } from '@/types';
import { cn } from '@/lib/utils';

interface ChatListProps {
  chats: Chat[];
  selectedChatId?: string;
  onSelectChat: (chatId: string) => void;
}

export function ChatList({ chats, selectedChatId, onSelectChat }: ChatListProps) {
  return (
    <div className="w-80 h-full flex flex-col bg-card border-r border-border">
      <div className="p-4 flex flex-col gap-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Chats</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <Input 
            placeholder="Search..." 
            className="pl-9 bg-muted border-border rounded-md text-xs focus-visible:ring-primary/40 h-9" 
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="pb-4">
          {chats.map((chat) => {
            const participant = chat.participants.find(p => p.id !== 'me') || chat.participants[0];
            const isSelected = selectedChatId === chat.id;

            return (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 transition-all duration-200 border-l-[3px] border-transparent text-left",
                  isSelected 
                    ? "bg-secondary/40 border-primary" 
                    : "hover:bg-secondary/20"
                )}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12 border border-muted-foreground/30 rounded-full">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback className="bg-muted text-primary font-bold text-xs">
                      {participant.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {participant.status === 'online' && (
                    <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className={cn(
                      "font-semibold text-sm truncate",
                      isSelected ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {participant.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60 font-mono">
                      {chat.lastMessage 
                        ? new Date(chat.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : ''}
                    </span>
                  </div>
                  <div className="flex justify-between items-center h-5">
                    <p className="text-xs text-muted-foreground/80 truncate flex-1">
                      {chat.lastMessage?.text}
                    </p>
                    {chat.unreadCount > 0 && (
                      <Badge className="h-4 min-w-[1rem] px-1 bg-primary text-[10px] text-primary-foreground font-bold rounded-full">
                        {chat.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
