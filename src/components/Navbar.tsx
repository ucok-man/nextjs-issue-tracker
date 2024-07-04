"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsFillBugFill } from "react-icons/bs";

export default function Navbar() {
  const currentPath = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];

  return (
    <nav className="flex items-center space-x-6 border-b mb-6 px-6 py-4 ">
      <Link href="/">
        <BsFillBugFill />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li
            key={link.href}
            className={classNames({
              "text-zinc-900": currentPath == link.href,
              "text-zinc-500": currentPath != link.href,
              "hover:text-zinc-900 transition-colors": true,
            })}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
