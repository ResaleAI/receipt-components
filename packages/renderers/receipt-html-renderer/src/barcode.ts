import { BarcodeProps } from '@resaleai/receipt-ast';

async function renderBarcode(
  { data, width, standard, height }: BarcodeProps,
  children?: string[]
) {
  const fontSize = Number(width || 100) * 0.4;
  const transformScale = `scale(1, ${Number(height || 80) / 40})`;
  const marginTop = `${Number(height || 80) / 2}px`;
  if (standard === 4) {
    return `<p class="barcode-39" style="font-size: ${fontSize}; transform: ${transformScale}; margin: 0; margin-top: ${marginTop}">${data}</p>`;
  }

  // TODO: support other barcode standards
  return `<span>Barcode standard not supported</span>`;
}

export default renderBarcode;
