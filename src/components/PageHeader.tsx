"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
  leftAction?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  showBackButton = false,
  rightAction,
  leftAction,
  className = "",
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <header
      className={`sticky top-0 z-9999 bg-white/95 backdrop-blur-sm border-b border-gray-100 ${className}`}>
      <div className="flex items-center justify-between px-5 py-4">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3 min-w-0">
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Go back">
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
          )}

          {leftAction}

          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-gray-900 leading-tight truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-0.5 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT SECTION */}
        {rightAction && (
          <div className="flex items-center gap-2 shrink-0">{rightAction}</div>
        )}
      </div>
    </header>
  );
}
