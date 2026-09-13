import { NextResponse } from "next/server";
import { AtticDB } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const listing = AtticDB.getListingById(id);

    if (!listing) {
      return NextResponse.json(
        { success: false, error: "Perabot tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: listing,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mengambil data perabot." },
      { status: 500 }
    );
  }
}
