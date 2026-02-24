"use client";

import { useState } from "react";
import {
  HistoryIcon,
  CalculatorIcon,
  CoinsIcon,
  WalletIcon,
  Building2Icon,
  InfoIcon,
  SaveIcon,
} from "lucide-react";

type ZakatTab = "penghasilan" | "maal" | "perdagangan";

export default function Page() {
  const [activeTab, setActiveTab] = useState<ZakatTab>("penghasilan");
  const [income, setIncome] = useState<string>("");
  const [bonus, setBonus] = useState<string>("");
  const [debt, setDebt] = useState<string>("");

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center justify-between bg-white">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Kalkulator Zakat</h1>
          <p className="text-xs text-gray-500">Hitung & Catat Zakatmu</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-[#064e3b] text-white text-xs font-bold rounded-lg flex items-center gap-1.5">
            <CalculatorIcon className="w-3.5 h-3.5" />
            Hitung
          </button>

          <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-lg flex items-center gap-1.5">
            <HistoryIcon className="w-3.5 h-3.5" />
            Riwayat
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-5 py-4 flex gap-2 overflow-x-auto no-scrollbar">
        <TabButton
          label="Penghasilan"
          icon={<WalletIcon className="w-3.5 h-3.5" />}
          active={activeTab === "penghasilan"}
          onClick={() => setActiveTab("penghasilan")}
        />
        <TabButton
          label="Maal (Harta)"
          icon={<CoinsIcon className="w-3.5 h-3.5" />}
          active={activeTab === "maal"}
          onClick={() => setActiveTab("maal")}
        />
        <TabButton
          label="Perdagangan"
          icon={<Building2Icon className="w-3.5 h-3.5" />}
          active={activeTab === "perdagangan"}
          onClick={() => setActiveTab("perdagangan")}
        />
      </div>

      {/* Gold Price */}
      <div className="px-5 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
              <CoinsIcon className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-gray-600">
              Harga Emas Saat Ini
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-gray-900">
              Rp 1.347.143/gr
            </span>
            <InfoIcon className="w-3 h-3 text-gray-300" />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-5 space-y-4 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          <InputGroup
            label="PEMASUKAN BULANAN"
            value={income}
            onChange={setIncome}
          />
          <InputGroup label="BONUS / THR" value={bonus} onChange={setBonus} />
          <InputGroup
            label="HUTANG / CICILAN"
            value={debt}
            onChange={setDebt}
          />
        </div>
      </div>

      {/* Result Card */}
      <div className="px-5">
        <div className="bg-[#a3a3a3] rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold opacity-80 uppercase">
              TOTAL ZAKAT ({activeTab.toUpperCase()})
            </h3>

            <span className="px-2 py-1 bg-white/20 rounded-lg text-[10px] font-bold flex items-center gap-1">
              <InfoIcon className="w-3 h-3" />
              Belum Wajib
            </span>
          </div>

          <h2 className="text-4xl font-bold mb-6">Rp 0</h2>

          <div className="bg-black/10 rounded-xl p-4 mb-4">
            <div className="flex justify-between text-[10px] font-bold mb-2">
              <span>Progress Nisab</span>
              <span>0%</span>
            </div>

            <div className="w-full bg-white/20 h-2 rounded-full mb-2">
              <div className="bg-white h-2 rounded-full w-0" />
            </div>

            <div className="flex justify-between text-[10px] opacity-60">
              <span>0</span>
              <span>Nisab: Rp 6.947.283</span>
            </div>
          </div>

          <button className="w-full py-3 bg-white/20 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/30 transition-colors">
            <SaveIcon className="w-4 h-4" />
            Simpan Catatan
          </button>
        </div>

        <p className="text-[10px] text-gray-400 text-center mt-4 leading-relaxed px-4">
          Perhitungan ini menggunakan harga emas referensi. Nisab mengikuti
          standar emas 85 gram untuk Mal/Perniagaan atau setara untuk Profesi.
        </p>
      </div>
    </div>
  );
}

/* ---------- Sub Components ---------- */

function TabButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
        active
          ? "bg-[#064e3b] text-white"
          : "bg-white border border-gray-200 text-gray-500"
      }`}>
      {icon}
      {label}
    </button>
  );
}

function InputGroup({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
        {label}
      </label>

      <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-bold text-gray-400">Rp</span>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-right font-bold text-gray-900 outline-none w-full ml-2"
          placeholder="0"
        />
      </div>
    </div>
  );
}
