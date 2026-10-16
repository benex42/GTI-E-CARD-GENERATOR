function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Image creation failed'))), type, quality));
}

function waitForImages(element) {
  return Promise.all([...element.querySelectorAll('img')].map((image) => {
    if (image.complete) return Promise.resolve();
    return new Promise((resolve) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    });
  }));
}

function waitForImage(image) {
  if (image.complete && image.naturalWidth) return Promise.resolve();
  return new Promise((resolve) => {
    image.addEventListener('load', resolve, { once: true });
    image.addEventListener('error', resolve, { once: true });
  });
}

function colourLogo(image, colour) {
  return new Promise((resolve) => {
    const source = image.currentSrc || image.src;
    const logo = new Image();
    logo.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = logo.naturalWidth;
        canvas.height = logo.naturalHeight;
        const context = canvas.getContext('2d');
        context.drawImage(logo, 0, 0);
        // Preserve the original transparency while applying the exact GTI theme colour.
        context.globalCompositeOperation = 'source-in';
        context.fillStyle = colour;
        context.fillRect(0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/png'));
      } catch {
        resolve(null);
      }
    };
    logo.onerror = () => resolve(null);
    logo.src = source;
  });
}

async function prepareThemeLogos(card) {
  const cleanups = [];
  const logos = [...card.querySelectorAll('img[data-export-color]')];
  await Promise.all(logos.map(async (logo) => {
    const replacement = await colourLogo(logo, logo.dataset.exportColor);
    if (!replacement) return;
    const source = logo.src;
    const filter = logo.style.filter;
    logo.src = replacement;
    // html2canvas does not consistently include CSS filters. The pixels are now
    // already colour-correct, so disable the screen-only filter for this capture.
    logo.style.filter = 'none';
    await waitForImage(logo);
    cleanups.push(() => { logo.src = source; logo.style.filter = filter; });
  }));
  return () => cleanups.forEach((cleanup) => cleanup());
}

function joinBytes(chunks) {
  const output = new Uint8Array(chunks.reduce((total, chunk) => total + chunk.length, 0));
  let offset = 0;
  chunks.forEach((chunk) => { output.set(chunk, offset); offset += chunk.length; });
  return output;
}

function canvasToPdfBlob(canvas) {
  const encoder = new TextEncoder();
  const text = (value) => encoder.encode(value);
  const jpeg = Uint8Array.from(atob(canvas.toDataURL('image/jpeg', 0.96).split(',')[1]), (character) => character.charCodeAt(0));
  const pageWidth = Math.max(1, Math.round((canvas.width / 3) * 0.75));
  const pageHeight = Math.max(1, Math.round((canvas.height / 3) * 0.75));
  const content = text(`q\n${pageWidth} 0 0 ${pageHeight} 0 0 cm\n/Im0 Do\nQ\n`);
  const image = joinBytes([text(`5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`), jpeg, text('\nendstream\nendobj\n')]);
  const objects = [text('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n'), text('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n'), text(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /ProcSet [/PDF /ImageC] /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>\nendobj\n`), joinBytes([text(`4 0 obj\n<< /Length ${content.length} >>\nstream\n`), content, text('endstream\nendobj\n')]), image];
  const header = text('%PDF-1.3\n%GTI\n');
  const chunks = [header]; const offsets = [0]; let length = header.length;
  objects.forEach((object) => { offsets.push(length); chunks.push(object); length += object.length; });
  chunks.push(text(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${length}\n%%EOF`));
  return new Blob(chunks, { type: 'application/pdf' });
}

export async function downloadCard(format, firstName) {
  const card = document.getElementById('ecard');
  if (!card) throw new Error('Card preview not found');
  await document.fonts?.ready;
  await waitForImages(card);
  const restoreThemeLogos = await prepareThemeLogos(card);
  let canvas;
  try {
    const html2canvas = (await import('html2canvas')).default;
    canvas = await html2canvas(card, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
      logging: false
    });
  } finally {
    restoreThemeLogos();
  }
  const name = firstName.trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'gti-card';
  if (format === 'pdf') downloadBlob(canvasToPdfBlob(canvas), `GTI-e-card-${name}.pdf`);
  else {
    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    downloadBlob(await canvasToBlob(canvas, mimeType, 0.96), `GTI-e-card-${name}.${format}`);
  }
}
