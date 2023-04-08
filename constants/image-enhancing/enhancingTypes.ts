export type enhancerType = "upscale" | "deblur" | "stylize";

export const deblurModelTypes = [
  `Image Denoising`,
  `Image Deblurring (GoPro)`,
  `Image Deblurring (REDS)`,
  `Image Deblurring (RealBlur_R)`,
  `Image Deblurring (RealBlur_J)`,
  `Image Deraining (Rain streak)`,
  `Image Deraining (Rain drop)`,
  `Image Dehazing (Indoor)`,
  `Image Dehazing (Outdoor)`,
  `Image Enhancement (Low-light)`,
  `Image Enhancement (Retouching)`,
] as const;
export type upscaleOptionFields = null;
export type deblurOptionFields = { model: (typeof deblurModelTypes)[number] };
export type stylizeOptionFields = { text: string };

export type enhancerOptionFields =
  | null
  | deblurOptionFields
  | stylizeOptionFields
  | upscaleOptionFields;
