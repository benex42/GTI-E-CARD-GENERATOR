import '../styles.css';
import '../overrides.css';
import './next.css';
import AppShell from '../components/app-shell';
import { CardProvider } from '../context/card-context';
import gtiHoldingMark from '../assets/gti-holding-mark-only.png';

export const metadata = {
  title: 'GTI Holding | E-Card Generator',
  description: 'Create a personalised GTI Holding e-card.',
  icons: {
    icon: [{ url: gtiHoldingMark.src, type: 'image/png' }],
    shortcut: [gtiHoldingMark.src]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet" />
      </head>
      <body><CardProvider><AppShell>{children}</AppShell></CardProvider></body>
    </html>
  );
}
