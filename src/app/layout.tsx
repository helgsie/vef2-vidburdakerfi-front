import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viðburðakerfi",
  description: "Viðburðakerfi fyrir dagskrá menningarnætur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AuthProvider>
            <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
              <div className="max-w-6xl mx-auto px-12 sm:px-20 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
                  <Header/>
                  <Navigation/>
                </div>
                {children}
                <Footer/>
              </div>
            </div>
          </AuthProvider>
        </body>
      </html>
  );
}
