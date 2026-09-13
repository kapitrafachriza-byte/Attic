import { NextResponse } from "next/server";
import { AtticDB } from "@/lib/db";
import { EscrowService } from "@/services/escrowService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = AtticDB.getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Pesanan tidak ditemukan." },
        { status: 404 }
      );
    }

    const shipment = AtticDB.getActiveShipments().find((s) => s.orderId === id);

    let inspectionStatus = null;
    if (order.inspectionDeadline) {
      inspectionStatus = EscrowService.getRemainingInspectionTime(
        new Date(order.inspectionDeadline)
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        order,
        shipment,
        inspectionStatus,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mengambil data pesanan." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const order = AtticDB.getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Pesanan tidak ditemukan." },
        { status: 404 }
      );
    }

    // Handle delivery simulation (Transitions to DELIVERED_INSPECTION & starts 24h countdown)
    if (body.action === "MARK_DELIVERED") {
      const now = new Date();
      order.deliveredAt = now.toISOString();
      order.status = "DELIVERED_INSPECTION";
      order.inspectionDeadline = EscrowService.generateInspectionDeadline(now).toISOString();

      const shipment = AtticDB.getActiveShipments().find((s) => s.orderId === id);
      if (shipment) {
        shipment.status = "ARRIVED";
      }

      return NextResponse.json({
        success: true,
        message: "Barang telah tiba di tujuan! Jendela inspeksi 24 jam resmi aktif.",
        data: {
          order,
          inspectionDeadline: order.inspectionDeadline,
        },
      });
    }

    return NextResponse.json(
      { success: false, error: "Aksi pesanan tidak didukung." },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memperbarui status pesanan." },
      { status: 500 }
    );
  }
}
