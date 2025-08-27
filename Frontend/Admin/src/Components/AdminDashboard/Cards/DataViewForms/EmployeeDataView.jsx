/* eslint-disable react/prop-types */
import profilePic from "../../../../assets/boy1.png";

const EmployeeDataView = ({ data }) => {
  const files = [
    { label: "CV", url: data?.cv },
    { label: "GS", url: data?.gsCertificate },
    { label: "NIC Copy", url: data?.NICCopy },
  ];

  return (
    <main className="flex h-screen bg-white p-4 gap-2 text-sm text-gray-800 font-medium">
      {/* Left Column */}
      <aside className="w-1/3 flex flex-col items-end p-2 space-y-4 overflow-hidden">
        <div className="w-full max-w-[280px] text-left">
          <img
            src={data?.img || profilePic}
            alt={`profile pic`}
            className="w-28 h-28 rounded-full object-cover border-2 border-blue-500 shadow mb-4"
          />

          <address className="not-italic space-y-1 mb-4">
            <p>{data?.email}</p>
            <p>{data?.contact1}</p>
            {/* ?<p>Colombo</p> */}
          </address>

          <div className="space-y-4 w-full">
            <Info label="Employee Number" value={data?.empId} />
            <Info label="Full Name" value={data?.name} />
            <Info label="Name with Initials" value={data?.initials} />
            <Info label="NIC" value={data?.NIC} />
            <Info label="Gender" value={data?.sex} />

            <div className="flex gap-6">
              <Info label="ETF" value={data?.ETF} />
              <Info label="EPF" value={data?.EPF} />
            </div>

            <Info label="Birthday" value={data?.birthday} />
            <Info label="Address" value={data?.address} />

            <div className="flex gap-6">
              <Info label="Contact 1" value={data?.contact1} />
              <Info label="Contact 2" value={data?.contact2} />
            </div>

            <Info label="Basic Salary" value={`Rs.${data?.basicSalary}`} />
            <Info label="Citizenship" value={data?.citizenship} />
            <Info label="Nationality" value={data?.nationality} />
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
          <Detail title="Military" content={data?.militaryDescription} />
          <Detail title="Special Abilities" content={data?.specialAbilities} />
        </section>

        {/* SPECIAL DETAILS */}
        <section>
          <h2 className="text-sm font-semibold mb-2">SPECIAL DETAILS</h2>

          <Detail title="Disabilities" content={data?.disabilities} />
          <Detail title="Description" content={data?.description} />
        </section>
      </section>

      {/* Right Column */}
      <aside className="w-1/3 p-4 overflow-hidden">
        <section className="mt-8">
          <h2 className="text-sm font-semibold">EMERGENCY</h2>

          <div className="mt-12 space-y-6">
            <Info label="Name" value={data?.emergancey[0].name} />
            <Info label="Address" value={data?.emergancey[0].address} />
            <Info label="Contacts" value={data?.emergancey[0].contact} />
          </div>

          {/* Uploaded Files Section */}
          <section className="mt-10">
            <h3 className="text-sm font-semibold mb-4">Files</h3>

            {/* <ul className="flex gap-8 text-gray-700">
              {files.map((file) => (
                <li key={file.label} className="flex flex-col items-center">
                  <a
                    href={file?.url ? file.url.replace("/upload/", "/upload/fl_attachment/") : "#"}
                    download={file?.label}
                    className="flex flex-col items-center text-blue-600 hover:underline">
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
                    {file?.label}
                  </a>
                </li>
              ))}
            </ul> */}

            <ul className="flex gap-8 text-gray-700">
              {files.map((file) => {
                const isImage = file?.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                const isPdf = file?.url?.match(/\.pdf$/i);

                return (
                  <li key={file?.label} className="flex flex-col items-center">
                    <a
                      href={
                        file?.url ? file.url.replace("/upload/", "/upload/fl_attachment/") : "#"
                      }
                      download={file?.label}
                      className="flex flex-col items-center text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer">
                      {/* PREVIEW */}
                      {isImage ? (
                        <img
                          src={file.url}
                          alt={file.label}
                          className="h-20 w-20 object-cover rounded mb-2"
                        />
                      ) : isPdf ? (
                        <div className="h-20 w-20 flex items-center justify-center bg-red-100 text-red-600 font-bold rounded mb-2">
                          PDF
                        </div>
                      ) : (
                        <div className="h-20 w-20 flex items-center justify-center bg-gray-200 text-gray-600 font-bold rounded mb-2">
                          FILE
                        </div>
                      )}

                      {/* LABEL */}
                      {file?.label}
                    </a>
                  </li>
                );
              })}
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
