import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard/nav/dashboard-nav";
import { getUserDetails } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserDetails();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
