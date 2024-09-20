import { Toaster } from "../components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from 'next/font/google';
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"]});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Mock Vani AI",
  description: "Generated by Mock Vani AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Toaster/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
