import { ReactNode } from "react";
import { CheckIcon } from "lucide-react";

export function TabButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
        active
          ? "bg-[#064e3b] text-white"
          : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
      }`}>
      {icon}
      {label}
    </button>
  );
}

export function InputGroup({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    onChange(formattedValue);
  };

  return (
    <div>
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
        {label}
      </label>
      <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between border border-transparent focus-within:border-emerald-500 focus-within:bg-white transition-all">
        <span className="text-sm font-bold text-gray-400">Rp</span>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="bg-transparent text-right font-bold text-gray-900 outline-none w-full ml-2"
          placeholder="0"
        />
      </div>
    </div>
  );
}

export function SuccessModal({
  isOpen,
  message,
}: {
  isOpen: boolean;
  message: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" />
      <div className="relative bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-300 w-64 text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-5">
          <CheckIcon className="w-8 h-8 text-[#064e3b]" strokeWidth={3} />
        </div>
        <h3 className="text-lg font-bold text-[#064e3b] mb-2">
          Alhamdulillah!
        </h3>
        <p className="text-[11px] font-medium text-gray-400">{message}</p>
      </div>
    </div>
  );
}
