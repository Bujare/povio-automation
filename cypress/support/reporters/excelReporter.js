const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

class ExcelReporter {
  constructor() {
    this.testResults = [];
  }

  addTestResult(testData) {
    this.testResults.push({
      'Category': testData.suite || 'Unknown',
      'Test Name': testData.title,
      'Result': testData.status,
      'Time': `${(testData.duration / 1000).toFixed(2)}s`,
      'File': testData.testFile || 'Unknown',
      'Error': testData.error?.message || ''
    });
  }

  generateReport() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(this.testResults);
    
    this.applyBasicStyling(ws);
    
    XLSX.utils.book_append_sheet(wb, ws, 'Test Results');
    
    const reportPath = path.join(process.cwd(), 'cypress', 'reports', 'test-report.xlsx');
    const reportsDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    XLSX.writeFile(wb, reportPath);
    console.log(`📊 Excel report: ${reportPath}`);
    return reportPath;
  }

  applyBasicStyling(worksheet) {
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    
    worksheet['!cols'] = [
      { width: 20 }, // Category
      { width: 60 }, // Test Name  
      { width: 15 }, // Result
      { width: 12 }, // Time
      { width: 25 }, // File
      { width: 50 }  // Error
    ];

    for (let col = range.s.c; col <= range.e.c; col++) {
      const headerCell = XLSX.utils.encode_cell({ r: 0, c: col });
      if (worksheet[headerCell]) {
        worksheet[headerCell].s = {
          font: { bold: true, size: 12 },
          fill: { fgColor: { rgb: "D3D3D3" } },
          alignment: { horizontal: "center" }
        };
      }
    }

    for (let row = range.s.r + 1; row <= range.e.r; row++) {
      const resultCell = XLSX.utils.encode_cell({ r: row, c: 2 }); 
      if (worksheet[resultCell]) {
        const status = worksheet[resultCell].v;
        let bgColor = "FFFFFF";
        
        if (status === 'passed') bgColor = "E8F5E8";
        else if (status === 'failed') bgColor = "FFE8E8";
        
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          if (worksheet[cellAddress]) {
            worksheet[cellAddress].s = { fill: { fgColor: { rgb: bgColor } } };
          }
        }
      }
    }
  }
}

module.exports = { ExcelReporter };
