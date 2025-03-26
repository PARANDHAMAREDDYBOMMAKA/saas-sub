"use client";

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { CheckoutButton } from "./checkout-button";
import { formatCurrency } from "@/lib/utils";

export function PricingTable({
  products,
  hasSubscription,
}: {
  products: any[];
  hasSubscription: boolean;
}) {
  const [frequency, setFrequency] = useState<"monthly" | "yearly">("monthly");

  // Group products by type (e.g., tier)
  const groupedProducts = products.reduce((acc, product) => {
    const prices = product.prices.filter((price: any) => {
      if (frequency === "monthly") {
        return price.interval === "month";
      } else {
        return price.interval === "year";
      }
    });

    if (prices.length > 0) {
      return [...acc, { ...product, price: prices[0] }];
    }

    return acc;
  }, []);

  return (
    <div className="space-y-8">
      {/* Frequency selector */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-gray-100 rounded-md">
          <button
            onClick={() => setFrequency("monthly")}
            className={`px-4 py-2 text-sm rounded-md ${
              frequency === "monthly"
                ? "bg-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setFrequency("yearly")}
            className={`px-4 py-2 text-sm rounded-md ${
              frequency === "yearly"
                ? "bg-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Product cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {groupedProducts.length > 0 ? (
          groupedProducts.map((product: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: { unit_amount: number; currency: string | undefined; id: string; }; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; metadata: { features: string; }; }) => (
            <div
              key={product.id}
              className="border rounded-lg p-6 flex flex-col"
            >
              <h3 className="text-xl font-bold">{product.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold">
                  {formatCurrency(
                    product.price.unit_amount,
                    product.price.currency
                  )}
                </span>
                <span className="ml-1 text-gray-500">
                  /{frequency === "monthly" ? "month" : "year"}
                </span>
              </div>

              <p className="mt-4 text-gray-600">{product.description}</p>

              <div className="mt-6 space-y-4 flex-1">
                <ul className="space-y-3">
                  {product.metadata?.features ? (
                    JSON.parse(product.metadata.features).map(
                      (feature: string, index: number) => (
                        <li key={index} className="flex">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      )
                    )
                  ) : (
                    <li className="flex">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      All basic features
                    </li>
                  )}
                </ul>
              </div>

              <div className="mt-8">
                <CheckoutButton
                  priceId={product.price.id}
                  hasSubscription={hasSubscription}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-500">
              No plans available with the selected billing interval.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
