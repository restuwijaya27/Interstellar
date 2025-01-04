import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";

import Footer from "~/components/footer";
import ThemeProvider from "~/components/theme-provider";

export const metadata = {
  title: "SIP - Interstellar",
  description: "Sistem informasi perpustakaan berbasis web",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#1a1a1a", // Gelap mewah
          colorText: "#000000", // Warna emas untuk teks
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className="text-gold-500 relative flex h-screen flex-col bg-black">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <div className="bg-dark-900 flex-1 rounded-lg p-6 shadow-xl">
              <TRPCReactProvider>{children}</TRPCReactProvider>
              <Toaster />
            </div>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
