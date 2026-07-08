import { NextResponse } from "next/server";
import { passwordMatches, setAdminCookie } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json();
  if (!passwordMatches(String(body.password || ""))) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  await setAdminCookie();
  return NextResponse.json({ ok: true });
}
