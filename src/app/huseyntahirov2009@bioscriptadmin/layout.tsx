import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { Home, Newspaper, Users, BarChart, LogOut, Building } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { logout } from '@/app/actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/huseyntahirov2009@bioscriptadmin">
            <Logo />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/huseyntahirov2009@bioscriptadmin">
                  <Home />
                  İdarəetmə Paneli
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/huseyntahirov2009@bioscriptadmin/requests">
                  <BarChart />
                  Müraciətlər
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/huseyntahirov2009@bioscriptadmin/blog">
                  <Newspaper />
                  Blog
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/huseyntahirov2009@bioscriptadmin/team">
                  <Users />
                  Komanda
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/huseyntahirov2009@bioscriptadmin/partners">
                  <Building />
                  Dəstəkçilər
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className='flex-col items-start gap-4'>
            <div className="flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm font-medium">
                <Avatar className="size-8">
                    <AvatarFallback>H</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span>Hüseyn Tahirov</span>
                    <span className="text-xs text-sidebar-foreground/70">huseyntahirov@bioscript.shop</span>
                </div>
            </div>
            <form action={logout} className="w-full">
                <Button variant="ghost" type="submit" className="w-full justify-start gap-2 p-2 text-left text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <LogOut />
                    Çıxış
                </Button>
            </form>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background px-4 md:justify-end">
            <SidebarTrigger className="md:hidden" />
            <p className="font-semibold">Xoş gəlmisiniz, Hüseyn!</p>
        </header>
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
