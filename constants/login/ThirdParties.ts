import { z } from "zod";

export const ThirdParties = ["Google", "Facebook", "Pinterest"] as const;
export const ThirdPartiesSchema = z.enum(ThirdParties);
