import { DashboardHeader } from "@/components/dashboard-header";

export default function DoctorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <DashboardHeader portalName="Doctor Portal" userName="Dr. Smith" />
      <main className="flex-1 container py-8">{children}</main>
    </div>
  );
}
