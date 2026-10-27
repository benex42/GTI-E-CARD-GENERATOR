'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { cardCopy, withSubsidiary } from '../lib/card-copy';
import { getSubsidiary } from '../lib/subsidiaries';

const CardContext = createContext(null);

export function CardProvider({ children }) {
  const [details, setDetails] = useState({ language: 'en', firstName: 'Ama', lastName: 'Mensah', team: 'Operations', occasion: 'welcome', from: 'Your GTI Family', subsidiary: '' });
  const [message, setMessage] = useState(withSubsidiary(cardCopy.en.welcome).message);
  const [messageEdited, setMessageEdited] = useState(false);
  const [theme, setTheme] = useState('light');
  const [textAlign, setTextAlign] = useState('left');
  const [headingSize, setHeadingSize] = useState(100);
  const [textSize, setTextSize] = useState(100);
  const [identitySize, setIdentitySize] = useState(100);
  const [identityAlign, setIdentityAlign] = useState('left');
  const [photo, setPhoto] = useState(null);
  const [subsidiaryLogo, setSubsidiaryLogo] = useState(null);
  const [photoSize, setPhotoSize] = useState(47);
  const [photoZoom, setPhotoZoom] = useState(110);
  const [photoPosition, setPhotoPosition] = useState('center');
  const [photoCropOffset, setPhotoCropOffset] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const active = useMemo(() => cardCopy[details.language][details.occasion], [details.language, details.occasion]);
  const subsidiaryName = (id = details.subsidiary) => getSubsidiary(id)?.name || 'GTI Holding';
  const updateDetail = (key, value) => {
    if (key === 'subsidiary' && !messageEdited) setMessage(withSubsidiary(cardCopy[details.language][details.occasion], subsidiaryName(value)).message);
    setDetails((current) => ({ ...current, [key]: value }));
  };
  const changeLanguage = (value) => {
    updateDetail('language', value);
    if (!messageEdited) setMessage(withSubsidiary(cardCopy[value][details.occasion], subsidiaryName()).message);
  };
  const changeOccasion = (value) => {
    updateDetail('occasion', value);
    setMessageEdited(false);
    setMessage(withSubsidiary(cardCopy[details.language][value], subsidiaryName()).message);
  };
  const saveHistory = () => {
    setHistory((current) => [...current.slice(-24), { theme, textAlign, headingSize, textSize, message, messageEdited, photo, subsidiaryLogo, photoSize, photoZoom, photoPosition, photoCropOffset, identitySize, identityAlign }]);
  };
  const undoDesign = () => {
    const snapshot = history.at(-1);
    if (!snapshot) return;
    setTheme(snapshot.theme); setTextAlign(snapshot.textAlign); setHeadingSize(snapshot.headingSize); setTextSize(snapshot.textSize);
    setMessage(snapshot.message); setMessageEdited(snapshot.messageEdited); setPhoto(snapshot.photo); setSubsidiaryLogo(snapshot.subsidiaryLogo);
    setPhotoSize(snapshot.photoSize); setPhotoZoom(snapshot.photoZoom); setPhotoPosition(snapshot.photoPosition); setPhotoCropOffset(snapshot.photoCropOffset || { x: 0, y: 0 });
    setIdentitySize(snapshot.identitySize); setIdentityAlign(snapshot.identityAlign);
    setHistory((current) => current.slice(0, -1));
  };

  const value = { details, message, setMessage, messageEdited, setMessageEdited, theme, setTheme, textAlign, setTextAlign, headingSize, setHeadingSize, textSize, setTextSize, identitySize, setIdentitySize, identityAlign, setIdentityAlign, photo, setPhoto, subsidiaryLogo, setSubsidiaryLogo, photoSize, setPhotoSize, photoZoom, setPhotoZoom, photoPosition, setPhotoPosition, photoCropOffset, setPhotoCropOffset, history, darkMode, setDarkMode, active, updateDetail, changeLanguage, changeOccasion, saveHistory, undoDesign };
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

export function useCard() {
  const context = useContext(CardContext);
  if (!context) throw new Error('useCard must be used inside CardProvider');
  return context;
}
