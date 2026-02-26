"use client";

import { useState, useEffect } from "react";

export interface HistoryItem {
  surahId: number;
  surahName: string;
  ayatNumber: number;
  timestamp: number;
}

const HISTORY_KEY = "quran_history";
const BOOKMARK_KEY = "quran_bookmarks";
const LAST_READ_KEY = "quran_last_read";

export const useQuranStorage = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [bookmarks, setBookmarks] = useState<HistoryItem[]>([]);
  const [lastRead, setLastRead] = useState<HistoryItem | null>(null);

  useEffect(() => {
    const loadData = () => {
      const h = localStorage.getItem(HISTORY_KEY);
      const b = localStorage.getItem(BOOKMARK_KEY);
      const l = localStorage.getItem(LAST_READ_KEY);

      if (h) setHistory(JSON.parse(h));
      if (b) setBookmarks(JSON.parse(b));
      if (l) setLastRead(JSON.parse(l));
    };

    loadData();

    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, []);

  const deleteBookmark = (surahId: number, ayatNumber: number) => {
    const newBookmarks = bookmarks.filter(
      (b) => !(b.surahId === surahId && b.ayatNumber === ayatNumber)
    );
    setBookmarks(newBookmarks);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(newBookmarks));
  };

  return { history, bookmarks, lastRead, deleteBookmark };
};
