import {
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
} from "lucide-react";

type EventItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string | null;
  location: string;
};

async function getEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/events", {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
        "x-api-key": process.env.API_KEY || "",
      },
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Gagal mengambil data event:", error);
    return [];
  }
}

function formatEventDate(dateString: string) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Ags",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const dateObj = new Date(dateString);

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = months[dateObj.getMonth()];

  return { day, month };
}

function formatTime(timeString: string) {
  if (!timeString) return "";
  return `${timeString.slice(0, 5)} WIB`;
}

export default async function EventSection() {
  const events = await getEvents();

  if (!events || events.length === 0) {
    return null;
  }

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
        {events.map((event) => {
          const { day, month } = formatEventDate(event.event_date);
          const time = formatTime(event.start_time);

          return (
            <div
              key={event.id}
              className="flex-none w-65 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all snap-center group cursor-pointer">
              <div className="relative h-32 w-full bg-gray-100 overflow-hidden">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[9px] font-bold text-[#4c0519]">
                  {event.category}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-rose-50 rounded-xl p-2 text-center min-w-12.5 flex flex-col items-center justify-center border border-rose-100/50">
                    <span className="text-lg font-bold text-[#4c0519] leading-none mb-1">
                      {day}
                    </span>
                    <span className="text-[9px] font-bold text-rose-600 uppercase">
                      {month}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-rose-700 transition-colors">
                    {event.title}
                  </h3>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                    <ClockIcon className="w-3.5 h-3.5 text-gray-400" />
                    {time}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                    <MapPinIcon className="w-3.5 h-3.5 text-gray-400" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex-none w-30 flex items-center justify-center snap-center">
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
