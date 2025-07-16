import { DashboardHeader } from "@/components/dashboard-header";

export default function PharmacyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <DashboardHeader portalName="Pharmacy Portal" userName="John Doe" />
      <main className="flex-1 container py-8">{children}</main>
    </div>
  );
}
