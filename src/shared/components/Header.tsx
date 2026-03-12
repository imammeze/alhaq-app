"use client";

import { useSession } from "next-auth/react";
import { SearchIcon, BellIcon } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;

  const displayName = user?.name || "Hamba Allah";

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "H";

  return (
    <header className="px-5 pt-6 pb-4 flex items-center justify-between bg-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-[#881337] font-bold text-lg">
          {initial}
        </div>

        <div>
          <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">
            Assalamu'alaikum
          </p>
          <p className="text-sm font-bold text-gray-800 line-clamp-1 max-w-37.5">
            {displayName}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 active:scale-95 transition-all">
          <SearchIcon className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full bg-gray-50 text-gray-600 relative hover:bg-gray-100 active:scale-95 transition-all">
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white" />
        </button>
      </div>
    </header>
  );
}
