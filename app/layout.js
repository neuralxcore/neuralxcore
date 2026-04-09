import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Neuralxcore",
    template: "%s | Neuralxcore",
  },
  description:
    "AI research and development startup building practical, high-impact intelligent systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body
        className={`${montserrat.className} flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-900 antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
