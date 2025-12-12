'use client';

import { useState, useEffect, useTransition, useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/lib/data';
import { MoreHorizontal, PlusCircle, Sparkles, Loader2, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { generateBlogPostAction, saveBlogPostAction, deleteBlogPostAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { FormState } from '@/lib/data';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isEditing ? 'Yadda Saxla' : 'Əlavə Et'}
    </Button>
  );
}

const emptyFormInitialData: Partial<BlogPost> = {
  title: '',
  excerpt: '',
  image: '',
  content: '',
  date: new Date().toISOString().split('T')[0],
};

export function BlogManagementClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const { toast } = useToast();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  
  const [formKey, setFormKey] = useState(Date.now());
  const [formInitialData, setFormInitialData] = useState<Partial<BlogPost>>(emptyFormInitialData);
  
  const initialState: FormState = { success: false, message: '' };
  const [state, formAction] = useActionState(saveBlogPostAction, initialState);
  
  const isEditing = !!formInitialData.id;

  useEffect(() => {
    if (state.message && !state.success) { // Only show toast for errors from the action
      const description = state.errors 
        ? Object.values(state.errors).flat().join('\n') 
        : state.message;
      toast({ title: 'Xəta', description, variant: 'destructive' });
    } else if (state.success) { // Handle success state
        toast({ title: 'Uğurlu!', description: state.message });
        handleCloseDialog();
    }
  }, [state, toast]);

  const handleOpenDialog = (post: BlogPost | null) => {
    if (post) {
      setFormInitialData(post);
    } else {
      setFormInitialData({ ...emptyFormInitialData, date: new Date().toISOString().split('T')[0] });
    }
    setFormKey(Date.now()); // Force re-render of form with new defaultValues
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // No need to manually clear form data, key change on open handles it
  };

  const handleDelete = (id: string) => {
    startDeleteTransition(async () => {
        const result = await deleteBlogPostAction(id);
        if (result?.error) {
            toast({ title: 'Xəta', description: result.error, variant: 'destructive' });
        } else {
            toast({ title: 'Uğurlu!', description: 'Yazı silindi.' });
        }
    });
  };

  const handleAiGenerate = async () => {
    if (!aiTopic.trim()) {
        toast({ title: 'Xəta', description: 'Zəhmət olmasa, bir mövzu daxil edin.', variant: 'destructive' });
        return;
    }
    setIsGenerating(true);
    const formData = new FormData();
    formData.append('topic', aiTopic);
    const result = await generateBlogPostAction(formData);
    setIsGenerating(false);

    if (result.error) {
        toast({ title: 'AI Xətası', description: result.error, variant: 'destructive' });
    } else if (result.data) {
        setFormInitialData({
            title: result.data.title,
            excerpt: result.data.excerpt,
            content: result.data.content,
            date: new Date().toISOString().split('T')[0],
            image: result.data.image,
        });
        setFormKey(Date.now()); // Reset form with AI generated data
        setIsAiDialogOpen(false);
        setIsDialogOpen(true);
        setAiTopic('');
        toast({ title: 'Uğurlu!', description: 'Blog yazısı AI tərəfindən uğurla yaradıldı. Məlumatları yoxlayıb yadda saxlaya bilərsiniz.' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Blog İdarəetməsi</h1>
        <p className="text-muted-foreground">
          Buradan yeni blog yazıları əlavə edə və mövcud olanları redaktə edə bilərsiniz.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Blog Yazıları</CardTitle>
              <CardDescription>Mövcud yazıların siyahısı.</CardDescription>
            </div>
            <div className='flex gap-2'>
                <Dialog open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <Sparkles className="mr-2 h-4 w-4" />
                            AI ilə Yazı Yarat
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>AI ilə Blog Yazısı Yarat</DialogTitle>
                            <DialogDescription>
                                Yazmaq istədiyiniz mövzunu daxil edin. AI sizin üçün məzmun və uyğun bir şəkil yaradacaq.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Label htmlFor="ai-topic">Mövzu</Label>
                            <Input 
                                id="ai-topic"
                                value={aiTopic}
                                onChange={(e) => setAiTopic(e.target.value)}
                                placeholder="Məsələn: Səhiyyədə biometrik təhlükəsizlik"
                                disabled={isGenerating}
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsAiDialogOpen(false)} disabled={isGenerating}>Ləğv et</Button>
                            <Button onClick={handleAiGenerate} disabled={isGenerating}>
                                {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isGenerating ? 'Yaradılır...' : 'Yarat'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isDialogOpen} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
                <DialogTrigger asChild>
                    <Button onClick={() => handleOpenDialog(null)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Yeni Yazı Əlavə Et
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                    <DialogTitle>{isEditing ? 'Yazını Redaktə Et' : 'Yeni Blog Yazısı'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Yazının məlumatlarını yeniləyin.' : 'Yeni blog yazısının məlumatlarını daxil edin.'}
                    </DialogDescription>
                    </DialogHeader>
                    <form key={formKey} action={formAction}>
                    {isEditing && <input type="hidden" name="id" value={formInitialData.id} />}
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Başlıq
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            defaultValue={formInitialData.title}
                            className="col-span-3"
                            placeholder="Yazının başlığı"
                            required
                        />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Tarix
                        </Label>
                        <Input
                            id="date"
                            name="date"
                            type="date"
                            defaultValue={formInitialData.date}
                            className="col-span-3"
                            required
                        />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="excerpt" className="text-right pt-2">
                            Qısa Məzmun
                        </Label>
                        <Textarea
                            id="excerpt"
                            name="excerpt"
                            defaultValue={formInitialData.excerpt}
                            className="col-span-3"
                            placeholder="Yazı üçün qısa təsvir"
                            required
                        />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="content" className="text-right pt-2">
                            Tam Mətn (HTML)
                        </Label>
                        <Textarea
                            id="content"
                            name="content"
                            defaultValue={formInitialData.content}
                            className="col-span-3 min-h-[250px] font-mono text-xs"
                            placeholder="Yazının tam mətnini (zəngin HTML formatında). Mətn daxilində şəkil əlavə etmək üçün <img> teqindən istifadə edə bilərsiniz."
                            required
                        />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Əsas Şəkil URL
                        </Label>
                        <Input
                            id="image"
                            name="image"
                            defaultValue={formInitialData.image}
                            className="col-span-3"
                            placeholder="https://placehold.co/800x450.png"
                        />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Ləğv Et
                        </Button>
                        </DialogClose>
                        <SubmitButton isEditing={isEditing} />
                    </DialogFooter>
                    </form>
                </DialogContent>
                </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Şəkil</span>
                </TableHead>
                <TableHead>Başlıq</TableHead>
                <TableHead>
                  <span className="sr-only">Əməliyyatlar</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialPosts.length > 0 ? (
                initialPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt={post.title}
                        className="aspect-video rounded-md object-cover"
                        height="64"
                        src={post.image}
                        width="100"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost" disabled={isDeletePending}>
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menyunu aç</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Əməliyyatlar</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleOpenDialog(post)}>Redaktə Et</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(post.id)}
                            disabled={isDeletePending}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                        Heç bir blog yazısı tapılmadı.
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
