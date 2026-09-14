"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  Mail, 
  Lock, 
  ArrowLeft, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Check, 
  Star, 
  Truck, 
  Sparkles,
  ArrowRight,
  User as UserIcon,
  MessageCircle
} from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const { loginWithGoogle, loginWithWhatsAppOtp, loginWithEmail, registerWithEmail } = useAuth();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showWhatsAppOtpModal, setShowWhatsAppOtpModal] = useState(false);
  const [waPhone, setWaPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);
  const [otpDemoHint, setOtpDemoHint] = useState("");
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState("");
  const [googleName, setGoogleName] = useState("");

  // Google Login — open modal
  const handleGoogleAuth = () => {
    setErrorMessage("");
    setShowGoogleModal(true);
  };

  // Google Login — submit from modal
  const handleGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail || !googleEmail.includes("@")) {
      setErrorMessage("Masukkan email Google yang valid.");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      await loginWithGoogle(googleEmail, googleName || "Pengguna Google");
      setShowGoogleModal(false);
      router.push(redirectUrl);
    } catch (err: any) {
      setErrorMessage(err.message || "Gagal masuk dengan Google.");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Main Form (Email/Phone)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!identifier || identifier.trim().length < 3) {
      setErrorMessage("Harap masukkan email atau nomor WhatsApp yang valid.");
      return;
    }

    if (!password || password.length < 8) {
      setErrorMessage("Kata sandi minimal harus 8 karakter.");
      return;
    }

    setIsLoading(true);
    try {
      if (isRegisterMode) {
        await registerWithEmail(name || "Pengguna Attic", identifier, password);
      } else {
        await loginWithEmail(identifier, password);
      }
      router.push(redirectUrl);
    } catch (err: any) {
      setErrorMessage(err.message || "Gagal memproses autentikasi.");
    } finally {
      setIsLoading(false);
    }
  };

  // WhatsApp OTP Send
  const handleSendWaOtp = async () => {
    const targetPhone = waPhone || identifier;
    if (!targetPhone || targetPhone.replace(/\D/g, "").length < 8) {
      alert("Masukkan nomor WhatsApp yang valid (minimal 8 digit).");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "SEND", phone: targetPhone }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        if (data.demoOtp) {
          setOtpDemoHint(data.demoOtp);
        }
      } else {
        alert(data.error || "Gagal mengirim OTP.");
      }
    } catch {
      alert("Terjadi gangguan jaringan saat mengirim OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // WhatsApp OTP Submit
  const handleVerifyWaOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const fullCode = otpCode.join("");
      await loginWithWhatsAppOtp(waPhone || identifier, fullCode);
      setShowWhatsAppOtpModal(false);
      router.push(redirectUrl);
    } catch (err: any) {
      alert(err.message || "Kode OTP salah atau tidak cocok.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans bg-white">
      {/* ================= LEFT COLUMN (BRAND HERO) ================= */}
      <div className="relative w-full lg:w-1/2 min-h-[460px] lg:min-h-screen bg-[#071324] text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden">
        {/* Subtle Background Radial & Accent Silhouette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#102A4C,transparent_60%)] pointer-events-none opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#091C34,#050D19)] pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80')"
          }}
        />

        {/* Top Header: Logo Arch & Protected Escrow Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* White Rounded Square Arch Icon */}
            <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-black/20 shrink-0">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0B192C]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 21V9a7 7 0 0 1 14 0v12" />
                <path d="M8 15h8" />
                <path d="M7 18h10" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-extrabold text-white tracking-tight block leading-tight">
                Attic
              </span>
              <span className="text-[9px] font-bold text-slate-300 tracking-[0.22em] uppercase block">
                ARCHIVAL FURNITURE
              </span>
            </div>
          </div>

          {/* Rekber 100% Terlindungi Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-xs">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">
              ✓
            </div>
            <span>Rekber 100% Terlindungi</span>
          </div>
        </div>

        {/* Middle Hero Typography & Value Proposition */}
        <div className="relative z-10 my-10 lg:my-auto max-w-lg space-y-6">
          {/* Sirkular & Berkelanjutan Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E2849]/90 border border-blue-400/30 text-blue-200 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Sirkular & Berkelanjutan</span>
          </div>

          {/* Big Bold Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.12] tracking-tight">
            Beri Ruang Baru untuk <br className="hidden sm:inline" />
            Cerita Baru <span className="text-blue-400">.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Jual beli furnitur kurasi vintage, mid-century, dan modern dengan transparansi kondisi fisik, keamanan pembayaran, dan penjemputan ke lokasi.
          </p>

          {/* Testimonial Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/15 max-w-md shadow-xl">
            <div className="flex items-start gap-3.5">
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white/30">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                  alt="Sarah Anggraeni"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border border-slate-900 flex items-center justify-center text-white text-[8px] font-bold">
                  ✓
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                  ))}
                  <span className="text-xs font-bold text-white ml-1">5.0</span>
                </div>
                <p className="text-xs text-white/95 font-medium italic mt-1.5 leading-relaxed">
                  “Hemat Rp 3.2jt untuk sofa impian saya. Kondisinya mulus persis foto, dan logistik Attic antar tepat waktu!”
                </p>
                <p className="text-[11px] text-slate-300 mt-1.5">
                  <span className="font-semibold text-white">Sarah Anggraeni</span> • Interior Enthusiast, Jakarta Selatan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Badges */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400 pt-6 border-t border-white/10">
          <span>© 2024 Attic Furniture Indonesia</span>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Terverifikasi
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-blue-400" /> Logistik Khusus
            </span>
          </div>
        </div>
      </div>

      {/* ================= RIGHT COLUMN (AUTHENTICATION FORM) ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-white min-h-screen">
        {/* Top: Back to Home Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Center: Auth Form Container */}
        <div className="w-full max-w-md mx-auto my-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] tracking-tight">
              {isRegisterMode ? "Daftar Akun Baru di Attic" : "Selamat Datang Kembali di Attic"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {isRegisterMode
                ? "Daftar untuk mulai eksplorasi, menawar furnitur impian, dan proteksi rekber 24 jam."
                : "Masuk untuk melanjutkan tawar-menawar, kelola listing, dan pantau barang impian."}
            </p>
          </div>

          {/* Social Auth Buttons (Google & WhatsApp OTP) */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-full text-xs font-bold text-slate-700 shadow-2xs transition-all active:scale-98"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            {/* WhatsApp OTP Button */}
            <button
              type="button"
              onClick={() => {
                setShowWhatsAppOtpModal(true);
                setOtpSent(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-full text-xs font-bold text-slate-700 shadow-2xs transition-all active:scale-98"
            >
              <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                <MessageCircle className="w-3 h-3 fill-white stroke-none" />
              </div>
              <span>WhatsApp OTP</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
              ATAU MASUK DENGAN EMAIL / NO. HANDPHONE
            </span>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs font-semibold animate-in fade-in">
              <span className="text-base shrink-0 leading-none">⚠️</span>
              <div className="flex-1 leading-snug">{errorMessage}</div>
            </div>
          )}

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isRegisterMode && (
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Nama Lengkap</label>
                <div className="relative flex items-center">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Lengkap Anda"
                    className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-slate-200 focus:bg-white focus:border-[#0B192C] rounded-xl text-slate-800 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            {/* Identifier (Email / No. WA) */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Email atau No. WhatsApp</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="nama@email.com atau 0812xxxxxxx"
                  className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-slate-200 focus:bg-white focus:border-[#0B192C] rounded-xl text-slate-800 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700">Kata Sandi</label>
                {!isRegisterMode && (
                  <a href="#" className="text-[11px] font-semibold text-[#0060A8] hover:underline">
                    Lupa kata sandi?
                  </a>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan minimal 8 karakter"
                  className="w-full pl-10 pr-10 py-3 bg-[#F8FAFC] border border-slate-200 focus:bg-white focus:border-[#0B192C] rounded-xl text-slate-800 focus:outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            {!isRegisterMode && (
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#0B192C] focus:ring-[#0B192C]"
                />
                <label htmlFor="remember-me" className="text-slate-600 font-medium select-none cursor-pointer">
                  Ingat saya di perangkat ini
                </label>
              </div>
            )}

            {/* Big Dark Pill Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#0B192C] hover:bg-[#1A2E4B] disabled:bg-slate-400 text-white font-bold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2 active:scale-99"
            >
              <span>{isLoading ? "Memproses..." : isRegisterMode ? "Daftar Akun Attic" : "Masuk ke Akun Attic"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Register / Login */}
          <div className="text-center pt-2">
            {isRegisterMode ? (
              <p className="text-xs text-slate-500">
                Sudah punya akun Attic?{" "}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  className="font-bold text-[#0B192C] hover:underline"
                >
                  Masuk sekarang
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                Belum punya akun Attic?{" "}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  className="font-bold text-[#0060A8] hover:underline"
                >
                  Daftar sekarang — Gratis
                </button>
              </p>
            )}
          </div>

          {/* Security Badges */}
          <div className="flex items-center justify-center gap-6 pt-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> Enkripsi 256-Bit
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-500" /> Privasi Terlindungi
            </span>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="text-center text-[11px] text-slate-400 pt-6">
          Dengan masuk, Anda menyetujui{" "}
          <a href="#" className="underline hover:text-slate-600">
            Ketentuan Layanan
          </a>{" "}
          &{" "}
          <a href="#" className="underline hover:text-slate-600">
            Kebijakan Privasi
          </a>
          .
        </div>
      </div>

      {/* ================= WHATSAPP OTP MODAL ================= */}
      {showWhatsAppOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0B192C]">Masuk via WhatsApp OTP</h3>
              <button
                type="button"
                onClick={() => setShowWhatsAppOtpModal(false)}
                className="text-slate-400 hover:text-black font-bold text-base"
              >
                ✕
              </button>
            </div>

            {!otpSent ? (
              <div className="space-y-3 text-xs">
                <p className="text-slate-500">
                  Kode verifikasi 4-digit akan dikirimkan langsung ke nomor WhatsApp Anda.
                </p>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    value={waPhone}
                    onChange={(e) => setWaPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Contoh: 081234567890"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendWaOtp}
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#0B192C] text-white font-bold rounded-full hover:bg-slate-800 disabled:bg-slate-400 transition-colors"
                >
                  {isLoading ? "Mengirim Kode..." : "Kirim Kode OTP"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleVerifyWaOtp} className="space-y-4 text-xs text-center">
                <p className="text-slate-600">
                  Masukkan 4-digit kode yang dikirim ke <strong>{waPhone || identifier}</strong>:
                </p>
                <div className="flex justify-center gap-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={otpCode[idx]}
                      onChange={(e) => {
                        const val = e.target.value;
                        const newOtp = [...otpCode];
                        newOtp[idx] = val;
                        setOtpCode(newOtp);
                        if (val && idx < 3) {
                          document.getElementById(`otp-${idx + 1}`)?.focus();
                        }
                      }}
                      className="w-11 h-12 text-center text-lg font-bold bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-colors"
                >
                  Verifikasi & Masuk
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= GOOGLE SIGN-IN MODAL ================= */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0B192C]">Masuk dengan Google</h3>
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="text-slate-400 hover:text-black font-bold text-base"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGoogleSubmit} className="space-y-3 text-xs">
              <p className="text-slate-500">
                Masukkan email Google Anda untuk masuk atau mendaftar secara otomatis.
              </p>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  placeholder="Nama tampilan akun Google Anda"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Google <span className="text-rose-500">*</span></label>
                <input
                  type="email"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="nama@gmail.com"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              {errorMessage && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-[11px] text-rose-700 font-semibold">
                  ⚠️ {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#0B192C] text-white font-bold rounded-full hover:bg-slate-800 disabled:bg-slate-400 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{isLoading ? "Memproses..." : "Masuk dengan Google"}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Memuat Attic Login...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
