"use client";

import { usePathname } from "next/navigation";

export function useActiveNav() {
  const pathname = usePathname() ?? "/";

  const currentId = pathname === "/" ? "" : pathname.replace("/", "");

  return currentId;
}
