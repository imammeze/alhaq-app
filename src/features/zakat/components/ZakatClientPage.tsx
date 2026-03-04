"use client";

import { useState, useEffect } from "react";
import {
  HistoryIcon,
  CalculatorIcon,
  CoinsIcon,
  WalletIcon,
  Building2Icon,
  InfoIcon,
  SaveIcon,
  CheckCircle2Icon,
  TrendingUpIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import { TabButton, InputGroup, SuccessModal } from "./ZakatUI";

type ZakatTab = "penghasilan" | "maal" | "perdagangan";
type ViewMode = "hitung" | "riwayat";

interface ZakatHistoryItem {
  id: string;
  type: string;
  amount: number;
  date: string;
}

interface ZakatClientProps {
  goldPrice: number;
}

export default function ZakatClientPage({ goldPrice }: ZakatClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("hitung");
  const [activeTab, setActiveTab] = useState<ZakatTab>("penghasilan");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [history, setHistory] = useState<ZakatHistoryItem[]>([]);
  const [formData, setFormData] = useState({
    penghasilan: { field1: "", field2: "", field3: "" },
    maal: { field1: "", field2: "", field3: "" },
    perdagangan: { field1: "", field2: "", field3: "" },
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem("zakat_history");
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    setIsDataLoaded(true);
  }, []);

  const handleFieldChange = (
    field: "field1" | "field2" | "field3",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [field]: value },
    }));
  };

  const parseNumber = (val: string) => Number(val.replace(/\./g, "")) || 0;
  const formatRp = (num: number) =>
    new Intl.NumberFormat("id-ID").format(Math.round(num));

  const currentData = formData[activeTab];
  const totalHarta =
    parseNumber(currentData.field1) +
    parseNumber(currentData.field2) -
    parseNumber(currentData.field3);
  const nisabTahunan = 85 * goldPrice;
  const nisab = activeTab === "penghasilan" ? nisabTahunan / 12 : nisabTahunan;
  const progressPercent =
    nisab > 0 ? Math.min(Math.round((totalHarta / nisab) * 100), 100) : 0;
  const isWajibZakat = totalHarta >= nisab;
  const jumlahZakat = isWajibZakat ? totalHarta * 0.025 : 0;

  const totalRiwayat = history.reduce((sum, item) => sum + item.amount, 0);

  const labels = {
    penghasilan: {
      field1: "PEMASUKAN BULANAN",
      field2: "BONUS / THR",
      field3: "HUTANG / CICILAN",
    },
    maal: {
      field1: "NILAI TABUNGAN / DEPOSITO",
      field2: "ASET LAIN (EMAS/SAHAM)",
      field3: "HUTANG JATUH TEMPO",
    },
    perdagangan: {
      field1: "MODAL DIPUTAR",
      field2: "KEUNTUNGAN DITAHAN",
      field3: "KERUGIAN / HUTANG",
    },
  };

  const handleSaveCatatan = () => {
    if (!isWajibZakat || jumlahZakat <= 0) return;

    const now = new Date();
    const dateStr = new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(now);
    const typeLabel = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

    const newItem: ZakatHistoryItem = {
      id: Date.now().toString(),
      type: typeLabel,
      amount: jumlahZakat,
      date: dateStr,
    };

    const newHistory = [newItem, ...history];
    setHistory(newHistory);
    localStorage.setItem("zakat_history", JSON.stringify(newHistory));

    setIsSuccessOpen(true);

    setTimeout(() => {
      setIsSuccessOpen(false);
      setViewMode("riwayat");
    }, 2000);
  };

  if (!isDataLoaded) return null;

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <header className="px-5 pt-6 pb-4 flex items-center justify-between bg-white sticky top-0 z-10">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Kalkulator Zakat</h1>
          <p className="text-xs text-gray-500">Hitung & Catat Zakatmu</p>
        </div>

        <div className="flex p-1 bg-gray-50 border border-gray-100 rounded-xl">
          <button
            onClick={() => setViewMode("hitung")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all ${
              viewMode === "hitung"
                ? "bg-white text-gray-800 shadow-sm border border-gray-100"
                : "text-gray-400 hover:text-gray-600"
            }`}>
            <CalculatorIcon className="w-3.5 h-3.5" /> Hitung
          </button>
          <button
            onClick={() => setViewMode("riwayat")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all ${
              viewMode === "riwayat"
                ? "bg-[#4c0519] text-white shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}>
            <HistoryIcon className="w-3.5 h-3.5" /> Riwayat
          </button>
        </div>
      </header>

      {viewMode === "hitung" && (
        <div className="animate-in fade-in duration-300">
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

          <div className="px-5 mb-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <CoinsIcon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-gray-600">
                  Harga Emas Hari Ini
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-gray-900">
                  Rp {formatRp(goldPrice)}/gr
                </span>
                <InfoIcon className="w-3 h-3 text-gray-300" />
              </div>
            </div>
          </div>

          <div className="px-5 space-y-4 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
              <InputGroup
                label={labels[activeTab].field1}
                value={currentData.field1}
                onChange={(v) => handleFieldChange("field1", v)}
              />
              <InputGroup
                label={labels[activeTab].field2}
                value={currentData.field2}
                onChange={(v) => handleFieldChange("field2", v)}
              />
              <InputGroup
                label={labels[activeTab].field3}
                value={currentData.field3}
                onChange={(v) => handleFieldChange("field3", v)}
              />
            </div>
          </div>

          <div className="px-5">
            <div
              className={`rounded-3xl p-6 text-white relative overflow-hidden transition-colors duration-500 shadow-lg ${
                isWajibZakat ? "bg-[#4c0519]" : "bg-[#a3a3a3]"
              }`}>
              {isWajibZakat && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              )}

              <div className="flex justify-between items-start mb-4 relative z-10">
                <h3 className="text-xs font-bold opacity-80 uppercase tracking-wider">
                  TOTAL ZAKAT ({activeTab})
                </h3>
                <span
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
                    isWajibZakat
                      ? "bg-[#fde047] text-[#4c0519]"
                      : "bg-white/20 text-white"
                  }`}>
                  {isWajibZakat ? (
                    <CheckCircle2Icon className="w-3 h-3" />
                  ) : (
                    <InfoIcon className="w-3 h-3" />
                  )}
                  {isWajibZakat ? "Wajib Zakat" : "Belum Wajib"}
                </span>
              </div>

              <h2 className="text-4xl font-bold mb-6 relative z-10">
                Rp {formatRp(jumlahZakat)}
              </h2>

              <div className="bg-black/10 rounded-xl p-4 mb-4 relative z-10">
                <div className="flex justify-between text-[10px] font-bold mb-2">
                  <span>
                    Progress Nisab (
                    {activeTab === "penghasilan" ? "Bulanan" : "Tahunan"})
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full mb-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isWajibZakat ? "bg-[#fde047]" : "bg-white"
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] opacity-80">
                  <span className="font-medium">
                    Rp {formatRp(Math.max(totalHarta, 0))}
                  </span>
                  <span className="font-bold">Nisab: Rp {formatRp(nisab)}</span>
                </div>
              </div>

              <button
                onClick={handleSaveCatatan}
                disabled={!isWajibZakat}
                className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 relative z-10 ${
                  isWajibZakat
                    ? "bg-[#fde047] text-[#4c0519] hover:bg-[#c9e682]"
                    : "bg-white/20 opacity-50 cursor-not-allowed"
                }`}>
                <SaveIcon className="w-4 h-4" /> Simpan Catatan
              </button>
            </div>

            <p className="text-[10px] text-gray-400 text-center mt-4 leading-relaxed px-4">
              Perhitungan ini menggunakan harga emas Pluang secara real-time.
              Nisab mengikuti standar emas 85 gram untuk Mal/Perniagaan atau
              setara untuk Profesi.
            </p>
          </div>
        </div>
      )}

      {viewMode === "riwayat" && (
        <div className="animate-in slide-in-from-right-8 duration-300">
          <div className="px-5 mt-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  TOTAL ZAKAT & SEDEKAH
                </p>
                <h2 className="text-2xl font-bold text-[#4c0519]">
                  Rp {formatRp(totalRiwayat)}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                <TrendingUpIcon className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="px-5 mt-4 space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm text-gray-400 font-medium">
                  Belum ada catatan riwayat zakat.
                </p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                      <ArrowUpRightIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">
                        {item.type}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {item.date}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#4c0519]">
                    Rp {formatRp(item.amount)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <SuccessModal
        isOpen={isSuccessOpen}
        message="Catatan zakat berhasil ditambahkan ke riwayat."
      />
    </div>
  );
}
