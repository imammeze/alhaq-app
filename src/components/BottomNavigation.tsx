"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/features/navigation/constants";
import { useActiveNav } from "@/features/navigation/hooks/useActiveNav";

export default function BottomNavigation() {
  const router = useRouter();
  const currentId = useActiveNav();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const activeEl = scrollRef.current.querySelector(
      `[data-nav-id="${currentId}"]`
    ) as HTMLElement | null;

    if (!activeEl) return;

    const containerWidth = scrollRef.current.offsetWidth;

    const scrollLeft =
      activeEl.offsetLeft - containerWidth / 2 + activeEl.offsetWidth / 2;

    scrollRef.current.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  }, [currentId]);

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg bg-white border-t border-gray-100 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div
        ref={scrollRef}
        className="flex items-center px-2 py-2 overflow-x-auto no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentId === item.id;

          return (
            <button
              key={item.id}
              data-nav-id={item.id}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center justify-center min-w-16 py-1 gap-1 ${
                isActive ? "text-[#064e3b]" : "text-gray-400"
              }`}>
              <div
                className={`p-1.5 rounded-xl transition-all duration-200 ${
                  isActive ? "bg-[#064e3b] text-white" : "bg-transparent"
                }`}>
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
              </div>

              <span
                className={`text-[10px] whitespace-nowrap ${
                  isActive ? "font-bold" : "font-medium"
                }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
