"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AtticLogo } from "@/components/common/AtticLogo";
import { 
  Phone, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  User,
  Store
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"whatsapp" | "email">("whatsapp");
  
  // WhatsApp OTP states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);
  
  // Email Password states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle WhatsApp OTP Send
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 9) {
      setErrorMessage("Nomor WhatsApp minimal 9 digit angka.");
      return;
    }
    setErrorMessage("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 800);
  };

  // Handle OTP Input Change
  const handleOtpChange = (val: string, index: number) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otpCode];
    newOtp[index] = val;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle Login Submit
  const handleVerifyAndLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Save dummy auth token/user state in localStorage
      localStorage.setItem("attic_user", JSON.stringify({
        id: "user-buyer-1",
        name: "Rian Hendrawan",
        phone: phoneNumber || "081234567890",
        role: "BUYER"
      }));
      router.push("/");
    }, 1000);
  };

  // Quick Demo Login Handler
  const handleQuickLogin = (role: "BUYER" | "SELLER" | "ADMIN") => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === "ADMIN") {
        localStorage.setItem("attic_user", JSON.stringify({
          id: "user-admin-1",
          name: "Admin Attic Jabodetabek",
          role: "ADMIN"
        }));
        router.push("/admin");
      } else if (role === "SELLER") {
        localStorage.setItem("attic_user", JSON.stringify({
          id: "user-seller-1",
          name: "Dian Sastro",
          role: "SELLER"
        }));
        router.push("/");
      } else {
        localStorage.setItem("attic_user", JSON.stringify({
          id: "user-buyer-1",
          name: "Rian Hendrawan",
          role: "BUYER"
        }));
        router.push("/");
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between font-sans">
      {/* Top Simple Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white">
        <Link href="/" className="flex items-center gap-2">
          <AtticLogo size="md" />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>
      </header>

      {/* Main Login Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
          
          {/* Header & Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-[#0060A8] mb-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#0B192C]">
              Masuk ke Akun Attic
            </h1>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Marketplace furnitur preloved kurasi terpercaya dengan proteksi rekening bersama 24 jam.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-2xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => {
                setLoginMethod("whatsapp");
                setOtpSent(false);
                setErrorMessage("");
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl transition-all ${
                loginMethod === "whatsapp"
                  ? "bg-white text-[#0B192C] shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp OTP</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMethod("email");
                setOtpSent(false);
                setErrorMessage("");
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl transition-all ${
                loginMethod === "email"
                  ? "bg-white text-[#0B192C] shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email & Sandi</span>
            </button>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium">
              {errorMessage}
            </div>
          )}

          {/* WhatsApp OTP Form */}
          {loginMethod === "whatsapp" && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nomor Handphone / WhatsApp
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-xs font-semibold text-slate-400">
                        +62
                      </span>
                      <input
                        type="tel"
                        placeholder="812 3456 7890"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0060A8] rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0060A8]/20 transition-all"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Kode verifikasi resmi (OTP) akan dikirimkan via chat WhatsApp.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-black hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-bold rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{isLoading ? "Mengirim OTP..." : "Kirim Kode OTP"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyAndLogin} className="space-y-4 animate-in fade-in duration-200">
                  <div className="text-center space-y-1">
                    <span className="text-xs font-semibold text-slate-600">
                      Masukkan 4-digit kode yang dikirim ke
                    </span>
                    <p className="text-xs font-bold text-slate-900">+62 {phoneNumber}</p>
                  </div>

                  {/* 4 Digit OTP Inputs */}
                  <div className="flex justify-center gap-3 my-2">
                    {[0, 1, 2, 3].map((idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otpCode[idx]}
                        onChange={(e) => handleOtpChange(e.target.value, idx)}
                        className="w-12 h-14 text-center text-lg font-extrabold bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0060A8] rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0060A8]/20 transition-all"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white text-xs font-bold rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{isLoading ? "Memverifikasi..." : "Verifikasi & Masuk"}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-xs text-slate-500 hover:text-black font-semibold"
                    >
                      ← Ganti nomor telepon
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Email & Password Form */}
          {loginMethod === "email" && (
            <form onSubmit={handleVerifyAndLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Alamat Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0060A8] rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0060A8]/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">Kata Sandi</label>
                  <a href="#" className="text-[11px] text-[#0060A8] font-semibold hover:underline">
                    Lupa sandi?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0060A8] rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0060A8]/20 transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-black hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-bold rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>{isLoading ? "Memproses..." : "Masuk dengan Email"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Akses Cepat Pengujian (Demo)
            </span>
          </div>

          {/* Quick Demo Login Switcher */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("BUYER")}
              className="p-2.5 rounded-2xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-center transition-all group"
            >
              <User className="w-4 h-4 text-blue-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <p className="text-[11px] font-bold text-slate-900">Pembeli</p>
              <p className="text-[9px] text-slate-500">Rian</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("SELLER")}
              className="p-2.5 rounded-2xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-center transition-all group"
            >
              <Store className="w-4 h-4 text-emerald-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <p className="text-[11px] font-bold text-slate-900">Penjual</p>
              <p className="text-[9px] text-slate-500">Dian</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("ADMIN")}
              className="p-2.5 rounded-2xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100/50 text-center transition-all group"
            >
              <Sparkles className="w-4 h-4 text-amber-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <p className="text-[11px] font-bold text-amber-900">Admin</p>
              <p className="text-[9px] text-amber-700">Desk</p>
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-xs text-slate-500">
            Belum punya akun Attic?{" "}
            <a href="#" className="font-bold text-[#0060A8] hover:underline">
              Daftar akun gratis
            </a>
          </p>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="text-center py-4 border-t border-slate-100 text-[11px] text-slate-400">
        © 2024 Attic Marketplace Indonesia. Seluruh hak cipta dilindungi.
      </footer>
    </div>
  );
}
