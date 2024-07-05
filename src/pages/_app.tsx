import Footer from "@/components/footer";
import Header from "@/components/header";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Space_Grotesk } from "next/font/google";
import { useRouter } from "next/router";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isDynamicRoute = /\/blog\/\[.+\]/.test(router.pathname);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${spaceGrotesk.style.fontFamily};
        }
      `}</style>

      <ThemeProvider attribute="class">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
