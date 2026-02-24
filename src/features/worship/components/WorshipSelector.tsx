"use client";

import { WorshipItem } from "../types";

interface Props {
  item: WorshipItem;
}

export function WorshipSelector({ item }: Props) {
  return (
    <div className="bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-3 mb-12">
      <div className="w-6 h-6 bg-emerald-900 rounded-full" />
      <span className="text-sm font-bold text-gray-800">{item.label}</span>
      <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded">
        {item.target}
      </span>
    </div>
  );
}
