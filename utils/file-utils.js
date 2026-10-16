export function fileToDataUrl(file, onLoad) {
  if (!file?.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = (event) => onLoad(event.target.result);
  reader.readAsDataURL(file);
}
