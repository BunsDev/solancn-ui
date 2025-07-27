import { Squirrel } from "lucide-react";
import { Logo } from "../logo";

export function RegistryLogo() {
  return (
    <div className="flex items-center gap-3 bg-primary/20 py-4 px-2 rounded-sm w-[256px] h-6 max-w-xs mx-auto justify-center gap-[1rem]">
      <Logo size="lg" className="h-7 w-7 text-foreground" />
      <span className="font-semibold text-foreground text-base">
        Solancn UI
      </span>
    </div>
  );
}

// import Image from "next/image";

// export function RegistryLogo() {
//   return (
//     <>
//       <div className="flex-shrink-0 rounded-md bg-primary p-1">
//         <Image
//           src="/logo-round.png"
//           alt="Registry Logo"
//           width={18}
//           height={18}
//         />
//       </div>
//       <span className="font-semibold">Solancn UI</span>
//     </>
//   );
// }
