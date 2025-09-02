import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ClientLayout from './client-layout';
const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hue Hero",
  description: "Hunt the odd color out!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
