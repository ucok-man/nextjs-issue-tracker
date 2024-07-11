"use client";

import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsFillBugFill } from "react-icons/bs";
import Skeleton from "./Skeleton";

export default function Navbar() {
  return (
    <nav className="border-b mb-6 px-6 py-4 ">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="5">
            <Logo />
            <NavLink />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

function Logo() {
  return (
    <Link href="/">
      <BsFillBugFill />
    </Link>
  );
}

function NavLink() {
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
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li
          key={link.href}
          className={classNames({
            "nav-link": true,
            "!text-zinc-900": currentPath == link.href,
          })}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}

function AuthStatus() {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width={"4rem"} height={"2rem"} />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link " href="/api/auth/signin">
        <Button className="cursor-pointer">Sign in</Button>
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className="cursor-pointer"
            src={session?.user?.image!}
            fallback="?"
            size={"2"}
            radius="full"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Hi, {session?.user?.name}</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Label className="text-gray-800 text-base">
            {session?.user?.email}
          </DropdownMenu.Label>

          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Sign out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}
