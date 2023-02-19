import { UserCredential } from "firebase/auth";

export type authResponseType =
  | { status: "success"; user: UserCredential["user"] }
  | { status: "error"; error: unknown };
