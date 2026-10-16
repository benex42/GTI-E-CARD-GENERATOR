'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import defaultLogo from '../assets/gti-holding-logo.png';
import { useCard } from '../context/card-context';

const steps = [
  ['details', 'Details'],
  ['design', 'Design'],
  ['export', 'Export']
];

export default function AppShell({ children }) {
  const pathname = usePathname();
  const { darkMode, setDarkMode } = useCard();
  const currentPage = pathname.split('/')[1] || 'details';

  return <main className={`app ${darkMode ? 'dark-mode' : ''}`}>
    <header className="topbar">
      <img className="header-logo" src={defaultLogo.src} alt="GTI Holding" />
      <nav className="steps" aria-label="Progress">
        {steps.map(([page, label], index) => <Fragment key={page}>
          <Link href={`/${page}`} className={`step ${currentPage === page ? 'active' : ''}`} aria-current={currentPage === page ? 'step' : undefined}><b>{index + 1}</b>{label}</Link>
          {index < steps.length - 1 && <i />}
        </Fragment>)}
      </nav>
      <button className="theme-toggle" type="button" onClick={() => setDarkMode((current) => !current)} aria-pressed={darkMode} aria-label={darkMode ? 'Use light mode' : 'Use dark mode'} title={darkMode ? 'Use light mode' : 'Use dark mode'}><span>{darkMode ? '☀' : '☾'}</span></button>
    </header>
    {children}
  </main>;
}
