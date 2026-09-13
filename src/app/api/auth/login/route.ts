import { NextResponse } from "next/server";
import { AtticDB } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || identifier.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Email atau Nomor WhatsApp wajib diisi." },
        { status: 400 }
      );
    }

    if (!password || password.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Kata sandi wajib diisi." },
        { status: 400 }
      );
    }

    // 1. Check if user exists in database
    const user = AtticDB.findUserByIdentifier(identifier);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Akun dengan email atau nomor WhatsApp ini tidak ditemukan. Silakan klik 'Daftar sekarang — Gratis' di bawah untuk membuat akun baru.",
        },
        { status: 404 }
      );
    }

    // 2. Validate password
    if (user.password && user.password !== password) {
      return NextResponse.json(
        {
          success: false,
          error: "Kata sandi yang Anda masukkan salah. Silakan periksa kembali.",
        },
        { status: 401 }
      );
    }

    // 3. Authentication successful
    return NextResponse.json({
      success: true,
      message: `Selamat datang kembali, ${user.name}!`,
      user: {
        id: user.id,
        name: user.name,
        emailOrPhone: user.email || user.phoneNumber,
        phone: user.phoneNumber,
        avatarUrl: user.avatarUrl,
        isSellerVerified: user.role === "SELLER",
        walletBalance: user.sellerWalletBalance,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memproses masuk." },
      { status: 500 }
    );
  }
}
