// jsPDF and xlsx are fairly large libraries (jsPDF pulls in html2canvas).
// They're dynamically imported here so they only load when an export button
// is actually clicked, instead of being bundled into every admin page.

export async function exportRowsToExcel(filename: string, headers: string[], rows: (string | number)[][]) {
  const XLSX = await import("xlsx");
  const sheetData = [headers, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

export async function exportRowsToPDF(filename: string, headers: string[], rows: (string | number)[][], title?: string) {
  const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);
  const doc = new jsPDF();
  if (title) {
    doc.setFontSize(14);
    doc.text(title, 14, 15);
  }
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: title ? 22 : 12,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [4, 83, 92] },
  });
  doc.save(`${filename}.pdf`);
}
