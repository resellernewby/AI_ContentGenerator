import type { Metadata } from "next";
import { Inter,Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Poppins({ weight: ['100','200','300','400','500','600', '700'],subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nighelva",
  description: "AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
