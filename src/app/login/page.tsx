"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  MailIcon,
  LockIcon,
  Loader2Icon,
  CheckCircle2Icon,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    setIsLoading(false);

    if (res?.error) {
      setErrorMsg("Email atau password yang Anda masukkan salah.");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-[#881337]">
          Selamat Datang
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Masuk untuk melanjutkan aktivitas ibadah Anda
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl sm:px-10 border border-gray-100">
          {isRegistered && (
            <div className="mb-5 p-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-2">
              <CheckCircle2Icon className="w-4 h-4" />
              Alhamdulillah, registrasi berhasil. Silakan login.
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-500 text-xs font-bold rounded-xl text-center">
                {errorMsg}
              </div>
            )}

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

            <div className="flex items-center justify-end">
              <a
                href="#"
                className="text-xs font-bold text-[#881337] hover:text-[#4c0519]">
                Lupa kata sandi?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-bold text-white bg-[#881337] hover:bg-[#4c0519] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#881337] transition-all disabled:opacity-70">
              {isLoading ? (
                <Loader2Icon className="w-5 h-5 animate-spin" />
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 font-medium">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="font-bold text-[#881337] hover:text-[#4c0519]">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
