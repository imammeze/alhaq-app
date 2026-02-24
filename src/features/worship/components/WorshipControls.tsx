"use client";

import { MinusIcon, RotateCcwIcon } from "lucide-react";

interface Props {
  onReset: () => void;
  onDecrement: () => void;
}

export function WorshipControls({ onReset, onDecrement }: Props) {
  return (
    <div className="flex items-center gap-4 mt-8">
      <button
        onClick={onReset}
        className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors">
        <RotateCcwIcon className="w-5 h-5" />
      </button>

      <button
        onClick={onDecrement}
        className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors">
        <MinusIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
