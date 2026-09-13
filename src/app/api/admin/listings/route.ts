import { NextResponse } from "next/server";
import { AtticDB } from "@/lib/db";

export async function GET() {
  try {
    const pending = AtticDB.getPendingModerationListings();
    return NextResponse.json({
      success: true,
      total: pending.length,
      data: pending,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mengambil daftar moderasi." },
      { status: 500 }
    );
  }
}
