import './globals.css';
import React from 'react';
import { StateProvider } from '../lib/state';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#000' }}>
        <StateProvider>
          {children}
        </StateProvider>
      </body>
    </html>
  );
}
