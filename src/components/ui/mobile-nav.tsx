import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const showNavHandler = () => {
    show ? setShow(false) : setShow(true);
  };

  const hideNavOnRouteChange = () => {
    setShow(false);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", hideNavOnRouteChange); // Tambahkan event listener untuk route change
    return () => {
      router.events.off("routeChangeStart", hideNavOnRouteChange); // Hapus event listener saat komponen di-unmount
    };
  }, []); // Pastikan useEffect hanya dijalankan sekali

  return (
    <>
      <div className="flex md:hidden gap-3">
        <ThemeToggle />
        <button onClick={showNavHandler}>KLIK</button>
      </div>

      <ul
        className={`fixed top-0 w-full dark:bg-black dark:text-white h-full bg-white left-0 transition-all ${
          show ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <li>
          <Link href="/blog" onClick={showNavHandler}>
            Blog
          </Link>
        </li>
        <li>
          <Link href="/project" onClick={showNavHandler}>
            Project
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={showNavHandler}>
            About
          </Link>
        </li>
        <button onClick={showNavHandler}>KLIK</button>
      </ul>
    </>
  );
}
