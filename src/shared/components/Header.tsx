"use client";

import { SearchIcon, BellIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="px-5 pt-6 pb-4 flex items-center justify-between bg-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-lg">
          H
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">
            Assalamu'alaikum
          </p>
          <p className="text-sm font-bold text-gray-800">Hamba Allah</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full bg-gray-50 text-gray-600">
          <SearchIcon className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full bg-gray-50 text-gray-600 relative">
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>
      </div>
    </header>
  );
}
