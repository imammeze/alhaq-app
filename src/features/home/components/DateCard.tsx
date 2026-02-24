import { ChevronRightIcon } from "lucide-react";

export default function DateCard() {
  const today = new Date();

  const dayName = today.toLocaleDateString("id-ID", { weekday: "long" });
  const dateNum = today.getDate();
  const fullDate = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="px-5 mt-4">
      <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold text-sm">
            {dateNum}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">{fullDate}</p>
            <p className="text-xs text-gray-400">Ketuk untuk kalender</p>
          </div>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-gray-300" />
      </div>
    </div>
  );
}
