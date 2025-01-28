import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "EmpathAI - Your Mental Health Companion",
  description: "A compassionate AI companion for mental health support and mood tracking",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                  <p className="text-sm text-muted-foreground">
                    {new Date().getFullYear()} EmpathAI. All rights reserved.
                  </p>
                  <div className="flex items-center space-x-4">
                    <a
                      href="/privacy"
                      className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                      Privacy
                    </a>
                    <a
                      href="/terms"
                      className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                      Terms
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
