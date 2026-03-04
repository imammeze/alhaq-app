import { useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import { ICON_OPTIONS } from "../constants/icons";

interface TargetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    id?: string;
    title: string;
    subtitle: string;
    iconId: string;
  }) => void;
  initialData?: {
    id: string;
    title: string;
    subtitle: string;
    iconId: string;
  } | null;
}

export function TargetModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: TargetModalProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [iconId, setIconId] = useState("grid");

  useEffect(() => {
    if (isOpen) {
      setTitle(initialData?.title || "");
      setSubtitle(initialData?.subtitle || "");
      setIconId(initialData?.iconId || "grid");
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ id: initialData?.id, title, subtitle, iconId });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-999 w-full max-w-lg mx-auto flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full rounded-t-[2.5rem] pb-safe animate-in slide-in-from-bottom-full duration-300">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" />
        <div className="px-6 pt-4 pb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-gray-800">
              {initialData ? "Edit Target" : "Tambah Target Baru"}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200">
              <XIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                Nama Target
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Dzikir Pagi"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                Deskripsi Singkat (Opsional)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Contoh: Baca 100x"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                Pilih Ikon
              </label>
              <div className="grid grid-cols-6 gap-3">
                {ICON_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setIconId(item.id)}
                    className={`aspect-square rounded-xl flex items-center justify-center transition-all ${
                      iconId === item.id
                        ? "bg-[#4c0519] text-white shadow-md scale-110"
                        : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    }`}>
                    <item.icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="w-full mt-6 py-4 rounded-2xl bg-[#4c0519] text-white font-bold text-sm shadow-md hover:bg-rose-900 disabled:opacity-50 disabled:bg-gray-300 disabled:shadow-none active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              {!initialData && <span className="text-lg leading-none">+</span>}{" "}
              Simpan Target
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
