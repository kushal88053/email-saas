import type { Metadata } from "next";
import localFont from "next/font/local";
import "../shared/styles/globals.css";
import Providers from "@/shared/utils/Provides";

const clashDisplay = localFont(
  {
    src : "../assets/fonts/ClashDisplay-Variable.ttf",
    variable : "--font-clashDisplay" ,
    weight : "700" ,

  }
)

export const metadata: Metadata = {
  title: "Email-Sender",
  description: "Generated Kushal Patel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${clashDisplay.variable}`}
      >
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
