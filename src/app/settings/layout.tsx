import { DashboardHeader } from "@/components/dashboard-header";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <DashboardHeader portalName="Settings" userName="System Admin" />
      <main className="flex-1 container py-8">{children}</main>
    </div>
  );
}
