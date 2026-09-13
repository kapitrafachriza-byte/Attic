import { NextResponse } from "next/server";
import { AtticDB } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, phone, code } = body;

    if (!phone || phone.replace(/\D/g, "").length < 8) {
      return NextResponse.json(
        { success: false, error: "Nomor WhatsApp tidak valid (minimal 8 digit)." },
        { status: 400 }
      );
    }

    if (action === "SEND") {
      // Generate 4-digit OTP code
      const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
      AtticDB.saveOtp(phone, generatedCode);

      return NextResponse.json({
        success: true,
        message: `Kode OTP telah dikirimkan via WhatsApp ke nomor ${phone}.`,
        // Only expose OTP code in development for testing convenience
        ...(process.env.NODE_ENV !== "production" && { demoOtp: generatedCode }),
      });
    }

    if (action === "VERIFY") {
      if (!code || code.length !== 4) {
        return NextResponse.json(
          { success: false, error: "Kode OTP harus berupa 4 digit angka." },
          { status: 400 }
        );
      }

      const isValid = AtticDB.verifyOtp(phone, code);
      if (!isValid) {
        return NextResponse.json(
          { success: false, error: "Kode OTP salah atau tidak cocok. Harap periksa kembali." },
          { status: 400 }
        );
      }

      // Check if user already exists or create new standard buyer
      let user = AtticDB.findUserByIdentifier(phone);
      if (!user) {
        user = AtticDB.createUser({
          name: `User WA ${phone.slice(-4)}`,
          email: `${phone.replace(/\D/g, "")}@wa.attic.id`,
          phoneNumber: phone,
          role: "BUYER",
        });
      }

      return NextResponse.json({
        success: true,
        message: "Verifikasi WhatsApp berhasil!",
        user: {
          id: user.id,
          name: user.name,
          emailOrPhone: user.phoneNumber || user.email,
          phone: user.phoneNumber,
          avatarUrl: user.avatarUrl,
          isSellerVerified: user.role === "SELLER",
          walletBalance: user.sellerWalletBalance,
        },
      });
    }

    return NextResponse.json(
      { success: false, error: "Aksi OTP tidak valid." },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memproses OTP." },
      { status: 500 }
    );
  }
}
