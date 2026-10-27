'use client';

import { useRef, useState } from 'react';
import defaultLogo from '../assets/gti-holding-logo.png';
import blackWaveLines from '../assets/wave-lines-black.png';
import yellowWaveLines from '../assets/wave-lines-yellow.png';
import { useCard } from '../context/card-context';
import { cardCopy, withSubsidiary } from '../lib/card-copy';
import { getSubsidiary } from '../lib/subsidiaries';

function createDotTexture(colour) {
  const dots = [];
  for (let row = 0; row < 48; row += 1) {
    const opacity = Math.max(0, .32 * (1 - row / 47));
    for (let column = 0; column < 31; column += 1) dots.push(`<circle cx="${4 + column * 7}" cy="${4 + row * 7}" r=".65" opacity="${opacity.toFixed(3)}" />`);
  }
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 336" preserveAspectRatio="none"><g fill="${colour}">${dots.join('')}</g></svg>`)}`;
}

function createBrandWaveLines(accent, foreground) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 250" preserveAspectRatio="none"><path d="M-30 115C130 35 285 45 440 150S705 258 1030 105" fill="none" stroke="${foreground}" stroke-width="22" stroke-linecap="round" opacity=".88"/><path d="M-30 145C140 55 285 68 435 166S720 272 1030 130" fill="none" stroke="${accent}" stroke-width="29" stroke-linecap="round"/></svg>`)}`;
}

