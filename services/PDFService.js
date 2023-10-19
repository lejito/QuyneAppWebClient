import html2pdf from 'html2pdf.js';

export function toPDF(element, name) {
  let opt = {
    margin: 0.5,
    filename: `${name}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 3 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
}