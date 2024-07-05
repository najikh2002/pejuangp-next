import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { usePathname } from "next/navigation";
import { NavLink, navLink } from "@/lib/constant";

export default function MainNav() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex gap-12">
      <ul className="flex gap-6">
        {navLink.map((item: NavLink, index: number) => (
          <li key={index}>
            <Link
              className={`hover:text-primary-500 transition-all ${
                item.href === pathname ? "font-bold" : ""
              }`}
              href={item.href}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <ThemeToggle />
    </div>
  );
}
