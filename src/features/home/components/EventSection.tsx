"use client";

import {
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
} from "lucide-react";
import Image from "next/image";

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Kajian Akbar Menyambut Ramadhan",
    date: "15 Mar",
    time: "08:00 WIB",
    location: "Masjid Agung Darussalam",
    category: "Kajian Umum",
    imageUrl:
      "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Buka Puasa Bersama Anak Yatim",
    date: "20 Mar",
    time: "16:30 WIB",
    location: "Panti Asuhan Al-Kautsar",
    category: "Sosial",
    imageUrl:
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Tahsin & Tajwid Al-Quran Mingguan",
    date: "22 Mar",
    time: "Ba'da Maghrib",
    location: "Ruang Utama Masjid",
    category: "Pendidikan",
    imageUrl:
      "https://images.unsplash.com/photo-1649297711865-3d7c4de3610f?q=80&w=773&auto=format&fit=crop",
  },
];

export default function EventSection() {
  return (
    <div className="mt-8">
      <div className="px-5 flex justify-between items-end mb-4">
        <div>
          <h2 className="text-base font-bold text-gray-800 tracking-tight">
            Acara Mendatang
          </h2>
          <p className="text-[11px] text-gray-500 font-medium mt-0.5">
            Jangan lewatkan agenda kebaikan
          </p>
        </div>
        <button className="text-[10px] font-bold text-rose-600 flex items-center gap-1 hover:text-rose-700 transition-colors">
          Lihat Semua <ArrowRightIcon className="w-3 h-3" />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto px-5 pb-4 no-scrollbar snap-x scroll-smooth">
        {UPCOMING_EVENTS.map((event) => (
          <div
            key={event.id}
            className="flex-none w-[260px] bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all snap-center group cursor-pointer">
            <div className="relative h-32 w-full bg-gray-100 overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[9px] font-bold text-[#4c0519]">
                {event.category}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-rose-50 rounded-xl p-2 text-center min-w-[50px] flex flex-col items-center justify-center border border-rose-100/50">
                  <span className="text-lg font-bold text-[#4c0519] leading-none mb-1">
                    {event.date.split(" ")[0]}
                  </span>
                  <span className="text-[9px] font-bold text-rose-600 uppercase">
                    {event.date.split(" ")[1]}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-rose-700 transition-colors">
                  {event.title}
                </h3>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-gray-50">
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                  <ClockIcon className="w-3.5 h-3.5 text-gray-400" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                  <MapPinIcon className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex-none w-[120px] flex items-center justify-center snap-center">
          <button className="flex flex-col items-center justify-center gap-2 text-rose-600 hover:text-[#4c0519] transition-colors">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
              <ArrowRightIcon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold">Lihat Semua</span>
          </button>
        </div>
      </div>
    </div>
  );
}
