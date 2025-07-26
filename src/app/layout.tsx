import type { Metadata } from "next";
import "./globals.css";
// import { AppProviders } from '@/components/app-providers'
import { AppLayout } from "@/components/app-layout";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeSelect } from "@/components/theme-select";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://ui.solancn.com";

export const metadata: Metadata = {
  title: "Solana UI",
  description:
    "A set of beautifully-designed, accessible Solana components and a code distribution platform. Works with your favorite frameworks. Open Source. Open Code.",
  keywords: [
    "Solana UI",
    "Solana",
    "UI",
    "Components",
    "Code Distribution",
    "Open Source",
    "Open Code",
  ],
  openGraph: {
    title: "Solana UI",
    description:
      "A set of beautifully-designed, accessible Solana components and a code distribution platform. Works with your favorite frameworks. Open Source. Open Code.",
    images: [
      {
        url: `${baseURL}/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: `${baseURL}/favicon.ico`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={true}
          storageKey="solancn-ui-theme"
        >
          <AppLayout>
            {children}
            <Analytics />
          </AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
// Patch BigInt so we can log it using JSON.stringify without any errors
declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};
