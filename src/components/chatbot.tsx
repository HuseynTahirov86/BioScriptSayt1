'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { askBioScriptChatbot } from '@/app/actions';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  role: 'user' | 'ai';
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: 'Salam! Mən BioScript köməkçisiyəm. Sizə necə kömək edə bilərəm?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaViewportRef.current) {
      scrollAreaViewportRef.current.scrollTo({
        top: scrollAreaViewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = input.trim();
    if (!query || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: query }]);
    setIsLoading(true);
    setInput('');

    const formData = new FormData();
    formData.append('query', query);

    try {
        const result = await askBioScriptChatbot(formData);
        if (result.response) {
            setMessages((prev) => [...prev, { role: 'ai', content: result.response }]);
        } else {
            setMessages((prev) => [
                ...prev,
                { role: 'ai', content: `Üzr istəyirəm, bir xəta baş verdi: ${result.error}` },
            ]);
        }
    } catch (error) {
        setMessages((prev) => [
            ...prev,
            { role: 'ai', content: 'Gözlənilməz bir server xətası baş verdi. Zəhmət olmasa, sonra yenidən cəhd edin.' },
        ]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
            <span className="sr-only">Çatı aç</span>
          </Button>
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-20 right-4 z-50 w-full max-w-sm"
            style={{ transformOrigin: 'bottom right' }}
          >
            <Card className="flex h-[60vh] flex-col">
              <CardHeader className="flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">BioScript Köməkçi</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4" viewportRef={scrollAreaViewportRef}>
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          'flex items-start gap-3',
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {message.role === 'ai' && (
                          <Avatar className="h-8 w-8">
                             <AvatarFallback><Bot size={20}/></AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={cn(
                            'max-w-xs rounded-lg px-4 py-2 text-sm',
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          )}
                        >
                          {message.content}
                        </div>
                         {message.role === 'user' && (
                          <Avatar className="h-8 w-8">
                             <AvatarFallback><User size={20}/></AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                       <div className="flex items-start gap-3 justify-start">
                          <Avatar className="h-8 w-8">
                             <AvatarFallback><Bot size={20}/></AvatarFallback>
                          </Avatar>
                          <div className="bg-muted rounded-lg px-4 py-2 text-sm">
                              <div className="flex items-center space-x-1">
                                  <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.3s]"></span>
                                  <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.15s]"></span>
                                  <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50"></span>
                              </div>
                          </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full items-center gap-2"
                >
                  <Input
                    name="query"
                    placeholder="Mesajınızı yazın..."
                    autoComplete="off"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Göndər</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
