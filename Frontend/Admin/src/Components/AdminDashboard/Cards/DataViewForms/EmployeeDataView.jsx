/* eslint-disable react/prop-types */
import profilePic from "../../../../assets/boy1.png";

const EmployeeDataView = ({ data }) => {
  const files = [
    { label: "File 1", url: "/files/file1.pdf" },
    { label: "File 2", url: "/files/image2.png" },
    { label: "File 3", url: "/files/document3.docx" },
  ];

  console.log("employeedata data side");
  console.log("employeedata", data);

  return (
    <main className="flex h-screen bg-white p-4 gap-2 text-sm text-gray-800 font-medium">
      {/* Left Column */}
      <aside className="w-1/3 flex flex-col items-end p-2 space-y-4 overflow-hidden">
        <div className="w-full max-w-[280px] text-left">
          <img
            src={profilePic}
            alt="Profile of Shehan Krismika"
            className="w-28 h-28 rounded-full object-cover border-2 border-blue-500 shadow mb-4"
          />

          <address className="not-italic space-y-1 mb-4">
            <p>hi@gmail.com</p>
            <p>+94 123456789</p>
            <p>Colombo</p>
          </address>

          <div className="space-y-4 w-full">
            <Info label="Employee Number" value="EP656565" />
            <Info label="Full Name" value="Shehan Krismika" />
            <Info label="Name with Initials" value="P. P Shehan Krismika" />
            <Info label="NIC" value="200018701528" />
            <Info label="Gender" value="Male" />

            <div className="flex gap-6">
              <Info label="ETF" value="sp5645" />
              <Info label="EPF" value="pt45485" />
            </div>

            <Info label="Birthday" value="2001/09/25" />
            <Info label="Address" value="Angoda road, Gampaha" />

            <div className="flex gap-6">
              <Info label="Contact 1" value="+94 123456789" />
              <Info label="Contact 2" value="+94 987654321" />
            </div>

            <Info label="Citizenship" value="Sri Lankan" />
          </div>
        </div>
      </aside>

      {/* Middle Column */}
      <section className="w-1/3 p-4 space-y-6 overflow-hidden">
        <header>
          <h1 className="text-2xl font-bold text-blue-900">{data?.name}</h1>
          <p className="text-gray-600">{data?.position}</p>
        </header>

        {/* EXPERIENCE */}
        <section>
          <h2 className="text-sm font-semibold mb-2">EXPERIENCE</h2>

          <Detail
            title="Military"
            content="Served in the armed forces for several years with experience in field operations, security coordination, and discipline under high-pressure environments."
          />

          <Detail
            title="Gun Handling"
            content="Proficient in safe and effective use of firearms including rifles and handguns. Trained in tactical positioning, target identification, and controlled response."
          />
        </section>

        {/* SPECIAL DETAILS */}
        <section>
          <h2 className="text-sm font-semibold mb-2">SPECIAL DETAILS</h2>

          <Detail
            title="Disabilities"
            content="No physical or mental disabilities reported. Fully fit for duty and capable of performing physical tasks required in high-security roles."
          />

          <Detail
            title="Description"
            content="Dedicated and disciplined professional with a strong background in military operations, threat assessment, and team coordination. Committed to ensuring safety, security, and reliability in all tasks assigned."
          />
        </section>
      </section>

      {/* Right Column */}
      <aside className="w-1/3 p-4 overflow-hidden">
        <section className="mt-8">
          <h2 className="text-sm font-semibold">EMERGENCY</h2>

          <div className="mt-12 space-y-6">
            <Info label="Name" value="Asanka Kavinda" />
            <Info label="Address" value="No 938/35 KKS road, Jaffna" />
            <Info label="Contacts" value="+94 456123789" />
          </div>

          {/* Uploaded Files Section */}
          <section className="mt-10">
            <h3 className="text-sm font-semibold mb-4">Files</h3>

            <ul className="flex gap-8 text-gray-700">
              {files.map((file) => (
                <li key={file.label} className="flex flex-col items-center">
                  <a
                    href={file.url}
                    download
                    className="flex flex-col items-center text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 mb-1 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 21h10a2 2 0 002-2V7l-5-5H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    {file.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </aside>
    </main>
  );
};

// Reusable components
const Info = ({ label, value }) => (
  <div>
    <p className="font-semibold mb-1">{label}</p>
    <p>{value}</p>
  </div>
);

const Detail = ({ title, content }) => (
  <div className="mb-4">
    <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-xs text-gray-600 leading-tight">{content}</p>
  </div>
);

export default EmployeeDataView;
