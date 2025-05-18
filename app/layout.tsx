import type { Metadata } from 'next';
import './globals.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import NavBar from './NavBar';

export const metadata: Metadata = {
  title: 'Issue Tracker App',
  description: 'Track issues and bugs in your projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <NavBar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
