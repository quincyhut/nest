import Image from "next/image";
import { useId } from "react";

type ClipType = "arch" | "circle";

type ClippedImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  clipLeft?: boolean;
  clipType?: ClipType;
};

export default function ClippedImage({
  src,
  alt,
  width = 1437,
  height = 1075,
  className,
  clipLeft = false,
  clipType = "arch",
}: ClippedImageProps) {
  const clipId = useId();

  if (clipType === "circle") {
    const circleSize = Math.min(width, height);
    return (
      <svg
        width={circleSize}
        height={circleSize}
        viewBox={`0 0 ${circleSize} ${circleSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label={alt}
      >
        <defs>
          <clipPath id={`image-clip-circle-${clipId}`}>
            <circle cx={circleSize / 2} cy={circleSize / 2} r={circleSize / 2} />
          </clipPath>
          <clipPath id={`image-clip-circle-left-${clipId}`}>
            <path d={`M${circleSize / 2} 0 A${circleSize / 2} ${circleSize / 2} 0 0 0 ${circleSize / 2} ${circleSize} V0Z`} />
          </clipPath>
        </defs>
        <image
          href={src}
          width={circleSize}
          height={circleSize}
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#image-clip-circle${clipLeft ? "-left" : ""}-${clipId})`}
        />
      </svg>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1437 1075"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={alt}
    >
      <defs>
        <clipPath id={`image-clip-full-${clipId}`}>
          <path d="M1436.61 356.64V356.637C1436.61 159.672 1276.94 0 1079.97 0H356.635C159.673 0 0 159.672 0 356.637V356.64C0 753.35 321.597 1074.95 718.306 1074.95C1115.02 1074.95 1436.61 753.35 1436.61 356.64ZM85.417 621.696C85.645 621.765 85.82 621.896 86.05 621.961C85.943 622.267 85.9791 622.516 85.8781 622.818C85.4771 622.573 84.941 622.248 84.941 622.248C84.941 622.248 85.275 621.862 85.417 621.696Z" />
        </clipPath>
        <clipPath id={`image-clip-left-${clipId}`}>
          <path d="M718.3 0H356.635C159.673 0 0 159.672 0 356.637V356.64C0 753.35 321.597 1074.95 718.306 1074.95V0Z" />
        </clipPath>
      </defs>
      <image
        href={src}
        width="1437"
        height="1075"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#image-clip-${clipLeft ? "left" : "full"}-${clipId})`}
      />
    </svg>
  );
}
