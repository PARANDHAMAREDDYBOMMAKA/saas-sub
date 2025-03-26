"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function UserDropdown() {
  const router = useRouter();
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    const supabase = createClientComponentClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-50"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-12 left-0 z-10 w-full bg-white rounded-md shadow-lg border">
          <div className="py-1">
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
