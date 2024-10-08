import Link from "next/link";
import MainNav from "./ui/main-nav";
import MobileNav from "./ui/mobile-nav";
import LogoHeader from "./ui/logo";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-6 md:py-10 mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 dark:text-white">
      <LogoHeader />

      <MainNav />

      <MobileNav />
    </header>
  );
}
