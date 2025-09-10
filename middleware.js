// middleware.js

import { NextResponse } from "next/server";

const COUNTDOWN_END = new Date(process.env.NEXT_PUBLIC_LAUNCH_DATE); // UTC launch time

export async function middleware(req) {

  const url = new URL(req.url);
  const now = new Date();

  // Countdown protection
  if (url.pathname === "/" && now < COUNTDOWN_END) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home",]
};
