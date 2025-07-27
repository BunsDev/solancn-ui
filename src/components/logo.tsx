"use client";

import { cn } from "@/lib/utils";
import HeaderLogo from "../../assets/vibes-guide.svg";
import RoundLogo from "../../assets/logo.svg";
import Image from "next/image";

const pathVariants = {
  hidden: {
    pathLength: 0,
    fillOpacity: 0,
  },
  visible: {
    pathLength: 1,
    fillOpacity: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
} as const;

const sizes: any = {
  sm: {
    svg: "h-6",
    betaTag: "bottom-[2px] left-[calc(100%+6px)] px-1.5 py-0.5 text-[9px]",
  },
  lg: {
    svg: "h-12",
    betaTag: "bottom-[4px] left-[calc(100%+10px)] px-2 py-0.5 text-base",
  },
  xl: {
    svg: "h-14",
    betaTag: "bottom-[7px] left-[calc(100%+15px)] px-2.5 py-1 text-base",
  },
  full: {
    svg: "h-full",
    betaTag: "bottom-[7px] left-[calc(100%+15px)] px-2.5 py-1 text-base",
  },
};

export function Logo({
  containerClassName,
  size,
  className,
  header,
  ...props
}: {
  containerClassName?: string;
  size?: "sm" | "lg" | "xl" | "full";
  className?: string;
  header?: boolean;
}) {
  return (
<div className={cn("relative", containerClassName)}>
      <Image
        src={header ? HeaderLogo : RoundLogo}
        alt="Logo"
        width={2400}
        height={1200}
        className={cn(
          sizes[size ?? "lg"].svg,
          "max-h-[256px] w-auto", className,
          header && "h-12"
        )}
        {...props}
      />
    </div>
  );
}
