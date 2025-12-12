
'use client';

import { useState, useEffect, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { az } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ContactSubmission, DemoRequest } from '@/lib/data';
import { deleteContactSubmission, deleteDemoRequest } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

// A client-only component to format dates, avoiding hydration mismatches.
function FormattedDate({ date }: { date: Date }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a skeleton placeholder on the server and during initial client render.
    return <Skeleton className="h-4 w-32" />;
  }

  // Once mounted on the client, render the date formatted in the user's local timezone.
  return <>{format(new Date(date), 'dd MMM yyyy, HH:mm', { locale: az })}</>;
}

type RequestsClientProps = {
    type: 'contact' | 'demo';
    initialData: ContactSubmission[] | DemoRequest[];
};

export function RequestsClient({ type, initialData }: RequestsClientProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    startTransition(async () => {
        const action = type === 'contact' ? deleteContactSubmission : deleteDemoRequest;
        const result = await action(id);
        if (result.success) {
            toast({ title: "Uğurlu", description: "Müraciət silindi." });
        } else {
            toast({ title: "Xəta", description: result.error, variant: 'destructive' });
        }
    });
  }

  const isContact = (item: any): item is ContactSubmission => type === 'contact';

  if (type === 'demo') {
      const demoRequests = initialData as DemoRequest[];
      return (
         <Card>
            <CardHeader>
              <CardTitle>Demo Tələbləri</CardTitle>
              <CardDescription>
                Saytınız vasitəsilə göndərilmiş demo sorğularının siyahısı.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Ad / Şirkət</TableHead>
                        <TableHead className="hidden md:table-cell">E-poçt</TableHead>
                        <TableHead className="hidden md:table-cell">Telefon</TableHead>
                        <TableHead>IP Ünvan</TableHead>
                        <TableHead>Tarix</TableHead>
                        <TableHead>
                            <span className="sr-only">Əməliyyatlar</span>
                        </TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {demoRequests.length > 0 ? (
                        demoRequests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell className="font-medium">
                            <div>{request.name}</div>
                            <div className="text-sm text-muted-foreground">{request.company}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{request.email}</TableCell>
                            <TableCell className="hidden md:table-cell">{request.phone || 'Qeyd edilməyib'}</TableCell>
                            <TableCell>{request.ipAddress ?? 'N/A'}</TableCell>
                            <TableCell>
                            <FormattedDate date={request.requestedAt} />
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost" disabled={isPending}>
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Menyunu aç</span>
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={() => handleDelete(request.id)}
                                        disabled={isPending}
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
                            <TableCell colSpan={6} className="h-24 text-center">
                                Heç bir demo tələbi tapılmadı.
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
      );
  }

  if (type === 'contact') {
      const contactSubmissions = initialData as ContactSubmission[];
      return (
           <Card>
            <CardHeader>
              <CardTitle>Əlaqə Mesajları</CardTitle>
              <CardDescription>
                Saytınızın əlaqə formasından göndərilmiş mesajlar.
              </CardDescription>
            </CardHeader>
             <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Ad</TableHead>
                        <TableHead className="hidden md:table-cell">E-poçt</TableHead>
                        <TableHead>Mesaj</TableHead>
                        <TableHead>IP Ünvan</TableHead>
                        <TableHead>Tarix</TableHead>
                        <TableHead>
                            <span className="sr-only">Əməliyyatlar</span>
                        </TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {contactSubmissions.length > 0 ? (
                        contactSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                            <TableCell className="font-medium">{submission.name}</TableCell>
                            <TableCell className="hidden md:table-cell">{submission.email}</TableCell>
                            <TableCell className="max-w-[200px] truncate md:max-w-[300px]">{submission.message}</TableCell>
                            <TableCell>{submission.ipAddress ?? 'N/A'}</TableCell>
                            <TableCell>
                            <FormattedDate date={submission.submittedAt} />
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost" disabled={isPending}>
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Menyunu aç</span>
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={() => handleDelete(submission.id)}
                                        disabled={isPending}
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
                            <TableCell colSpan={6} className="h-24 text-center">
                                Heç bir əlaqə mesajı tapılmadı.
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
             </CardContent>
          </Card>
      );
  }

  return null;
}
