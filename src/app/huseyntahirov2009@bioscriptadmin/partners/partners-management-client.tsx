
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
import type { Partner } from '@/lib/data';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { savePartnerAction, deletePartnerAction, seedDatabaseAction } from '@/app/actions';
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

const emptyFormInitialData: Partial<Partner> = {
    name: '',
    logo: '',
    order: 0,
};

export function PartnersManagementClient({ initialPartners }: { initialPartners: Partner[] }) {
  const { toast } = useToast();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSeeding, startSeedTransition] = useTransition();


  const [formKey, setFormKey] = useState(Date.now());
  const [formInitialData, setFormInitialData] = useState<Partial<Partner>>(emptyFormInitialData);

  const initialState: FormState = { success: false, message: '' };
  const [state, formAction] = useActionState(savePartnerAction, initialState);
  
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

  const handleOpenDialog = (partner: Partner | null) => {
    setFormInitialData(partner || emptyFormInitialData);
    setFormKey(Date.now());
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    startDeleteTransition(async () => {
        const result = await deletePartnerAction(id);
        if (result?.error) {
            toast({ title: 'Xəta', description: result.error, variant: 'destructive' });
        } else {
            toast({ title: 'Uğurlu!', description: 'Dəstəkçi silindi.' });
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
        <h1 className="text-2xl font-bold">Dəstəkçilərin İdarəetməsi</h1>
        <p className="text-muted-foreground">
          Buradan dəstəkçiləri (partnyorları) əlavə edə, redaktə edə və silə bilərsiniz.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Dəstəkçilər</CardTitle>
              <CardDescription>Mövcud dəstəkçilərin siyahısı.</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog(null)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Yeni Dəstəkçi Əlavə Et
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{isEditing ? 'Dəstəkçini Redaktə Et' : 'Yeni Dəstəkçi'}</DialogTitle>
                </DialogHeader>
                <form key={formKey} action={formAction}>
                  {isEditing && <input type="hidden" name="id" defaultValue={formInitialData.id} />}
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Ad</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={formInitialData.name}
                        className="col-span-3"
                        placeholder="Dəstəkçi adı"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="logo" className="text-right">Loqo URL</Label>
                      <Input
                        id="logo"
                        name="logo"
                        defaultValue={formInitialData.logo}
                        className="col-span-3"
                        placeholder="https://placehold.co/150x60.png"
                      />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="order" className="text-right">Sıra</Label>
                      <Input
                        id="order"
                        name="order"
                        type="number"
                        defaultValue={formInitialData.order}
                        className="col-span-3"
                        placeholder={isEditing ? '' : 'Avtomatik təyin olunacaq'}
                        required={isEditing}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="secondary">Ləğv Et</Button></DialogClose>
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
                <TableHead className="hidden w-[100px] sm:table-cell">Loqo</TableHead>
                <TableHead>Ad</TableHead>
                <TableHead><span className="sr-only">Əməliyyatlar</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialPartners.length > 0 ? (
                initialPartners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell className="font-medium">{partner.order}</TableCell>
                    <TableCell className="hidden sm:table-cell p-1">
                      <img
                        alt={`${partner.name} loqosu`}
                        className="aspect-[2/1] rounded-md object-contain"
                        height="50"
                        src={partner.logo}
                        width="100"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{partner.name}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleOpenDialog(partner)}>Redaktə Et</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(partner.id)}
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
                  <TableCell colSpan={4} className="h-24 text-center">
                    Heç bir dəstəkçi tapılmadı.
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
