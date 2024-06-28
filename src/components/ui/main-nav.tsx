import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function MainNav() {
  return (
    <div className="hidden md:flex gap-3">
      <ul className="flex gap-3">
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/project">Project</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
      <ThemeToggle />
    </div>
  );
}
