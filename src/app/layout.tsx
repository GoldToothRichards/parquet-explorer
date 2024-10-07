import type {Metadata} from 'next';
import {JetBrains_Mono} from 'next/font/google';
import './globals.css';

const jetBrainsMono = JetBrains_Mono({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Parquet Explorer',
  description: 'A browser-based SQL editor for the blockchain.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.className} bg-black`}>{children}</body>
    </html>
  );
}
