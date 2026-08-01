import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("magang_sso_session");

  if (!sessionCookie) {
    redirect("/");
  }

  let user = null;
  try {
    user = JSON.parse(sessionCookie.value);
  } catch (e) {
    redirect("/");
  }

  return <DashboardClient user={user} />;
}
