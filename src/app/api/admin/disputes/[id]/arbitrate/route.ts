import { NextResponse } from "next/server";
import { AtticDB } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, partialAmount = 0, adminNotes = "" } = body;

    if (
      !action ||
      !["FULL_REFUND_BUYER", "RELEASE_TO_SELLER", "PARTIAL_COMPENSATION"].includes(action)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Aksi arbitrase tidak valid. Harus salah satu dari: FULL_REFUND_BUYER, RELEASE_TO_SELLER, PARTIAL_COMPENSATION.",
        },
        { status: 400 }
      );
    }

    const result = AtticDB.arbitrateDispute(id, action, Number(partialAmount), adminNotes);

    return NextResponse.json({
      success: true,
      message:
        action === "FULL_REFUND_BUYER"
          ? "Keputusan arbitrase: 100% dana barang & proteksi dikembalikan ke pembeli."
          : action === "PARTIAL_COMPENSATION"
          ? `Keputusan arbitrase: Kompensasi parsial Rp ${Number(partialAmount).toLocaleString(
              "id-ID"
            )} disetujui, sisa dana diteruskan ke penjual.`
          : "Keputusan arbitrase: Klaim ditolak karena minus sudah transparan di iklan. Dana diteruskan ke penjual.",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal melakukan arbitrase sengketa." },
      { status: 500 }
    );
  }
}
