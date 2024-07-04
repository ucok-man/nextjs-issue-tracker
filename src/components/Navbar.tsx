import Link from "next/link";
import { BsFillBugFill } from "react-icons/bs";

export default function Navbar() {
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
            className="text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
