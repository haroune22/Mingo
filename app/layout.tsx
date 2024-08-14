import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";


const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mingo",
  description: "Language learning app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
