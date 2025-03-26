"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/store/user-store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function Providers({ children }: { children: React.ReactNode }) {
  const { setUser, setSubscription, setLoading } = useUserStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClientComponentClient();

    // Initial auth check
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          // Get user profile from database
          const { data: userData } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single();

          // Get subscription data
          const { data: subscriptionData } = await supabase
            .from("subscriptions")
            .select("*, prices(*, products(*))")
            .eq("user_id", session.user.id)
            .in("status", ["trialing", "active"])
            .single();

          setUser(userData);
          setSubscription(subscriptionData);
        } else {
          setUser(null);
          setSubscription(null);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
        setIsLoaded(true);
      }
    };

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: string, session: any) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        checkUser();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setSubscription(null);
        setLoading(false);
      }
    });

    checkUser();

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setSubscription, setLoading]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
