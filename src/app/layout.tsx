import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import GlobalState from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopping Corner",
  description: "An ecommerce platform",
  icons: {
    icon: ["/favicon.ico?v=4"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider cssVarsRoot={undefined}>
          <GlobalState>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </GlobalState>
        </ChakraProvider>
      </body>
    </html>
  );
}
