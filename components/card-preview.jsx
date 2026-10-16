'use client';

import defaultLogo from '../assets/gti-holding-logo.png';
import blackWaveLines from '../assets/wave-lines-black.png';
import whiteWaveLines from '../assets/wave-lines-white.png';
import yellowWaveLines from '../assets/wave-lines-yellow.png';
import { useCard } from '../context/card-context';
import { cardCopy } from '../lib/card-copy';
import { getSubsidiary } from '../lib/subsidiaries';

export default function CardPreview() {
  const { details, message, theme, textAlign, headingSize, textSize, identitySize, identityAlign, photo, subsidiaryLogo, photoSize, photoZoom, photoPosition, active } = useCard();
  const identityScale = identitySize / 100;
  const cardMessage = message.trim() || active.message;
  const selectedSubsidiary = getSubsidiary(details.subsidiary);
  const isSaoPay = selectedSubsidiary?.id === 'sao-pay';
  const showSubsidiaryLogo = selectedSubsidiary?.id !== 'gti-holdings' && (subsidiaryLogo || selectedSubsidiary);
  const waveLines = theme === 'black' ? blackWaveLines : theme === 'white' ? whiteWaveLines : yellowWaveLines;

  return <article className={`ecard template-card theme-${theme} align-${textAlign} ${photo ? 'has-photo' : ''}`} id="ecard" aria-label="E-card preview" style={{ '--photo-size': `${photoSize}%` }}>
    <div className="card-texture" /><div className="shape shape-a" /><div className="shape shape-b" /><div className="confetti one" /><div className="confetti two" /><div className="confetti three" />
    <div className="balloon balloon-one" aria-hidden="true" /><div className="balloon balloon-two" aria-hidden="true" />
    <div className="card-logo-wrap"><img className="card-logo default-card-logo" src={defaultLogo.src} alt="GTI Holding" data-export-color={theme === 'black' ? '#e4aa34' : '#171717'} /></div>
    {showSubsidiaryLogo && <div className={`subsidiary-logo-wrap ${isSaoPay ? 'sao-pay-logo-wrap' : ''}`}>
      {selectedSubsidiary?.logo ? <img src={selectedSubsidiary.logo.src} alt={selectedSubsidiary.name} data-export-color={theme === 'black' ? '#e4aa34' : '#171717'} /> : subsidiaryLogo ? <img src={subsidiaryLogo} alt="Subsidiary logo" data-export-color={theme === 'black' ? '#e4aa34' : '#171717'} /> : <div className="subsidiary-wordmark" aria-label={selectedSubsidiary.name}><strong>{selectedSubsidiary.mark}</strong>{selectedSubsidiary.label && <span>{selectedSubsidiary.label}</span>}</div>}
    </div>}
    <div className="card-copy">
      <p className="eyebrow-card">{active.celebration}</p>
      <h2 style={{ fontSize: `clamp(${35 * headingSize / 100}px, ${5.3 * headingSize / 100}vw, ${59 * headingSize / 100}px)` }}>{active.heading[0]}<br /><em>{active.heading[1]}</em></h2>
      <p className="card-message" style={{ fontSize: `${9 + (textSize - 80) * 0.095}px` }}>{cardMessage}</p>
      <p className="signature"><span>{cardCopy[details.language].signature}</span><br /><strong>{details.from.trim() || 'Your GTI Family'}</strong></p>
    </div>
    {photo && <div className={`photo-frame position-${photoPosition}`}><img src={photo} alt="Recipient" style={{ transform: `scale(${photoZoom / 100})` }} /></div>}
    <img className="wave-lines" src={waveLines.src} alt="" aria-hidden="true" />
    <div className={`identity-block identity-${identityAlign}`} style={{ textAlign: identityAlign }}><div className="identity-name-row">{details.lastName?.trim() && <p className="person-surname" style={{ fontSize: `clamp(${7 * identityScale}px, ${1 * identityScale}vw, ${12 * identityScale}px)` }}>{details.lastName.trim()}</p>}<p className="person-name" style={{ fontSize: `clamp(${23 * identityScale}px, ${3.9 * identityScale}vw, ${44 * identityScale}px)` }}>{details.firstName.trim() || 'A wonderful colleague'}</p></div><p className="team-name" style={{ fontSize: `clamp(${7 * identityScale}px, ${0.82 * identityScale}vw, ${10 * identityScale}px)` }}>{(details.team.trim() || 'GTI Holding').toUpperCase()}</p></div>
    <p className="card-footer">{cardCopy[details.language].footer}</p>
  </article>;
}
