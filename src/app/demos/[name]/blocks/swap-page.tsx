import { SwapComponent } from "@/components/solana/swap";

export default async function SwapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
                  Swap Assets
                </h1>

                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Swap assets from one token to another.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <SwapComponent />
          </div>
        </section>
      </main>
    </div>
  );
}
