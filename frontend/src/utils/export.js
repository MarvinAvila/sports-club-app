import * as XLSX from 'xlsx';

export function exportToExcel(data) {
  console.log("Intentando exportar datos:", data);

  // Si no hay datos, crear un archivo con solo los encabezados
  if (!data || data.length === 0) {
    console.warn("No hay datos para exportar. Se generará un archivo vacío con encabezados.");
    data = [{ Alumno: "", Deporte: "", Temporada: "", Estado: "" }];
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Alumnos');
  XLSX.writeFile(workbook, 'alumnos.xlsx');

  console.log("Archivo Excel generado exitosamente.");
}