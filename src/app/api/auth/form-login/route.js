import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const cookieStore = await cookies();
  
  try {
    const contentType = request.headers.get("content-type") || "";
    let username = "";
    let password = "";

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      username = formData.get("username") || "";
      password = formData.get("password") || "";
    } else {
      const body = await request.json();
      username = body.username || "";
      password = body.password || "";
    }

    const requestUrl = new URL(request.url);
    const baseUrl = process.env.APP_URL || requestUrl.origin;

    if (!username || !password) {
      return NextResponse.redirect(new URL("/?error=invalid_credentials", baseUrl));
    }

    // Determine role based on username prefix
    const isDigitOnly = /^\d+$/.test(username.trim());
    const isStudent = isDigitOnly || username.includes(".stu") || username.toLowerCase().includes("student");
    
    const userRole = isStudent ? "mahasiswa" : "dosen";
    const userEmail = username.includes("@") ? username : `${username}@pnc.ac.id`;
    
    // Simulate real user name from username or use dummy
    let userName = username;
    if (isStudent) {
      userName = isDigitOnly ? `${username} Dapot Matthew Tampubolon` : "Dapot Matthew Tampubolon";
    } else {
      userName = "Dr. Ir. Budi Santoso, M.T.";
    }

    const user = {
      name: userName,
      email: userEmail.toLowerCase(),
      role: userRole,
      picture: null
    };

    cookieStore.set("magang_sso_session", JSON.stringify(user), {
      path: "/",
      maxAge: 24 * 60 * 60, // 24 hours
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    return NextResponse.redirect(new URL("/dashboard", baseUrl));
  } catch (error) {
    console.error("Form login error in magang:", error);
    const requestUrl = new URL(request.url);
    const baseUrl = process.env.APP_URL || requestUrl.origin;
    return NextResponse.redirect(new URL("/?error=auth_failed", baseUrl));
  }
}
