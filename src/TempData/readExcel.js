import * as XLSX from 'xlsx';

export const readExcelFile = async () => {
  try {
    const response = await fetch('./Cbse_Chapters.xlsx');
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });

    const classData = {};

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const className = sheetName.replace('Class_', '').trim();

      const subjects = jsonData[0];
      classData[className] = subjects.map((subject, idx) => {
        const topics = jsonData.slice(1).map(row => row[idx]).filter(topic => topic);
        return {
          id: idx + 1,
          name: subject,
          topics: topics,
        };
      });
    });

    console.log('Parsed class data:', classData);
    return classData;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return {};
  }
};