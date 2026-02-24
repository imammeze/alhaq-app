"use client";

import {
  UserIcon,
  BellIcon,
  SunIcon,
  Volume2Icon,
  SettingsIcon,
  SmartphoneIcon,
  SaveIcon,
  HelpCircleIcon,
  ShieldIcon,
  HeartIcon,
  LogOutIcon,
  ChevronRightIcon,
  MapPinIcon,
  CameraIcon,
  CoffeeIcon,
  Trash2Icon,
} from "lucide-react";

export default function Page() {
  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Akun Saya</h1>
            <p className="text-xs text-gray-400 mt-1">
              Kelola profil dan preferensi
            </p>
          </div>

          <button className="px-4 py-2 bg-[#0e2e25] text-white text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-[#064e3b] transition-colors">
            <LogOutIcon className="w-3 h-3" />
            Login
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
              <UserIcon className="w-8 h-8" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0e2e25] rounded-lg flex items-center justify-center text-white border-2 border-white">
              <CameraIcon className="w-3 h-3" />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              ASSALAMU'ALAIKUM,
            </p>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              Hamba Allah
            </h2>
            <div className="flex items-center gap-1 mt-1 text-gray-400">
              <MapPinIcon className="w-3 h-3" />
              <span className="text-xs">Purwokerto, ID</span>
            </div>
          </div>
        </div>
      </header>

      {/* Pengaturan Umum */}
      <Section title="PENGATURAN UMUM">
        <SettingItem icon={BellIcon} label="Notifikasi Adzan" value="Aktif" />
        <SettingItem icon={SunIcon} label="Tema Tampilan" value="Terang" />
        <SettingItem icon={Volume2Icon} label="Suara Adzan" value="Mekkah" />
        <SettingItem
          icon={SettingsIcon}
          label="Metode Perhitungan"
          value="Kemenag RI (Indonesia)"
        />

        <SettingItem icon={SmartphoneIcon} label="Kalibrasi Kompas" />

        <SettingItem icon={SaveIcon} label="Backup & Restore" border={false} />
      </Section>

      {/* Info & Bantuan */}
      <Section title="INFO & BANTUAN">
        <SettingItem icon={HelpCircleIcon} label="Bantuan & FAQ" />
        <SettingItem icon={ShieldIcon} label="Kebijakan Privasi" />
        <SettingItem
          icon={HeartIcon}
          label="Tentang Aplikasi"
          value="Al Haq v1.3.0"
          border={false}
        />
      </Section>

      {/* Donation */}
      <div className="px-5 mt-6">
        <div className="bg-yellow-50 rounded-2xl p-4 flex items-center justify-between border border-yellow-100 cursor-pointer hover:bg-yellow-100 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white shadow-lg shadow-orange-400/30">
              <CoffeeIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800">
                Traktir Kopi & Infaq
              </h4>
              <p className="text-[10px] text-gray-500">
                Support operasional & amal jariyah
              </p>
            </div>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-orange-400" />
        </div>
      </div>

      {/* Delete */}
      <div className="px-5 mt-6 mb-8">
        <button className="w-full py-3 bg-red-50 rounded-2xl text-red-500 text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
          <Trash2Icon className="w-4 h-4" />
          Hapus Data & Reset
        </button>

        <p className="text-[10px] text-gray-400 text-center mt-6">
          <span className="font-bold text-[#064e3b]">Al Haq</span> — Made with
          ❤️
        </p>
      </div>
    </div>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <div className="px-5 mt-6">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
        {title}
      </h3>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

type SettingItemProps = {
  icon: React.ElementType;
  label: string;
  value?: string;
  border?: boolean;
};

function SettingItem({
  icon: Icon,
  label,
  value,
  border = true,
}: SettingItemProps) {
  return (
    <div
      className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer ${
        border ? "border-b border-gray-50" : ""
      }`}>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600">
          <Icon className="w-5 h-5" />
        </div>

        <div>
          <h4 className="text-sm font-bold text-gray-800">{label}</h4>
          {value && <p className="text-[10px] text-gray-400 mt-0.5">{value}</p>}
        </div>
      </div>

      <ChevronRightIcon className="w-5 h-5 text-gray-300" />
    </div>
  );
}
