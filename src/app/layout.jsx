import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AppProvider } from "./AppContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Task Manager",
  description: "Gestisci le tue attività",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-tr from-slate-800 to-slate-900 text-white`}
      >
        <SpeedInsights />
        <AppProvider>
          <Head>
            <title>JUYTFg </title>
          </Head>
          <Navbar />
          <div className="container mx-auto min-h-screen py-10">{children}</div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
