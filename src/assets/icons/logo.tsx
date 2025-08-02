import Image from "next/image";

interface LogoProps {
  useBlack?: boolean;
}

export const Logo = ({ useBlack }: LogoProps) => {
  const WhiteLogoSVG = "/logo-white.svg"
  const BlackLogoSVG = "/logo-black.svg"
  return (
    <Image
      src={useBlack ? BlackLogoSVG : WhiteLogoSVG}
      alt="Logo"
      width={24}
      height={24}
    />
  );
};
