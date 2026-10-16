import CardPreview from '../../components/card-preview';
import DesignControls from '../../components/design-controls';

export default function DesignPage() {
  return <section className="studio screen active design-screen"><DesignControls /><section className="preview-panel"><header className="preview-header"><span>LIVE PREVIEW</span></header><div className="preview-area"><CardPreview /></div><p className="preview-hint">Changes are saved in your preview as you work.</p></section></section>;
}
