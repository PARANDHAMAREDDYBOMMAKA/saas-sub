import { getUserDetails } from "@/lib/auth";
import { isSubscribed } from "@/lib/subscription";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getUserDetails();
  const hasSubscription = await isSubscribed();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h2 className="font-semibold text-lg mb-4">
            Welcome, {user?.name || "User"}
          </h2>
          <p className="text-gray-600">
            {hasSubscription
              ? "Thank you for subscribing to our platform."
              : "Upgrade to a premium plan to unlock all features."}
          </p>

          {!hasSubscription && (
            <div className="mt-4">
              <Link
                href="/dashboard/billing"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                View plans
              </Link>
            </div>
          )}
        </div>

        {/* Example analytics card */}
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h2 className="font-semibold text-lg mb-4">Usage</h2>
          <div className="h-24 flex items-center justify-center">
            <p className="text-gray-600 text-center">
              Your usage analytics will appear here.
            </p>
          </div>
        </div>

        {/* Example activity card */}
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h2 className="font-semibold text-lg mb-4">Recent Activity</h2>
          <div className="h-24 flex items-center justify-center">
            <p className="text-gray-600 text-center">
              Your recent activity will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
