import { Squirrel } from "lucide-react";
import { Logo } from "../logo";

export function RegistryLogo() {
  return (
    <div className="flex items-center gap-3 bg-primary/40 py-5 px-4 rounded-md w-[256px] h-6 max-w-xs mx-auto justify-center gap-[1rem]">
      <Logo size="lg" className="h-6 w-6 text-foreground" />
      <span className="font-semibold text-foreground text-sm">
        Solancn UI Registry
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
