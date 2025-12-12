
'use client';

import { useState, useEffect, useTransition, useActionState } from 'react';
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
import type { TeamMember } from '@/lib/data';
import { MoreHorizontal, PlusCircle, Loader2, Trash2, Rocket } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { saveTeamMemberAction, deleteTeamMemberAction, seedDatabaseAction } from '@/app/actions';
import type { FormState } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isEditing ? 'Yadda Saxla' : 'Əlavə Et'}
    </Button>
  );
}

const emptyFormInitialData: Partial<TeamMember & { 'social.linkedin': string; 'social.twitter': string; 'social.instagram': string; 'social.facebook': string; }> = {
    name: '',
    role: '',
    image: '',
    'social.linkedin': '',
    'social.twitter': '',
    'social.instagram': '',
    'social.facebook': '',
    order: 0,
};

export function TeamManagementClient({ initialMembers }: { initialMembers: TeamMember[] }) {
  const { toast } = useToast();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSeeding, startSeedTransition] = useTransition();

  
  const [formKey, setFormKey] = useState(Date.now());
  const [formInitialData, setFormInitialData] = useState<Partial<TeamMember & { 'social.linkedin': string; 'social.twitter': string; 'social.instagram': string; 'social.facebook': string; }>>(emptyFormInitialData);

  const initialState: FormState = { success: false, message: '' };
  const [state, formAction] = useActionState(saveTeamMemberAction, initialState);
  
  const isEditing = !!formInitialData.id;

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({ title: 'Uğurlu!', description: state.message });
        handleCloseDialog();
      } else {
        const description = state.errors ? Object.values(state.errors).flat().join('\n') : state.message;
        toast({ title: 'Xəta', description, variant: 'destructive' });
      }
    }
  }, [state, toast]);

  const handleOpenDialog = (member: TeamMember | null) => {
    if (member) {
      setFormInitialData({
          ...member,
          'social.linkedin': member.social.linkedin || '',
          'social.twitter': member.social.twitter || '',
          'social.instagram': member.social.instagram || '',
          'social.facebook': member.social.facebook || '',
      });
    } else {
      setFormInitialData(emptyFormInitialData);
    }
    setFormKey(Date.now());
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    startDeleteTransition(async () => {
        const result = await deleteTeamMemberAction(id);
        if (result?.error) {
            toast({ title: 'Xəta', description: result.error, variant: 'destructive' });
        } else {
            toast({ title: 'Uğurlu!', description: 'Komanda üzvü silindi.' });
        }
    });
  };

  const handleSeed = () => {
    startSeedTransition(async () => {
        const result = await seedDatabaseAction();
        toast({
            title: result.success ? 'Uğurlu!' : 'Xəta!',
            description: result.message,
            variant: result.success ? 'default' : 'destructive',
        });
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Komanda İdarəetməsi</h1>
        <p className="text-muted-foreground">
          Buradan komanda üzvlərini əlavə edə, redaktə edə və silə bilərsiniz.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Komanda Üzvləri</CardTitle>
              <CardDescription>Mövcud komanda üzvlərinin siyahısı.</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog(null)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Yeni Üzv Əlavə Et
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{isEditing ? 'Komanda Üzvünü Redaktə Et' : 'Yeni Komanda Üzvü'}</DialogTitle>
                </DialogHeader>
                <form key={formKey} action={formAction}>
                  {isEditing && <input type="hidden" name="id" defaultValue={formInitialData.id} />}
                  <div className="grid gap-4 py-4">
                     <div className="space-y-2">
                      <Label htmlFor="name">Ad</Label>
                      <Input id="name" name="name" defaultValue={formInitialData.name} placeholder="Aysel Məmmədova" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Vəzifə</Label>
                      <Input id="role" name="role" defaultValue={formInitialData.role} placeholder="CEO & Qurucu" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Şəkil URL</Label>
                      <Input id="image" name="image" defaultValue={formInitialData.image} placeholder="https://placehold.co/250x250.png" />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="order">Sıra</Label>
                      <Input id="order" name="order" type="number" defaultValue={formInitialData.order} placeholder={isEditing ? '' : 'Avtomatik təyin olunacaq'} required={isEditing}/>
                    </div>
                    
                    <h4 className="text-sm font-medium pt-2 border-t mt-2">Sosial Hesablar</h4>
                    <div className="space-y-2">
                      <Label htmlFor="social.linkedin">LinkedIn URL</Label>
                      <Input id="social.linkedin" name="social.linkedin" defaultValue={formInitialData['social.linkedin']} placeholder="https://linkedin.com/in/..." />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="social.twitter">Twitter (X) URL</Label>
                      <Input id="social.twitter" name="social.twitter" defaultValue={formInitialData['social.twitter']} placeholder="https://x.com/..." />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="social.instagram">Instagram URL</Label>
                      <Input id="social.instagram" name="social.instagram" defaultValue={formInitialData['social.instagram']} placeholder="https://instagram.com/..." />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="social.facebook">Facebook URL</Label>
                      <Input id="social.facebook" name="social.facebook" defaultValue={formInitialData['social.facebook']} placeholder="https://facebook.com/..." />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">Ləğv Et</Button>
                    </DialogClose>
                    <SubmitButton isEditing={isEditing} />
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sıra</TableHead>
                <TableHead className="hidden w-[100px] sm:table-cell">Şəkil</TableHead>
                <TableHead>Ad</TableHead>
                <TableHead>Vəzifə</TableHead>
                <TableHead><span className="sr-only">Əməliyyatlar</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialMembers.length > 0 ? (
                initialMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.order}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt={`${member.name} profili`}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={member.image}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell><Badge variant="outline">{member.role}</Badge></TableCell>
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
                          <DropdownMenuItem onClick={() => handleOpenDialog(member)}>Redaktə Et</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(member.id)}
                            disabled={isDeletePending}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                      Heç bir komanda üzvü tapılmadı.
                       <div className='mt-4'>
                           <Button onClick={handleSeed} disabled={isSeeding}>
                                {isSeeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Rocket className="mr-2 h-4 w-4" />}
                                Başlanğıc Məlumatları Yüklə
                            </Button>
                       </div>
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
