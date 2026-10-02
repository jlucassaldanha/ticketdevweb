import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getTokenAndDataAction } from '@/actions/auth';
import AppProvider from './providers';
import Header from '@/components/my-components/Header';

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TicketDev",
  description: "Seu sistema de gerenciamento de eventos e ingressos",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { user, token } = await getTokenAndDataAction()

  return (
    <html
      lang="pt-BR"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <AppProvider user={user} token={token}>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
