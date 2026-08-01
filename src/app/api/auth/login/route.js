import { NextResponse } from "next/server";
import { getOIDCClient } from "@/lib/auth";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mockRole = searchParams.get("mockRole"); // "mahasiswa" atau "dosen"

  const client = await getOIDCClient();

  // If client is missing or mock parameter is active, handle mock login
  if (!client || mockRole) {
    const dummyUser = mockRole === "dosen" ? {
      name: "Dr. Ir. Budi Santoso, M.T.",
      email: "budisantoso@pnc.ac.id",
      role: "dosen"
    } : {
      name: "250215010 Dapot Matthew Tampubolon",
      email: "dapotmatthew0.stu@pnc.ac.id",
      role: "mahasiswa"
    };

    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.cookies.set("magang_sso_session", JSON.stringify(dummyUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
  }

  // Real Keycloak redirect
  const authUrl = client.authorizationUrl({
    scope: "openid email profile",
    prompt: "consent",
  });

  return NextResponse.redirect(authUrl);
}
