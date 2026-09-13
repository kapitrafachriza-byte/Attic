import { NextResponse } from "next/server";
import { AtticDB } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = AtticDB.releaseOrderEscrow(id);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      data: {
        order: result.order,
        sellerWalletBalance: AtticDB.getUserById(result.order!.sellerId)?.sellerWalletBalance,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mencairkan dana escrow." },
      { status: 500 }
    );
  }
}
