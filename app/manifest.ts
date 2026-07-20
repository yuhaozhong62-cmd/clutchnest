import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.siteName,
    short_name: site.siteName,
    description: site.descriptionCn,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/icons/clutchnest-icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
