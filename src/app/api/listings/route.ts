import { NextResponse } from "next/server";
import { AtticDB } from "@/lib/db";
import { ListingValidator } from "@/services/listingValidator";
import { PendingListing } from "@/data/adminMockData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const condition = searchParams.get("condition");
    const city = searchParams.get("city");
    const query = searchParams.get("q")?.toLowerCase();
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null;
    const isNegotiable = searchParams.get("negotiable") === "true";

    let listings = AtticDB.getListings();

    if (category && category !== "all") {
      listings = listings.filter((item) => item.category === category);
    }

    if (condition && condition !== "all") {
      listings = listings.filter((item) => item.conditionTier === condition);
    }

    if (city && city !== "all") {
      listings = listings.filter((item) =>
        item.city.toLowerCase().includes(city.toLowerCase()) ||
        item.location.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (query) {
      listings = listings.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.brand.toLowerCase().includes(query) ||
          item.flawInfo.description?.toLowerCase().includes(query)
      );
    }

    if (minPrice !== null) {
      listings = listings.filter((item) => item.price >= minPrice);
    }

    if (maxPrice !== null) {
      listings = listings.filter((item) => item.price <= maxPrice);
    }

    if (isNegotiable) {
      listings = listings.filter((item) => item.negotiable);
    }

    return NextResponse.json({
      success: true,
      total: listings.length,
      data: listings,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mengambil daftar perabot." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Run strict listing validation (PRD 7.2.1 Mandatory Flaw Disclosure)
    const validation = ListingValidator.validate(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
          warnings: validation.warnings,
        },
        { status: 422 }
      );
    }

    // 2. Queue for Admin Moderation Desk
    const newPendingListing: PendingListing = {
      id: `MOD-${Date.now().toString().slice(-4)}`,
      title: body.title,
      sellerName: body.sellerName || "Penjual Attic",
      category: body.category,
      price: Number(body.price),
      conditionTier: body.conditionTier,
      submittedAt: "Baru saja",
      dimensions: {
        length: Number(body.dimensions.length),
        width: Number(body.dimensions.width),
        height: Number(body.dimensions.height),
        weightKg: Number(body.dimensions.weightKg || 30),
        isKnockdown: Boolean(body.dimensions.isKnockdown),
      },
      flawInfo: {
        hasFlaws: Boolean(body.flawInfo?.hasFlaws),
        description: body.flawInfo?.description || "",
        flawImages: body.flawInfo?.flawImages || [],
      },
      images: body.images || [],
      status: "PENDING",
    };

    AtticDB.addPendingListing(newPendingListing);

    return NextResponse.json(
      {
        success: true,
        message:
          "Iklan Anda berhasil dikirim ke Meja Moderasi Attic! Tim kurasi akan memverifikasi transparansi kondisi dalam 15-30 menit.",
        data: {
          pendingListing: newPendingListing,
          financialBreakdown: validation.calculatedFees,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memproses pendaftaran perabot." },
      { status: 500 }
    );
  }
}
