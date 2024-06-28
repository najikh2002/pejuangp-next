import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        html {
            font-family: ${inter.style.fontFamily}
        }
    `}</style>
      <main>{children}</main>
    </>
  );
}
