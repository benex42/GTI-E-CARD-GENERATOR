'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCard } from '../context/card-context';
import { subsidiaries } from '../lib/subsidiaries';

export default function DetailsForm() {
  const router = useRouter();
  const { details, updateDetail, changeLanguage, changeOccasion } = useCard();
  const [formError, setFormError] = useState(false);
  const openStudio = (event) => {
    event.preventDefault();
    if (!details.firstName.trim() || !details.lastName.trim()) { setFormError(true); return; }
    setFormError(false);
    router.push('/design');
  };

  return <section className="onboarding screen active">
    <div className="onboarding-copy"><p className="kicker">GTI HOLDING · PEOPLE &amp; CULTURE</p><h1>A thoughtful card<br />starts with <em>them.</em></h1><p>Set up your e-card in a moment, then make it feel personal in the design studio.</p></div>
    <form className="setup-card" onSubmit={openStudio} noValidate>
      <div className="form-heading"><p>STEP 01</p><h2>Employee details</h2><span>Tell us which employee you are celebrating.</span></div>
      <div className="form-grid">
        <label className="field full"><span>Card language</span><select value={details.language} onChange={(event) => changeLanguage(event.target.value)}><option value="en">English</option><option value="fr">Français</option><option value="pt">Português</option></select></label>
        <label className="field full"><span>Subsidiary</span><select value={details.subsidiary} onChange={(event) => updateDetail('subsidiary', event.target.value)}><option value="">Select a subsidiary</option>{subsidiaries.map((subsidiary) => <option key={subsidiary.id} value={subsidiary.id}>{subsidiary.name}</option>)}</select></label>
        <label className="field"><span>First name</span><input required maxLength="30" value={details.firstName} onChange={(event) => updateDetail('firstName', event.target.value)} /></label>
        <label className="field"><span>Last name</span><input required maxLength="30" value={details.lastName} onChange={(event) => updateDetail('lastName', event.target.value)} /></label>
        <label className="field"><span>Role / Department</span><input maxLength="45" value={details.team} onChange={(event) => updateDetail('team', event.target.value)} /></label>
        <label className="field"><span>Occasion</span><select value={details.occasion} onChange={(event) => changeOccasion(event.target.value)}><option value="welcome">Welcome on Board</option><option value="anniversary">Work Anniversary</option><option value="celebration">Celebration</option></select></label>
        <label className="field"><span>From</span><input maxLength="45" value={details.from} onChange={(event) => updateDetail('from', event.target.value)} /></label>
      </div>
      <p className={`form-error ${formError ? 'show' : ''}`} role="alert">Please enter the employee&apos;s first and last names.</p>
      <button className="primary-button" type="submit">Continue to design <span>→</span></button>
    </form>
  </section>;
}
