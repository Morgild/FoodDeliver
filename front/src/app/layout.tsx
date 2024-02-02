"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { theme } from "@/theme";
import { NavBar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <Stack minHeight="100vh">
                <NavBar />
                <Stack flex={1}>{children}</Stack>
                <Footer />
              </Stack>
            </AuthProvider>
            <ToastContainer />
          </ThemeProvider>
          <CssBaseline />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
