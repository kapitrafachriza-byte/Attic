import { NextResponse } from "next/server";
import { AtticDB } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !["APPROVED", "REJECTED", "NEEDS_REVISION"].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: "Status moderasi tidak valid. Harus salah satu dari: APPROVED, REJECTED, NEEDS_REVISION.",
        },
        { status: 400 }
      );
    }

    const updated = AtticDB.moderateListing(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Iklan moderasi tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        status === "APPROVED"
          ? "Iklan disetujui dan resmi diterbitkan ke katalog publik Attic!"
          : status === "NEEDS_REVISION"
          ? "Permintaan revisi foto cacat transparan telah dikirim ke penjual."
          : "Iklan telah ditolak karena tidak memenuhi standar kurasi Attic.",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memoderasi iklan." },
      { status: 500 }
    );
  }
}
