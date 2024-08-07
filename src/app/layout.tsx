import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/apis";

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
    <ReactQueryClientProvider>
      <html lang="en" className="w-full h-dvh overflow-hidden">
        <body
          className={`${inter.className} w-full h-full flex items-center justify-center px-10 tablet:mx-auto tablet:max-w-[400px]`}
        >
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
