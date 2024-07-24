import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lumen Workspace",
  description: "Collaboarate Together",
  icons:{
    icon:'icons/Lumen_logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables: {
            colorText: '#fff',
            colorPrimary: '#0E78F9',
            colorBackground: '#02000d',
            colorInputBackground: '#252a41',
            colorInputText: '#fff',
          },
          elements: {
            socialButtonsIconButton: 'bg-white',
          }
        }}
      >
        <body className={`${inter.className} bg-dark-2`}>
          {children}
          <Toaster/>
          </body>
      </ClerkProvider>
    </html>
  );
}
