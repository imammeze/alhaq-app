"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOutIcon, Loader2Icon } from "lucide-react";

export default function LogoutButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-red-100 transition-colors">
        <LogOutIcon className="w-3 h-3" />
        Logout
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-200 px-5">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-rose-50 text-[#881337] rounded-full flex items-center justify-center mb-4">
              <LogOutIcon className="w-6 h-6 ml-1" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Keluar Akun?
            </h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Sesi Anda akan diakhiri. Anda harus masuk kembali untuk mengakses
              aktivitas ibadah Anda.
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="flex-1 py-3 bg-gray-50 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-100 transition-colors">
                Batal
              </button>

              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="flex-1 py-3 bg-[#881337] text-white text-xs font-bold rounded-xl hover:bg-[#4c0519] transition-colors flex items-center justify-center disabled:opacity-70">
                {isLoading ? (
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                ) : (
                  "Ya, Keluar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
