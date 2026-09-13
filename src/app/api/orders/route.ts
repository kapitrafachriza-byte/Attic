import { NextResponse } from "next/server";
import { AtticDB, DBOrder } from "@/lib/db";
import { CargoEngine } from "@/services/cargoEngine";
import { EscrowService } from "@/services/escrowService";
import { ActiveShipment } from "@/data/adminMockData";

export async function GET() {
  try {
    const orders = AtticDB.getOrders();
    return NextResponse.json({
      success: true,
      total: orders.length,
      data: orders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mengambil data pesanan." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      productId,
      buyerId = "user-buyer-1",
      receiverName,
      phone,
      street,
      city = "Jakarta Selatan",
      isApartment = false,
      floorLevel = 1,
      hasServiceElevator = true,
      helperCount = 1,
      includeDeepClean = false,
    } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "ID produk perabot wajib disertakan." },
        { status: 400 }
      );
    }

    if (!receiverName || !phone || !street) {
      return NextResponse.json(
        { success: false, error: "Informasi nama penerima, nomor HP, dan alamat pengiriman wajib diisi lengkap." },
        { status: 400 }
      );
    }

    const product = AtticDB.getListingById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Produk perabot tidak ditemukan di katalog." },
        { status: 404 }
      );
    }

    // 1. Calculate Bulky Cargo Logistics (PRD 7.4)
    const cargoCalc = CargoEngine.calculateLogistics({
      lengthCm: product.dimensions.length,
      widthCm: product.dimensions.width,
      heightCm: product.dimensions.height,
      weightKg: product.dimensions.weightKg || 30,
      originCity: product.city,
      destinationCity: city,
      isApartment: Boolean(isApartment),
      floorLevel: Number(floorLevel),
      hasServiceElevator: Boolean(hasServiceElevator),
      helperCount: Number(helperCount),
      includeDeepClean: Boolean(includeDeepClean),
    });

    // 2. Calculate Escrow Financials (PRD 7.3)
    const financials = EscrowService.calculateFinancials({
      productPrice: product.price,
      logisticsFee: cargoCalc.baseCargoRate,
      helperFee: cargoCalc.helperSurcharge,
      deepCleanFee: cargoCalc.deepCleanFee,
    });

    const orderId = `ATC-${Math.floor(100000 + Math.random() * 900000)}`;
    const shipmentId = `SHIP-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder: DBOrder = {
      id: orderId,
      buyerId,
      sellerId: product.seller.id,
      productId: product.id,
      product,
      status: "PAID_HELD",
      financials,
      destinationAddress: {
        receiverName,
        phone,
        street,
        city,
        isApartment: Boolean(isApartment),
        floorLevel: Number(floorLevel),
        hasServiceElevator: Boolean(hasServiceElevator),
      },
      cargoDetails: {
        vehicleType: cargoCalc.recommendedVehicle,
        cbm: cargoCalc.cbm,
        helperCount: Number(helperCount),
        deepCleanIncluded: Boolean(includeDeepClean),
      },
      shipmentId,
      createdAt: new Date().toISOString(),
    };

    AtticDB.createOrder(newOrder);

    // 3. Dispatch Logistics Fleet (PRD 7.4)
    const driverPartners = [
      { name: "Pak Supriadi (Lalamove Bulky)", phone: "0812-8822-4411" },
      { name: "Pak Slamet (Deliveree Fleet)", phone: "0813-9901-2244" },
      { name: "Pak Hendro (Attic Dedicated Van)", phone: "0811-3322-1100" },
    ];
    const assignedDriver = driverPartners[Math.floor(Math.random() * driverPartners.length)];

    const newShipment: ActiveShipment = {
      id: shipmentId,
      orderId,
      vehicleType: cargoCalc.recommendedVehicle,
      driverName: assignedDriver.name,
      driverPhone: assignedDriver.phone,
      helperCount: Number(helperCount),
      origin: `${product.location}, ${product.city}`,
      destination: `${street}, ${city}`,
      status: "PICKUP_EN_ROUTE",
      deepCleanIncluded: Boolean(includeDeepClean),
      estimatedArrival: "Estimasi penjemputan 45 menit lagi",
    };

    AtticDB.addShipment(newShipment);

    return NextResponse.json(
      {
        success: true,
        message: "Pembayaran berhasil diverifikasi & dana diamankan di Rekber Attic!",
        data: {
          order: newOrder,
          shipment: newShipment,
          escrowProtection: {
            guarantee: "Dana 100% aman di Rekber Attic sampai barang tiba dan diinspeksi 24 jam.",
            inspectionWindowHours: 24,
          },
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal membuat pesanan." },
      { status: 500 }
    );
  }
}
