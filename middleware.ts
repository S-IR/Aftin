import { NextRequest, NextResponse, NextMiddleware } from "next/server";
import { isAuthHeader } from "./middleware/auth.middleware";

// This function can be marked `async` if using `await` inside
export const middleware: NextMiddleware = (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith("/api/products/image-tranasformations")) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("token", authHeader.substring(7));
      return NextResponse.next({ request: { headers: requestHeaders } });
    } else {
    }
  } else {
    // This logic is only applied to pages
    // console.log("Running middleware for pages");
  }
  return NextResponse.next();
};

export const config = {
  matcher: "/api/:path*",
};
