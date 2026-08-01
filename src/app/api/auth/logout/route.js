import { NextResponse } from "next/server";
import { getOIDCClient } from "@/lib/auth";

export async function GET(request) {
  const baseUrl = process.env.APP_URL || new URL(request.url).origin;
  const response = NextResponse.redirect(new URL("/", baseUrl));
  response.cookies.delete("magang_sso_session");

  const client = await getOIDCClient();
  if (client) {
    try {
      const endSessionUrl = client.endSessionUrl({
        post_logout_redirect_uri: process.env.APP_URL || "http://localhost:3001",
      });
      return NextResponse.redirect(endSessionUrl);
    } catch (e) {
      console.warn("Could not generate OIDC endSessionUrl:", e.message);
    }
  }

  return response;
}
