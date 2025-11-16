/* eslint-disable react/prop-types */
const PrintAttendance = ({ dutydata }) => {
  const handlePrint = () => {
    if (!Array.isArray(dutydata)) return;

    let tableHTML = dutydata
      .map((sheet) => {
        const companyName = sheet.company?.name || "Unknown Company";
        const monthYear = `${sheet.month || ""} - ${sheet.year || ""}`;

        // Sort duties safely
        const sortedDuties = Array.isArray(sheet.duties)
          ? [...sheet.duties].sort((a, b) => (a.day || 0) - (b.day || 0))
          : [];

        const rows = sortedDuties
          .map(
            (duty) => `
            <tr>
              <td>${duty.day || "-"}</td>
              <td>${duty.position || "-"}</td>
              <td>${duty.employee?.name || "-"}</td>
              <td>${duty.time || "-"}</td>
              <td>${duty.shift || "-"}</td>
              <td>${duty.checkIn?.split("T")[1]?.substring(0, 5) || "-"}</td>
              <td>${duty.checkOut?.split("T")[1]?.substring(0, 5) || "-"}</td>
              <td>${duty.remark || "-"}</td>
              <td>${duty.status || "-"}</td>
            </tr>
          `
          )
          .join("");

        return `
          <h3>${companyName} - ${monthYear}</h3>
          <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr>
                <th>Day</th>
                <th>Position</th>
                <th>Employee</th>
                <th>Start/Time</th>
                <th>Shift</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Remark</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        `;
      })
      .join("");

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<html><body>${tableHTML}</body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="bg-blue-400 text-white px-4 py-1 rounded-3xl p-3.5  hover:bg-blue-500 cursor-pointer mt-4   ">
      Print Attendance
    </button>
  );
};

export default PrintAttendance;
