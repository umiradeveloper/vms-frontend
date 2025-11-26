

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default ExportToExcel = (data, fileName) => {
  // 1. Convert JSON → worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // 2. Create workbook & append worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // 3. Export to Excel file
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // 4. Save file
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${fileName}.xlsx`);
};