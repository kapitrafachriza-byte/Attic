import { NextResponse } from "next/server";
import { AtticDB } from "@/lib/db";

/**
 * Google Sign-In Authentication Endpoint
 *
 * Accepts a Google profile (email + name) from the client-side Google Sign-In flow.
 * In production, the client sends a Google ID token (credential) which should be
 * verified server-side using `google-auth-library` before extracting user info.
 *
 * Current implementation: Accepts email/name directly for development.
 * Production TODO: Verify Google ID token with `google-auth-library`.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // ── Production path: verify Google ID token ──
    // When a real Google Client ID is configured, the client sends `credential`
    // (a JWT ID token from Google Identity Services). Install `google-auth-library`
    // and verify:
    //
    // import { OAuth2Client } from "google-auth-library";
    // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    // const ticket = await client.verifyIdToken({
    //   idToken: body.credential,
    //   audience: process.env.GOOGLE_CLIENT_ID,
    // });
    // const payload = ticket.getPayload();
    // const verifiedEmail = payload?.email;
    // const verifiedName = payload?.name;

    // ── Development path: accept email/name directly ──
    const googleEmail = email?.trim().toLowerCase();
    const googleName = name?.trim() || "Pengguna Google";

    if (!googleEmail || !googleEmail.includes("@")) {
      return NextResponse.json(
        {
          success: false,
          error: "Email Google tidak valid. Silakan coba lagi dengan akun Google yang benar.",
        },
        { status: 400 }
      );
    }

    // Find existing user or create new one
    let user = AtticDB.findUserByIdentifier(googleEmail);

    if (!user) {
      user = AtticDB.createUser({
        name: googleName,
        email: googleEmail,
        role: "BUYER",
      });
    }

    return NextResponse.json({
      success: true,
      message: `Berhasil masuk dengan akun Google (${googleEmail})!`,
      user: {
        id: user.id,
        name: user.name,
        emailOrPhone: user.email,
        phone: user.phoneNumber,
        avatarUrl: user.avatarUrl,
        isSellerVerified: user.role === "SELLER",
        walletBalance: user.sellerWalletBalance,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal autentikasi dengan Google." },
      { status: 500 }
    );
  }
}

