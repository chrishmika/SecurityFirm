/* eslint-disable react/prop-types */
const PrintAttendance = ({ dutydata }) => {
  const handlePrint = () => {
    if (!Array.isArray(dutydata)) return;

    let tableHTML = dutydata
      .map((sheet) => {
        const companyName = sheet.company?.name || "Unknown Company";
        const monthYear = `${sheet.month || ""} - ${sheet.year || ""}`;

        // Group duties by employee
        const employeeMap = {};

        if (Array.isArray(sheet.duties)) {
          sheet.duties.forEach((duty) => {
            const empName = duty.employee?.name || "Not Assigned";
            if (!employeeMap[empName]) {
              employeeMap[empName] = {
                name: empName,
                position: duty.position || "-",
                attendance: {},
                present: 0,
                absent: 0,
                late: 0,
              };
            }

            let statusChar = "";
            if (duty.status === "present") {
              statusChar = "P";
              employeeMap[empName].present += 1;
            } else if (duty.status === "absent") {
              statusChar = "A";
              employeeMap[empName].absent += 1;
            } else if (duty.status === "late") {
              statusChar = "L";
              employeeMap[empName].late += 1;
            } else {
              statusChar = "-";
            }

            employeeMap[empName].attendance[duty.day] = statusChar;
          });
        }

        const employees = Object.values(employeeMap);

        // Generate headers for days 1-31
        let dayHeaders = "";
        for (let i = 1; i <= 31; i++) {
          dayHeaders += `<th>${i}</th>`;
        }

        const rows = employees
          .map((emp) => {
            let dayCells = "";
            for (let i = 1; i <= 31; i++) {
              dayCells += `<td>${emp.attendance[i] || ""}</td>`;
            }

            return `
              <tr>
                <td style="white-space: nowrap; text-align: left; padding-left: 5px;">${emp.name}</td>
                <td>${emp.position}</td>
                ${dayCells}
                <td style="font-weight: bold; background-color: #e6ffe6;">${emp.present}</td>
                <td style="font-weight: bold; background-color: #ffe6e6;">${emp.absent}</td>
                <td style="font-weight: bold; background-color: #ffffe6;">${emp.late}</td>
              </tr>
            `;
          })
          .join("");

        return `
          <div style="page-break-after: always; font-family: sans-serif;">
            <h2 style="text-align: center; color: #333; margin-bottom: 5px;">${companyName}</h2>
            <h4 style="text-align: center; color: #666; margin-top: 0;">Attendance Report: ${monthYear}</h4>
            
            <div style="margin-bottom: 10px; font-size: 13px; display: flex; justify-content: center; gap: 20px;">
              <span><strong>P:</strong> Present</span>
              <span><strong>A:</strong> Absent</span>
              <span><strong>L:</strong> Late</span>
            </div>

            <table border="1" cellspacing="0" cellpadding="3" style="width: 100%; border-collapse: collapse; font-size: 11px; text-align: center;">
              <thead style="background-color: #f2f2f2;">
                <tr>
                  <th style="text-align: left; padding-left: 5px;">Employee Name</th>
                  <th>Position</th>
                  ${dayHeaders}
                  <th>P</th>
                  <th>A</th>
                  <th>L</th>
                </tr>
              </thead>
              <tbody>
                ${rows.length > 0 ? rows : '<tr><td colspan="36" style="padding: 10px;">No attendance records found</td></tr>'}
              </tbody>
            </table>
          </div>
        `;
      })
      .join("");

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Attendance Report</title>
          <style>
            @media print {
              @page { size: landscape; margin: 10mm; }
              body { -webkit-print-color-adjust: exact; color-adjust: exact; }
            }
            body { font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          ${tableHTML}
          <script>
            window.onload = function() { setTimeout(() => { window.print(); window.close(); }, 250); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <button
      onClick={handlePrint}
      className="bg-blue-400 text-white px-4 py-2 rounded-3xl hover:bg-blue-500 cursor-pointer mt-4">
      Print Attendance
    </button>
  );
};

export default PrintAttendance;
