'use client';

import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';

import Link from 'next/link';
import { Box, Container, Flex } from '@radix-ui/themes';
import { AiFillBug } from 'react-icons/ai';

function NavBar() {
  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues/list', label: 'Issues' },
  ];
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className="mb-5 border-b px-5 py-3" role="navigation">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classnames({
                      'text-zinc-900': link.href === currentPath,
                      'text-zinc-500': link.href !== currentPath,
                      'transition-colors hover:text-zinc-800': true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <Link href="/api/auth/signout">Sign out</Link>
            )}
            {status === 'unauthenticated' && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar;
