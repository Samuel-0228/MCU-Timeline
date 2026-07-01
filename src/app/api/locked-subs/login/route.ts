import { NextResponse } from "next/server";

const adminCookieName = "locked-subs-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = typeof body?.password === "string" ? body.password : "";
    const expectedKey = process.env.ADMIN_ROUTE_KEY;

    if (!expectedKey) {
      return NextResponse.json({ error: "ADMIN_ROUTE_KEY is not configured." }, { status: 500 });
    }

    if (!password || password !== expectedKey) {
      return NextResponse.json({ error: "Invalid admin key." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(adminCookieName, expectedKey, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/locked-subs",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid login payload." }, { status: 400 });
  }
}
