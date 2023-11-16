export async function toPDF(element, name) {
  if (import.meta.env.SSR) {
    console.error('html2pdf.js no está disponible en el entorno actual');
    return;
  }

  const { default: html2pdf } = await import('html2pdf.js');

  let opt = {
    margin: 0.5,
    filename: `${name}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 3 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
}
