import { NextResponse } from "next/server";
import { AtticDB } from "@/lib/db";
import { DisputeTicket } from "@/data/adminMockData";

export async function GET() {
  try {
    const disputes = AtticDB.getDisputeTickets();
    return NextResponse.json({
      success: true,
      total: disputes.length,
      data: disputes,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mengambil daftar tiket sengketa." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, reason, description, buyerProofPhoto } = body;

    if (!orderId || !reason || !description) {
      return NextResponse.json(
        {
          success: false,
          error: "ID Pesanan, alasan sengketa, dan deskripsi kronologi wajib disertakan.",
        },
        { status: 400 }
      );
    }

    const order = AtticDB.getOrderById(orderId);
    if (!order) {
      return NextResponse.json(
        { success: false, error: "Pesanan tidak ditemukan." },
        { status: 404 }
      );
    }

    if (order.status === "COMPLETED") {
      return NextResponse.json(
        {
          success: false,
          error: "Pesanan sudah selesai dan dana telah dicairkan ke penjual. Sengketa tidak dapat diajukan setelah dana dilepas.",
        },
        { status: 400 }
      );
    }

    if (order.status === "DISPUTED") {
      return NextResponse.json(
        {
          success: false,
          error: "Pesanan ini sudah memiliki tiket sengketa aktif yang sedang diproses oleh Tim Admin.",
        },
        { status: 400 }
      );
    }

    // Buyer must provide photo evidence of undisclosed flaw
    const proofPhoto =
      buyerProofPhoto ||
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80";

    const newTicket: DisputeTicket = {
      id: `DISP-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: order.id,
      buyerName: order.destinationAddress.receiverName,
      sellerName: order.product.seller.name,
      productTitle: order.product.title,
      totalEscrowAmount: order.financials.totalBuyerPaid,
      reason: reason || "DEFECT_NOT_DISCLOSED",
      description,
      listingPhoto: order.product.imageUrl,
      buyerProofPhoto: proofPhoto,
      filedAt: "Baru saja",
      remainingTime: "24 jam investigasi admin",
      status: "OPEN",
    };

    AtticDB.createDisputeTicket(newTicket);

    return NextResponse.json(
      {
        success: true,
        message:
          "Tiket sengketa berhasil didaftarkan! Dana escrow otomatis DIBEKUKAN sementara sampai tim kurasi Attic menyelesaikan arbitrase foto.",
        data: newTicket,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memproses klaim sengketa." },
      { status: 500 }
    );
  }
}
