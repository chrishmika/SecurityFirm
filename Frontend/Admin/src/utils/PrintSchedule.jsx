/* eslint-disable react/prop-types */
const PrintSchedule = ({ dutydata }) => {
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
                schedule: {},
                totalShifts: 0,
              };
            }

            // Determine what to show in the cell based on time and shift
            let cellText = "";
            if (duty.time && duty.shift) {
              cellText = `${duty.time}(${duty.shift})`;
            } else if (duty.time) {
              cellText = duty.time;
            } else if (duty.shift) {
              cellText = `${duty.shift}h`;
            } else {
              cellText = "S"; // Fallback to 'S' for Scheduled
            }

            employeeMap[empName].schedule[duty.day] = cellText;
            employeeMap[empName].totalShifts += 1;
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
              dayCells += `<td>${emp.schedule[i] || ""}</td>`;
            }

            return `
              <tr>
                <td style="white-space: nowrap; text-align: left; padding-left: 5px;">${emp.name}</td>
                <td>${emp.position}</td>
                ${dayCells}
                <td style="font-weight: bold; background-color: #e6f7ff;">${emp.totalShifts}</td>
              </tr>
            `;
          })
          .join("");

        return `
          <div style="page-break-after: always; font-family: sans-serif;">
            <h2 style="text-align: center; color: #333; margin-bottom: 5px;">${companyName}</h2>
            <h4 style="text-align: center; color: #666; margin-top: 0;">Monthly Schedule: ${monthYear}</h4>

            <table border="1" cellspacing="0" cellpadding="3" style="width: 100%; border-collapse: collapse; font-size: 11px; text-align: center; margin-top: 15px;">
              <thead style="background-color: #f2f2f2;">
                <tr>
                  <th style="text-align: left; padding-left: 5px;">Employee Name</th>
                  <th>Position</th>
                  ${dayHeaders}
                  <th>Total Shifts</th>
                </tr>
              </thead>
              <tbody>
                ${rows.length > 0 ? rows : '<tr><td colspan="34" style="padding: 10px;">No schedule records found</td></tr>'}
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
          <title>Print Schedule</title>
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
      className="bg-blue-400 text-white px-4 py-1 rounded-3xl p-3.5  hover:bg-blue-500 cursor-pointer mt-4   ">
      Print Schedule
    </button>
  );
};

export default PrintSchedule;
