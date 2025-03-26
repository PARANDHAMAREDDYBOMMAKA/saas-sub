import { getActiveProducts } from "@/lib/subscription";
import { getUserDetails } from "@/lib/auth";
import { PricingTable } from "@/components/dashboard/billing/pricing-table";
import { ManageSubscriptionButton } from "@/components/dashboard/billing/manage-subscription-button";

export default async function BillingPage() {
  const user = await getUserDetails();
  const products = await getActiveProducts();
  const hasSubscription =
    !!user?.subscriptions?.length &&
    ["active", "trialing"].includes(user.subscriptions[0].status);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Billing</h1>
      </div>

      {/* Current subscription status */}
      {hasSubscription && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Current Subscription</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">
                {user.subscriptions[0].status === "trialing"
                  ? "Trial"
                  : "Active"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Plan</p>
              <p className="font-medium">
                {/* This would need to be mapped to the actual product name */}
                Premium Plan
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Current period</p>
              <p className="font-medium">
                {new Date(
                  user.subscriptions[0].current_period_start
                ).toLocaleDateString()}
                {" - "}
                {new Date(
                  user.subscriptions[0].current_period_end
                ).toLocaleDateString()}
              </p>
            </div>

            <div className="pt-4">
              <ManageSubscriptionButton />
            </div>
          </div>
        </div>
      )}

      {/* Pricing table */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-6">
          {hasSubscription ? "Change Plan" : "Subscription Plans"}
        </h2>
        <PricingTable products={products} hasSubscription={hasSubscription} />
      </div>
    </div>
  );
}
