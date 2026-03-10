"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserIcon, MailIcon, LockIcon, Loader2Icon } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      // Menggunakan native fetch (Best Practice Next.js)
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal melakukan registrasi.");
      }

      // Jika sukses, lempar ke halaman login
      router.push("/login?registered=true");
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-[#881337]">
          Buat Akun Baru
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Bergabunglah untuk mencatat ibadah harian Anda
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl sm:px-10 border border-gray-100">
          <form className="space-y-5" onSubmit={handleRegister}>
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-500 text-xs font-bold rounded-xl text-center">
                {errorMsg}
              </div>
            )}

            <div className="relative">
              <UserIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                name="name"
                type="text"
                required
                placeholder="Nama Lengkap"
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#881337] focus:ring-2 focus:ring-[#881337]/20 outline-none transition-all"
              />
            </div>

            <div className="relative">
              <MailIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                placeholder="Alamat Email"
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#881337] focus:ring-2 focus:ring-[#881337]/20 outline-none transition-all"
              />
            </div>

            <div className="relative">
              <LockIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                placeholder="Kata Sandi"
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#881337] focus:ring-2 focus:ring-[#881337]/20 outline-none transition-all"
              />
            </div>

            <div className="relative">
              <LockIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                name="password_confirmation"
                type="password"
                required
                placeholder="Konfirmasi Kata Sandi"
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#881337] focus:ring-2 focus:ring-[#881337]/20 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-bold text-white bg-[#881337] hover:bg-[#4c0519] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#881337] transition-all disabled:opacity-70">
              {isLoading ? (
                <Loader2Icon className="w-5 h-5 animate-spin" />
              ) : (
                "Daftar Sekarang"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 font-medium">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="font-bold text-[#881337] hover:text-[#4c0519]">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
