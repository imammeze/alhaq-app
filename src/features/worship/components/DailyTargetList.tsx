"use client";

import { CheckIcon, PlusIcon, Trash2Icon, PencilIcon } from "lucide-react";
import { ICON_MAP } from "../constants/targets";
import { useDailyTargets } from "../hooks/useDailyTargets";
import { AddTargetModal } from "./AddTargetModal";

export const DailyTargetList = () => {
  const {
    targets,
    stats,
    toggleTarget,
    deleteTarget,
    addTarget,
    isModalOpen,
    setIsModalOpen,
  } = useDailyTargets();

  return (
    <>
      <div className="space-y-3">
        {/* Header Section dengan Tombol Tambah & Counter */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Target Harian
          </h3>

          <div className="flex items-center gap-2">
            {stats.completedCount > 0 && (
              <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg animate-in fade-in">
                {stats.completedCount} Selesai
              </span>
            )}

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#064e3b] text-white rounded-full text-[10px] font-bold shadow-sm hover:bg-[#022c22] transition">
              <PlusIcon className="w-3 h-3" />
              Tambah Ibadah
            </button>
          </div>
        </div>

        {/* List Target */}
        <div className="space-y-3">
          {targets.map((target) => {
            const Icon = ICON_MAP[target.iconName] || ICON_MAP["Sun"]; // Fallback icon

            return (
              <div
                key={target.id}
                onClick={() => toggleTarget(target.id)}
                className={`
                  relative overflow-hidden rounded-2xl p-3 border transition-all duration-300 cursor-pointer group select-none
                  ${
                    target.isCompleted
                      ? "bg-emerald-50/50 border-emerald-100"
                      : "bg-white border-gray-100 hover:bg-gray-50 shadow-sm"
                  }
                `}>
                <div className="flex items-center justify-between z-10 relative">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        target.isCompleted
                          ? "bg-emerald-100 text-emerald-600"
                          : `${target.bg} ${target.color}`
                      }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-bold transition-colors ${
                          target.isCompleted
                            ? "text-emerald-800 line-through decoration-emerald-800/50"
                            : "text-gray-800"
                        }`}>
                        {target.title}
                      </p>
                      <p className="text-xs text-gray-400">{target.subtitle}</p>
                    </div>
                  </div>

                  {/* Action Icons (Visible on Hover/Completed) */}
                  <div className="flex items-center gap-2">
                    {/* Tombol Hapus (Hanya muncul saat hover & belum selesai, atau bisa disesuaikan) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTarget(target.id);
                      }}
                      className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2Icon className="w-4 h-4" />
                    </button>

                    {/* Checkbox Visual */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        target.isCompleted
                          ? "bg-[#064e3b] border-[#064e3b]"
                          : "border-gray-200 group-hover:border-emerald-500"
                      }`}>
                      {target.isCompleted && (
                        <CheckIcon className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty State jika kosong */}
          {targets.length === 0 && (
            <div className="text-center py-8 bg-white border border-dashed border-gray-200 rounded-2xl">
              <p className="text-sm text-gray-400">Belum ada target ibadah</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs text-emerald-600 font-bold mt-2 hover:underline">
                Buat Target Baru
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Render Modal */}
      <AddTargetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addTarget}
      />
    </>
  );
};
