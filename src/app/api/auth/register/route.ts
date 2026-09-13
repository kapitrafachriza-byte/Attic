import { NextResponse } from "next/server";
import { AtticDB } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, identifier, password } = body;

    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Nama lengkap minimal 3 karakter." },
        { status: 400 }
      );
    }

    if (!identifier || identifier.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Email atau Nomor WhatsApp tidak valid." },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Kata sandi minimal harus 8 karakter." },
        { status: 400 }
      );
    }

    // Check if identifier is already registered
    const existing = AtticDB.findUserByIdentifier(identifier);
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Email atau Nomor WhatsApp ini sudah terdaftar di Attic. Silakan langsung masuk.",
        },
        { status: 409 }
      );
    }

    const isEmail = identifier.includes("@");
    const newUser = AtticDB.createUser({
      name: name.trim(),
      email: isEmail ? identifier.trim() : `${identifier.replace(/\D/g, "")}@user.attic.id`,
      phoneNumber: !isEmail ? identifier.trim() : undefined,
      password,
      role: "BUYER",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Akun Attic berhasil didaftarkan! Selamat berbelanja furnitur impian.",
        user: {
          id: newUser.id,
          name: newUser.name,
          emailOrPhone: identifier,
          phone: newUser.phoneNumber,
          avatarUrl: newUser.avatarUrl,
          isSellerVerified: false,
          walletBalance: 0,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mendaftarkan akun." },
      { status: 500 }
    );
  }
}
