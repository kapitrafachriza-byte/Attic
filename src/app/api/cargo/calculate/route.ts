import { NextResponse } from "next/server";
import { CargoEngine, CargoCalculationInput } from "@/services/cargoEngine";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CargoCalculationInput;

    if (!body.lengthCm || !body.widthCm || !body.heightCm) {
      return NextResponse.json(
        {
          success: false,
          error: "Dimensi perabot (panjang, lebar, dan tinggi dalam cm) wajib diisi.",
        },
        { status: 400 }
      );
    }

    if (body.lengthCm <= 0 || body.widthCm <= 0 || body.heightCm <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Dimensi fisik perabot harus berupa angka positif lebih dari 0 cm.",
        },
        { status: 400 }
      );
    }

    const calculation = CargoEngine.calculateLogistics({
      lengthCm: Number(body.lengthCm),
      widthCm: Number(body.widthCm),
      heightCm: Number(body.heightCm),
      weightKg: body.weightKg ? Number(body.weightKg) : 30,
      originCity: body.originCity || "Jakarta Selatan",
      destinationCity: body.destinationCity || "Jakarta Selatan",
      isApartment: Boolean(body.isApartment),
      floorLevel: body.floorLevel ? Number(body.floorLevel) : 1,
      hasServiceElevator: body.hasServiceElevator !== false,
      helperCount: body.helperCount !== undefined ? Number(body.helperCount) : 1,
      includeDeepClean: Boolean(body.includeDeepClean),
    });

    return NextResponse.json({
      success: true,
      data: calculation,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Gagal menghitung tarif kargo logistik.",
      },
      { status: 500 }
    );
  }
}
