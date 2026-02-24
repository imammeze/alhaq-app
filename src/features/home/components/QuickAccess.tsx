"use client";

import { useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/features/navigation/constants";

export default function QuickAccess() {
  const router = useRouter();
  const quickItems = NAV_ITEMS.filter((item) => item.path !== "/");

  return (
    <div className="mt-6 px-5">
      <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">
        Akses Cepat
      </h3>

      <div className="grid grid-cols-5 gap-y-6 gap-x-2">
        {quickItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                <Icon className="w-6 h-6" />
              </div>

              <span className="text-[11px] font-medium text-gray-700 text-center leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
