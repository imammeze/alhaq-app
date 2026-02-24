import { TrackerStats } from "../types";

interface ProgressCardProps {
  stats: TrackerStats;
}

export const ProgressCard = ({ stats }: ProgressCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#064e3b"
            strokeWidth="3"
            strokeDasharray={`${stats.percentage}, 100`}
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <span className="absolute text-sm font-bold text-gray-800">
          {stats.completed}/{stats.total}
        </span>
      </div>
      <div>
        <h3 className="font-bold text-gray-800">
          {stats.isAllCompleted ? "Alhamdulillah! 🎉" : "Bismillah! 💪"}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {stats.isAllCompleted
            ? "Semua target tercapai"
            : `${stats.remaining} solat lagi hari ini`}
        </p>
      </div>
    </div>
  );
};
