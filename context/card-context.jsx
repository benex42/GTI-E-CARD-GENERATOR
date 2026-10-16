'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { cardCopy } from '../lib/card-copy';

const CardContext = createContext(null);

export function CardProvider({ children }) {
  const [details, setDetails] = useState({ language: 'en', firstName: 'Ama', lastName: 'Mensah', team: 'Operations', occasion: 'welcome', from: 'Your GTI Family', subsidiary: '' });
  const [message, setMessage] = useState(cardCopy.en.welcome.message);
  const [messageEdited, setMessageEdited] = useState(false);
  const [theme, setTheme] = useState('yellow');
  const [textAlign, setTextAlign] = useState('left');
  const [headingSize, setHeadingSize] = useState(100);
  const [textSize, setTextSize] = useState(100);
  const [identitySize, setIdentitySize] = useState(100);
  const [identityAlign, setIdentityAlign] = useState('left');
  const [photo, setPhoto] = useState(null);
  const [subsidiaryLogo, setSubsidiaryLogo] = useState(null);
  const [photoSize, setPhotoSize] = useState(47);
  const [photoZoom, setPhotoZoom] = useState(100);
  const [photoPosition, setPhotoPosition] = useState('center');
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const active = useMemo(() => cardCopy[details.language][details.occasion], [details.language, details.occasion]);
  const updateDetail = (key, value) => setDetails((current) => ({ ...current, [key]: value }));
  const changeLanguage = (value) => {
    updateDetail('language', value);
    if (!messageEdited) setMessage(cardCopy[value][details.occasion].message);
  };
  const changeOccasion = (value) => {
    updateDetail('occasion', value);
    setMessageEdited(false);
    setMessage(cardCopy[details.language][value].message);
  };
  const saveHistory = () => {
    setHistory((current) => [...current.slice(-24), { theme, textAlign, headingSize, textSize, message, messageEdited, photo, subsidiaryLogo, photoSize, photoZoom, photoPosition, identitySize, identityAlign }]);
  };
  const undoDesign = () => {
    const snapshot = history.at(-1);
    if (!snapshot) return;
    setTheme(snapshot.theme); setTextAlign(snapshot.textAlign); setHeadingSize(snapshot.headingSize); setTextSize(snapshot.textSize);
    setMessage(snapshot.message); setMessageEdited(snapshot.messageEdited); setPhoto(snapshot.photo); setSubsidiaryLogo(snapshot.subsidiaryLogo);
    setPhotoSize(snapshot.photoSize); setPhotoZoom(snapshot.photoZoom); setPhotoPosition(snapshot.photoPosition);
    setIdentitySize(snapshot.identitySize); setIdentityAlign(snapshot.identityAlign);
    setHistory((current) => current.slice(0, -1));
  };

  const value = { details, message, setMessage, messageEdited, setMessageEdited, theme, setTheme, textAlign, setTextAlign, headingSize, setHeadingSize, textSize, setTextSize, identitySize, setIdentitySize, identityAlign, setIdentityAlign, photo, setPhoto, subsidiaryLogo, setSubsidiaryLogo, photoSize, setPhotoSize, photoZoom, setPhotoZoom, photoPosition, setPhotoPosition, history, darkMode, setDarkMode, active, updateDetail, changeLanguage, changeOccasion, saveHistory, undoDesign };
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

export function useCard() {
  const context = useContext(CardContext);
  if (!context) throw new Error('useCard must be used inside CardProvider');
  return context;
}
