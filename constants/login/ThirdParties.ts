import { z } from "zod";

export const ThirdParties = ["Google", "Facebook"];
export const ThirdPartiesSchema = z.enum(["Google", "Facebook"]);
