import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AquaOS",
  description: "Retail operations for aquarium stores",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