export default function CardPreview() {
  const { details, message, theme, textAlign, headingSize, textSize, identitySize, identityAlign, photo, subsidiaryLogo, photoSize, photoZoom, photoPosition, photoCropOffset, setPhotoCropOffset, saveHistory, active } = useCard();
  const dragRef = useRef(null);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const identityScale = identitySize / 100;
  const selectedSubsidiary = getSubsidiary(details.subsidiary);
  const subsidiaryName = selectedSubsidiary?.name || 'GTI Holding';
  const activeCopy = withSubsidiary({ ...active, footer: cardCopy[details.language].footer }, subsidiaryName);
  const cardMessage = message.trim() || activeCopy.message;
  const isSaoPay = selectedSubsidiary?.id === 'sao-pay';
  const isSubsidiaryFlyer = Boolean(selectedSubsidiary && selectedSubsidiary.id !== 'gti-holdings');
  const showHoldingLogo = selectedSubsidiary?.id === 'gti-holdings';
  const showSubsidiaryLogo = selectedSubsidiary?.id !== 'gti-holdings' && (subsidiaryLogo || selectedSubsidiary);
  const brandPrimaryColours = { 'ka-technologies': '#208ed1', katon: '#00afe5', 'gti-healthcare': '#2da9dc', 'gti-properties': '#ffa126', gnrl: '#1f4d28', 'gti-switch': '#efb640', passmall: '#ff8500', pass: '#ffc329', 'gt-invest': '#bd7d34', 'gti-telecom': '#4b0b78', 'gti-bank': '#d5231d', 'gti-foundation': '#dea00d', 'sao-pay': '#e4aa34', ais: '#ff6300', 'job-connectz': '#e00000', ael: theme === 'dark' ? '#ffffff' : '#211c55', gcpcl: '#bd963c' };
  const brandDotColours = { 'ka-technologies': '#062e65', katon: '#062761', 'gti-healthcare': '#073259', 'gti-properties': theme === 'dark' ? '#fff1d8' : '#b95c08', gnrl: theme === 'dark' ? '#cfe2cc' : '#dd5b22', 'gti-switch': theme === 'dark' ? '#f7dfa7' : '#171717', passmall: theme === 'dark' ? '#ffe1c5' : '#f06e00', pass: theme === 'dark' ? '#ffe4a0' : '#bf160c', 'gt-invest': theme === 'dark' ? '#e7bf94' : '#07375a', 'gti-telecom': theme === 'dark' ? '#f4b4d9' : '#e6007e', 'gti-bank': theme === 'dark' ? '#ffd0cc' : '#ad1b16', 'gti-foundation': theme === 'dark' ? '#ffe5a3' : '#b27200', 'sao-pay': theme === 'dark' ? '#e4aa34' : '#171717', ais: '#1b1b1b', 'job-connectz': '#910000', ael: theme === 'dark' ? '#ffffff' : '#211c55', gcpcl: theme === 'dark' ? '#bd963c' : '#111111' };
  const brandColour = brandPrimaryColours[selectedSubsidiary?.id];
  const roleColour = brandColour || (isSubsidiaryFlyer ? (theme === 'dark' ? '#ffffff' : '#171717') : '#e4aa34');
  // Preserve multi-colour marks in exported flyers instead of flattening them
  // to a single theme colour.
  const preserveOriginalLogo = ['gcpcl', 'gti-properties', 'gnrl', 'gti-switch', 'passmall', 'pass', 'gt-invest', 'gti-telecom', 'gti-bank', 'gti-foundation', 'sao-pay'].includes(selectedSubsidiary?.id);
  const subsidiaryExportColour = selectedSubsidiary?.id === 'sao-pay' && theme === 'dark' ? '#e4aa34' : (preserveOriginalLogo ? undefined : roleColour);
  const waveLines = isSubsidiaryFlyer ? createBrandWaveLines(roleColour, theme === 'dark' ? '#ffffff' : '#171717') : (theme === 'dark' ? blackWaveLines.src : yellowWaveLines.src);
  const dotTexture = createDotTexture(brandDotColours[selectedSubsidiary?.id] || roleColour);
  const handlePhotoPointerDown = (event) => {
    if (event.button !== 0) return;
    const frame = event.currentTarget.getBoundingClientRect();
    saveHistory();
    dragRef.current = { startX: event.clientX, startY: event.clientY, offset: photoCropOffset, frame };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDraggingPhoto(true);
  };
  const handlePhotoPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    const maxX = drag.frame.width * (photoZoom / 100 - 1) / 2;
    const maxY = drag.frame.height * (photoZoom / 100 - 1) / 2;
    setPhotoCropOffset({
      x: Math.round(Math.min(maxX, Math.max(-maxX, drag.offset.x + deltaX))),
      y: Math.round(Math.min(maxY, Math.max(-maxY, drag.offset.y + deltaY))),
    });
  };
  const handlePhotoPointerEnd = () => {
    dragRef.current = null;
    setIsDraggingPhoto(false);
  };

  return <article className={`ecard template-card theme-${theme} brand-${selectedSubsidiary?.id || 'gti-holdings'} ${isSubsidiaryFlyer ? 'brand-subsidiary' : ''} align-${textAlign} ${photo ? 'has-photo' : ''}`} id="ecard" aria-label="E-card preview" style={{ '--photo-size': `${photoSize}%`, '--role-color': roleColour }}>
    <div className="card-texture"><img src={dotTexture} alt="" aria-hidden="true" /></div><div className="shape shape-a" /><div className="shape shape-b" /><div className="confetti one" /><div className="confetti two" /><div className="confetti three" />
    <div className="balloon balloon-one" aria-hidden="true" /><div className="balloon balloon-two" aria-hidden="true" />
    {showHoldingLogo && <div className="card-logo-wrap"><img className="card-logo default-card-logo" src={defaultLogo.src} alt="GTI Holding" data-export-color={theme === 'dark' ? '#e4aa34' : '#171717'} /></div>}
    {showSubsidiaryLogo && <div className={`subsidiary-logo-wrap ${isSaoPay ? 'sao-pay-logo-wrap' : ''}`}>
      {selectedSubsidiary?.logo ? <img src={selectedSubsidiary.logo.src} alt={selectedSubsidiary.name} data-export-color={subsidiaryExportColour} /> : subsidiaryLogo ? <img src={subsidiaryLogo} alt="Subsidiary logo" data-export-color={subsidiaryExportColour} /> : <div className="subsidiary-wordmark" aria-label={selectedSubsidiary.name}><strong>{selectedSubsidiary.mark}</strong>{selectedSubsidiary.label && <span>{selectedSubsidiary.label}</span>}</div>}
    </div>}
    <div className="card-copy">
      <p className="eyebrow-card">{active.celebration}</p>
      <h2 style={{ fontSize: `clamp(${35 * headingSize / 100}px, ${5.3 * headingSize / 100}vw, ${59 * headingSize / 100}px)` }}>{active.heading[0]}<br /><em>{active.heading[1]}</em></h2>
      <p className="card-message" style={{ fontSize: `${9 + (textSize - 80) * 0.095}px` }}>{cardMessage}</p>
      <p className="signature"><span>{cardCopy[details.language].signature}</span><br /><strong>{details.from.trim() || 'Your GTI Family'}</strong></p>
    </div>
    {photo && <div className={`photo-frame position-${photoPosition} ${isDraggingPhoto ? 'is-dragging' : ''}`}>
      <div className="photo-image-wrap" onPointerDown={handlePhotoPointerDown} onPointerMove={handlePhotoPointerMove} onPointerUp={handlePhotoPointerEnd} onPointerCancel={handlePhotoPointerEnd}><img src={photo} alt="Recipient" style={{ transform: `translate(${photoCropOffset.x}px, ${photoCropOffset.y}px) scale(${photoZoom / 100})` }} /></div>
      <div className={`profile-card-details identity-${identityAlign}`} style={{ textAlign: identityAlign }}><div className="profile-name-row"><p className="profile-first-name" style={{ fontSize: `clamp(${7 * identityScale}px, ${.9 * identityScale}vw, ${11 * identityScale}px)` }}>{(details.firstName.trim() || 'A wonderful colleague').toUpperCase()}</p>{details.lastName?.trim() && <p className="profile-last-name" style={{ fontSize: `clamp(${10 * identityScale}px, ${1.35 * identityScale}vw, ${17 * identityScale}px)` }}>{details.lastName.trim()}</p>}</div><span style={{ fontSize: `clamp(${4.5 * identityScale}px, ${.62 * identityScale}vw, ${7.5 * identityScale}px)` }}>{(details.team.trim() || subsidiaryName).toUpperCase()}</span></div>
    </div>}
    <img className="wave-lines" src={waveLines} alt="" aria-hidden="true" />
    {!photo && <div className={`identity-block identity-${identityAlign}`} style={{ textAlign: identityAlign }}><div className="identity-name-row"><p className="person-name" style={{ fontSize: `clamp(${6 * identityScale}px, ${.85 * identityScale}vw, ${10 * identityScale}px)` }}>{(details.firstName.trim() || 'A wonderful colleague').toUpperCase()}</p>{details.lastName?.trim() && <p className="person-surname" style={{ fontSize: `clamp(${23 * identityScale}px, ${3.9 * identityScale}vw, ${44 * identityScale}px)` }}>{details.lastName.trim()}</p>}</div><p className="team-name" style={{ fontSize: `clamp(${8 * identityScale}px, ${1 * identityScale}vw, ${12 * identityScale}px)` }}>{(details.team.trim() || subsidiaryName).toUpperCase()}</p></div>}
    <p className="card-footer">{activeCopy.footer}</p>
  </article>;
}
