import { NextResponse } from "next/server";
import { getOIDCClient } from "@/lib/auth";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const client = await getOIDCClient();
  if (!client) {
    return NextResponse.redirect(new URL("/?error=oidc_not_initialized", request.url));
  }

  try {
    const params = client.callbackParams(request.url);
    const tokenSet = await client.callback(process.env.OIDC_REDIRECT_URI, params);
    
    // Fetch user profile info
    const userinfo = await client.userinfo(tokenSet.access_token);
    
    // Identify student role vs staff/lecturer role
    const isStudent = userinfo.email.endsWith(".stu@pnc.ac.id") || userinfo.email.includes("student");
    const userRole = isStudent ? "mahasiswa" : "dosen";

    const userData = {
      name: userinfo.name || userinfo.preferred_username,
      email: userinfo.email,
      picture: userinfo.picture || null,
      role: userRole
    };

    const baseUrl = process.env.APP_URL || new URL(request.url).origin;
    const response = NextResponse.redirect(new URL("/dashboard", baseUrl));
    response.cookies.set("magang_sso_session", JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
  } catch (error) {
    console.error("❌ OIDC Callback failed:", error.message);
    const baseUrl = process.env.APP_URL || new URL(request.url).origin;
    return NextResponse.redirect(new URL("/?error=auth_failed", baseUrl));
  }
}
