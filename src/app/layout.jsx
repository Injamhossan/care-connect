import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import "../style/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import AuthProvider from "@/components/auth/AuthProvider";
import InitialLoader from "@/components/common/InitialLoader";

const plusJakarta = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const metadata = {
  title: "Care Connect - Trust Care Services for your Loves Ones",
  description: "Trust Care Services for your Loves Ones",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${plusJakarta.className} ${plusJakarta.variable} antialiased font-sans`}
        suppressHydrationWarning={true}
      >
        <Theme appearance="light" accentColor="green">
          <InitialLoader />
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}
