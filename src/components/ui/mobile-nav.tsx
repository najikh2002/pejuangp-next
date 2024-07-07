import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { NavLink, navLink } from "@/lib/constant";

export default function MobileNav() {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const showNavHandler = () => {
    setShow((prev) => !prev);
  };

  const hideNavOnRouteChange = () => {
    setShow(false);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", hideNavOnRouteChange);
    return () => {
      router.events.off("routeChangeStart", hideNavOnRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <div className="flex md:hidden gap-3">
        <ThemeToggle />
        <button onClick={showNavHandler}>MENU</button>
      </div>

      <div
        className={`fixed top-0 w-full dark:bg-black dark:text-white h-full bg-white left-0 transition-all z-30 ${
          show ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <ul className="flex flex-col justify-center items-center h-full gap-10">
          {navLink.map((item: NavLink, index: number) => (
            <li key={index}>
              <Link
                className={pathname.startsWith(item.href) ? "font-bold" : ""}
                href={item.href}
                onClick={showNavHandler}
              >
                {item.title}
              </Link>
            </li>
          ))}
          <button onClick={showNavHandler}>
            <svg
              className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </ul>
      </div>
    </>
  );
}
