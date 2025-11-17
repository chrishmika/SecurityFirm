/* eslint-disable react/prop-types */
import profilePic from "../assets/boy1.png";

const PrintCompanyData = ({ data }) => {
  const handlePrint = () => {
    console.log(data);
    if (!data) return;

    const tableRows = Array.isArray(data.count)
      ? data.count
          .map(
            (req) => `
      <tr style="border: 1px solid #ddd; text-align:center;">
        <td style="padding: 8px;">${req.position || "-"}</td>
        <td style="padding: 8px;">${req.amount || "-"} Person</td>
      </tr>`
          )
          .join("")
      : "";

    const printHTML = `
      <html>
  <head>
    <title>${data.name || "Company Details"}</title>
    <style>
      /* Base Styles */
      body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        margin: 20px;
        background-color: #f9fafb;
        color: #111827;
      }

      h1 {
        color: #1D4ED8;
        font-size: 2rem;
        margin-bottom: 10px;
      }

      h2 {
        color: #1E3A8A;
        font-size: 1.25rem;
        margin-top: 20px;
        margin-bottom: 10px;
        border-bottom: 2px solid #e5e7eb;
        padding-bottom: 5px;
      }

      .section {
        background-color: #ffffff;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
      }

      p {
        margin: 4px 0;
        font-size: 0.95rem;
      }

      table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        border-radius: 10px;
        overflow: hidden;
        margin-top: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }

      th, td {
        padding: 12px 15px;
        text-align: center;
      }

      th {
        background-color: #e0f2fe;
        color: #1E3A8A;
        font-weight: 600;
      }

      tr:nth-child(odd) {
        background-color: #f9fafb;
      }

      tr:nth-child(even) {
        background-color: #ffffff;
      }

      /* Optional: small spacing for the table */
      tbody tr td {
        border-bottom: 1px solid #e5e7eb;
      }

      /* Responsive for printing */
      @media print {
        body {
          background-color: #ffffff;
          color: #111827;
        }
        .section {
          box-shadow: none;
          page-break-inside: avoid;
        }
        table {
          box-shadow: none;
        }
      }
    </style>
  </head>

  <body>
      <img src=${data.img || profilePic} alt="profile image" width="200px"/>

    <h1>${data.name || "-"}</h1>

    <div class="section">
      <h2>Contact Information</h2>
      <p>Email: ${data.companyEmail || "-"}</p>
      <p>Mobile: ${data.companyMobile || "-"}</p>
      <p>Address: ${data.address || "-"}</p>
    </div>

    <div class="section">
      <h2>Coordinates</h2>
      <p>Longitude: ${data.longitude || "-"}</p>
      <p>Latitude: ${data.latitude || "-"}</p>
    </div>

    <div class="section">
      <h2>Contract Period</h2>
      <p>From: ${data.contractPeriod?.[0]?.from || "-"}</p>
      <p>To: ${data.contractPeriod?.[0]?.to || "-"}</p>
    </div>

    <div class="section">
      <h2>Requirement Count</h2>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Company Representative</h2>
      <p>Name: ${data.agent || "-"}</p>
      <p>NIC: ${data.agentNIC || "-"}</p>
      <p>Contact 1: ${data.agentContact1 || "-"}</p>
      <p>Contact 2: ${data.agentContact2 || "-"}</p>
    </div>
  </body>
</html>

    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printHTML);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="rounded-lg text-white hover:cursor-pointer hover:bg-blue-600 py-2 px-4 bg-blue-400 ">
      Print Details
    </button>
  );
};

export default PrintCompanyData;
