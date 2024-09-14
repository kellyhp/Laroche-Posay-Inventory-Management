import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";

const ChillaxReg = localFont({
  src: "./fonts/Chillax-Regular.woff",
  variable: "--font-chillax-reg",
  weight: "400 500",
});

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "Managing inventory from La-Roche Posay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ChillaxReg.variable} font-chillaxReg`}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
