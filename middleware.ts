import { NextRequest, NextResponse, NextMiddleware } from "next/server";
import { checkAuthHeader } from "./middleware/auth.middleware";

// This function can be marked `async` if using `await` inside
export const middleware: NextMiddleware = (request: NextRequest) => {
  console.log("ran middleware");

  return NextResponse.next();
};
