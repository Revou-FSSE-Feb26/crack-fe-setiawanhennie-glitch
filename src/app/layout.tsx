import type { Metadata } from "next";
import { Nunito, Baloo_2 } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NusaSkillz",
  description: "Gamified Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${baloo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}