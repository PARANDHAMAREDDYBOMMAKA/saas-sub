"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserDropdown } from "./user-dropdown";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Billing", href: "/dashboard/billing" },
  { name: "Settings", href: "/dashboard/settings" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col border-r w-64 bg-white">
      <div className="p-4 border-b">
        <Link href="/dashboard" className="text-xl font-bold">
          SaaS Platform
        </Link>
      </div>

      <div className="flex-1 px-2 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <UserDropdown />
      </div>
    </div>
  );
}
