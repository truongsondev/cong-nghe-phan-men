import { Image } from "@imagekit/react";
import { URLENDPOINT } from "@/environments/dev.environment";

export default function MyImage({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <Image
      urlEndpoint={URLENDPOINT}
      src={src || "default-image.jpg"}
      width={width || 100}
      height={height || 100}
      alt={alt || "Image"}
      // transformation={[{ width: "100%", height: "100%", crop: "fill" }]}
    />
  );
}
