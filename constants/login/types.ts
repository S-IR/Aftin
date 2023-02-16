import { UserCredential } from "firebase/auth";

export type authResponseType =
  | { status: "success"; user: UserCredential }
  | { status: "error"; error: unknown };
