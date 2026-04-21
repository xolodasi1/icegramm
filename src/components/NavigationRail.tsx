import { Home, MessageCircle, Settings, User, Bell, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export function NavigationRail() {
  return (
    <div className="w-16 h-full flex flex-col items-center py-4 bg-card border-r border-border gap-4">
      <Button variant="ghost" size="icon" className="mb-4 text-muted-foreground hover:text-primary">
        <Menu className="w-6 h-6" />
      </Button>
      
      <TooltipProvider>
        <div className="flex flex-col gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                <MessageCircle className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Chats</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md text-muted-foreground hover:text-primary">
                <Bell className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Notifications</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md text-muted-foreground hover:text-primary">
                <User className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Contacts</TooltipContent>
          </Tooltip>
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md text-muted-foreground hover:text-primary">
                <Settings className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
