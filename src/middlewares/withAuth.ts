import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse, NextFetchEvent, NextMiddleware } from "next/server";

const authPage = ["auth"];
const golongan4 = ["dashboard", "approve", "realization","course"];
const golongan5 = ["dashboard", "approve", "realization"];

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname.split("/")[1];
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (requireAuth.includes(pathname)) {
      if (token) {
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        if (token.golongan === "4" && !golongan4.includes(pathname)) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        if (token.golongan === "5" && !golongan5.includes(pathname)) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      } else {
        if (!authPage.includes(pathname)) {
          const url = new URL("/auth/login", req.url);
          url.searchParams.set("callbackUrl", encodeURI(req.url));
          return NextResponse.redirect(url);
        }
      }
    }

    return middleware(req, next);
  };
}
