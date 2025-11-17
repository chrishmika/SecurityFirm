/* eslint-disable react/prop-types */

import profilePic from "../assets/boy1.png";

const PrintEmployeeData = ({ data }) => {
  const handlePrint = () => {
    if (!data) return;

    const printHTML = `<html>
  <head>
    <title>${data.name || "Employee Details"}</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
        background-color: #f7f9fc;
        color: #333;
        margin: 0;
        padding: 20px;
      }
      .report-container {
        max-width: 800px;
        margin: 20px auto;
        padding: 30px 40px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }
      h1 {
        color: #1d4ed8;
        border-bottom: 2px solid #e5e7eb;
        padding-bottom: 10px;
        margin-top: 0;
      }
      h2 {
        color: #1e3a8a;
        margin-top: 30px;
        margin-bottom: 15px;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
      }

      /* This is the 2-column grid for key-value pairs */
      dl {
        display: grid;
        grid-template-columns: 200px 1fr; /* Label column | Value column */
        gap: 12px 20px; /* Row gap | Column gap */
      }
      dt {
        font-weight: 600;
        color: #555;
        grid-column: 1;
      }
      dd {
        margin: 0;
        color: #111;
        grid-column: 2;
      }
    </style>
  </head>
  <body>
    <div class="report-container">
    <img src=${data.img || profilePic} alt="profile image" width="200px"/>
      <h1>${data.name || "Employee Details"}</h1>

      <section>
        <h2>Basic Information</h2>
        <dl>
          <dt>Employee Number</dt>
          <dd>${data.empId || "-"}</dd>

          <dt>Full Name</dt>
          <dd>${data.name || "-"}</dd>

          <dt>Name with Initials</dt>
          <dd>${data.initials || "-"}</dd>

          <dt>Address</dt>
          <dd>${data.address || "-"}</dd>

          <dt>Birthday</dt>
          <dd>${data.birthday?.split("T")[0] || "-"}</dd>

          <dt>Gender</dt>
          <dd>${data.sex || "-"}</dd>

          <dt>Contact 1</dt>
          <dd>${data.contact1 || "-"}</dd>

          <dt>Contact 2</dt>
          <dd>${data.contact2 || "-"}</dd>

          <dt>Citizenship</dt>
          <dd>${data.citizenship || "-"}</dd>

          <dt>Nationality</dt>
          <dd>${data.nationality || "-"}</dd>

          <dt>Marital Status</dt>
          <dd>${data.marital ? "Married" : "Single"}</dd>
        </dl>
      </section>

      <section>
        <h2>Work Details</h2>
        <dl>
          <dt>Position</dt>
          <dd>${data.position || "-"}</dd>

          <dt>ETF</dt>
          <dd>${data.ETF || "-"}</dd>

          <dt>EPF</dt>
          <dd>${data.EPF || "-"}</dd>

          <dt>Basic Salary</dt>
          <dd>Rs.${data.basicSalary || "-"}</dd>
        </dl>
      </section>

      <section>
        <h2>Experience</h2>
        <dl>
          <dt>Military Status</dt>
          <dd>${data.militaryStatus ? "Yes" : "No"}</dd>

          <dt>Military Details</dt>
          <dd>${data.militaryDescription || "-"}</dd>

          <dt>Special Abilities</dt>
          <dd>${data.specialAbilities || "-"}</dd>

          <dt>Gun Handling</dt>
          <dd>${data.gunHandling ? "Yes" : "No"}</dd>
        </dl>
      </section>

      <section>
        <h2>Special Details</h2>
        <dl>
          <dt>Description</dt>
          <dd>${data.description || "-"}</dd>
        </dl>
      </section>

      <section>
        <h2>Emergency Contact</h2>
        <dl>
          <dt>Name</dt>
          <dd>${data.emerganceyName || "-"}</dd>

          <dt>Address</dt>
          <dd>${data.emerganceyAddress || "-"}</dd>

          <dt>Contact</dt>
          <dd>${data.emerganceyContact || "-"}</dd>
        </dl>
      </section>
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

export default PrintEmployeeData;
