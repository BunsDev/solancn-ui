import Image from "next/image";

export function RegistryLogo() {
  return (
    <>
      <div className="flex-shrink-0 rounded-md bg-primary p-1">
        <Image
          src="/logo-round.png"
          alt="Registry Logo"
          width={18}
          height={18}
        />
      </div>
      <span className="font-semibold">Solancn UI</span>
    </>
  );
}
