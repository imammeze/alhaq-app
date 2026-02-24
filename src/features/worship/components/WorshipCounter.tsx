"use client";

import { useState } from "react";
import { WorshipItem } from "../types";
import { RADIUS, CIRCUMFERENCE } from "../constants";
import { WorshipSelector } from "./WorshipSelector";
import { WorshipControls } from "./WorshipControls";

interface Props {
  item: WorshipItem;
}

export function WorshipCounter({ item }: Props) {
  const [count, setCount] = useState<number>(0);

  const progress = count % item.target;
  const strokeDashoffset =
    CIRCUMFERENCE - (CIRCUMFERENCE * progress) / item.target;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 pb-24 bg-gray-50 min-h-screen">
      <WorshipSelector item={item} />

      <div
        className="relative w-72 h-72 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
        onClick={() => setCount((c) => c + 1)}>
        <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_60px_rgba(0,0,0,0.05)]" />

        <svg
          className="absolute inset-0 w-full h-full -rotate-90 p-4"
          viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="#064e3b"
            strokeWidth="2"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>

        <div className="text-center relative z-10">
          <h1 className="text-8xl font-bold text-slate-900 font-mono tracking-tighter">
            {count}
          </h1>
        </div>
      </div>

      <p className="mt-12 text-3xl text-gray-800 text-center">{item.arabic}</p>

      <WorshipControls
        onReset={() => setCount(0)}
        onDecrement={() => setCount((c) => Math.max(0, c - 1))}
      />
    </div>
  );
}
