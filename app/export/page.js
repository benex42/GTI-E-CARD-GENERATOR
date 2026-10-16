'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CardPreview from '../../components/card-preview';
import { useCard } from '../../context/card-context';
import { cardCopy } from '../../lib/card-copy';
import { downloadCard } from '../../utils/download-card';

export default function ExportPage() {
  const router = useRouter();
  const { details } = useCard();
  const [isDownloading, setIsDownloading] = useState(null);
  const [toast, setToast] = useState('');
  const exportCard = async (format) => {
    setIsDownloading(format);
    try { await downloadCard(format, `${details.firstName} ${details.lastName || ''}`); setToast(cardCopy[details.language].toast); window.setTimeout(() => setToast(''), 3000); }
    catch { window.alert('Your browser could not create the image. Please try again.'); }
    finally { setIsDownloading(null); }
  };
  return <><section className="studio screen active preview-screen"><section className="preview-panel"><header className="preview-header"><span>EXPORT YOUR CARD</span><div className="preview-actions"><button className="back-button preview-back-button" onClick={() => router.push('/design')} type="button">← Design controls</button><div className="export-options" role="group" aria-label="Export format">{['png', 'jpg', 'pdf'].map((format) => <button key={format} className="download-button export-button" onClick={() => exportCard(format)} disabled={Boolean(isDownloading)} type="button">{isDownloading === format ? 'Preparing…' : format.toUpperCase()}</button>)}</div></div></header><div className="preview-area"><CardPreview /></div><p className="preview-hint">Your card is ready to download.</p></section></section><div id="toast" className={toast ? 'show' : ''} role="status" aria-live="polite">{toast}</div></>;
}
