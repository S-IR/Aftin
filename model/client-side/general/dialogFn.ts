import { number } from "zod";
import { paidFeature } from "../../../typings/typings";
import { tier_array } from "../../../typings/image-types/ImageTypes";

/**
 * Determines the display name of the feature that the PaidFeatureDialog appeared for.
 * @param feature the name of the feature
 * @returns an object containing some metadata for that feature
 */
export const getPaidFeatureMetas = (
  feature: paidFeature
): { displayName: string; tier: (typeof tier_array)[number] } => {
  switch (feature) {
    case "svg-convert":
      return { displayName: "SVG Conversion", tier: "silver" };
    case "upscale-image":
      return { displayName: "image upscaling", tier: "gold" };
    case "stylize-image":
      return { displayName: "stylizing images", tier: "gold" };
    case "deblur-image":
      return { displayName: "debluring images", tier: "gold" };
  }
};
