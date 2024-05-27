import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ziphop",
  description: "Let's set a time available to everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-dvh overflow-hidden">
      <body className={`${inter.className} w-full h-full`}>
        <main className="flex w-full h-full items-center justify-center px-10 tablet:mx-auto tablet:max-w-[400px]">
          {children}
        </main>
      </body>
    </html>
  );
}
