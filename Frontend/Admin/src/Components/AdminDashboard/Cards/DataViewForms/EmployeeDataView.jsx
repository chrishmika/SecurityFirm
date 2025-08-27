/* eslint-disable react/prop-types */
import profilePic from "../../../../assets/boy1.png";

const EmployeeDataView = ({ data }) => {
  const files = [
    { label: "CV", url: data?.cv },
    { label: "GS", url: data?.gsCertificate },
    { label: "NIC Copy", url: data?.NICCopy },
  ];

  return (
    <main className="flex sm:flex-row flex-col justify-around items-center h-full bg-white p-4 gap-2 text-sm text-gray-800 font-medium">
      {/* Left Column */}
      <aside className=" flex flex-col items-end p-2 space-y-4 overflow-hidden">
        <div className="w-full max-w-[280px] text-left">
          <img
            src={data?.img || profilePic}
            alt={`profile pic`}
            className="w-28 h-28 rounded-full object-cover border-2 border-blue-500 shadow mb-4"
          />

          <address className="not-italic space-y-1 mb-4">
            <p>{data?.NIC || "none"}</p>
            <p>{data?.email || "none"}</p>
            {/* ?<p>Colombo</p> */}
          </address>

          <div className="space-y-4 w-full">
            <Info label="Employee Number" value={data?.empId || "none"} />
            <Info label="Full Name" value={data?.name || "none"} />
            <Info label="Name with Initials" value={data?.initials || "none"} />
            <Info label="Gender" value={data?.sex || "none"} />

            <Info label="Birthday" value={data?.birthday.split("T")[0] || "none"} />
            <Info label="Address" value={data?.address || "none"} />

            <div className="flex gap-6">
              <Info label="Contact 1" value={data?.contact1 || "none"} />
              <Info label="Contact 2" value={data?.contact2 || "none"} />
            </div>

            <Info label="Citizenship" value={data?.citizenship || "none"} />
            <Info label="Nationality" value={data?.nationality || "none"} />
            <Info label="Maritial" value={data?.marital ? "Married" : "Single"} />
          </div>
        </div>
      </aside>

      {/* Middle Column */}
      <section className=" p-4 space-y-6 overflow-hidden">
        <header>
          <h1 className="text-2xl font-bold text-blue-900">{data?.name || "none"}</h1>
          <p className="text-gray-600">{data?.position || "none"}</p>
        </header>

        <div className="flex gap-6">
          <Info label="ETF" value={data?.ETF || "none"} />
          <Info label="EPF" value={data?.EPF || "none"} />
        </div>
        <Info label="Basic Salary" value={`Rs.${data?.basicSalary || "none"}`} />

        {/* EXPERIENCE */}
        <section>
          <h2 className="text-sm font-semibold mb-2">EXPERIENCE</h2>
          <Detail title="Military Status" content={data?.militaryStatus ? "Yes" : "No"} />
          <Detail title="Military Details" content={data?.militaryDescription || "none"} />
          <Detail title="Special Abilities" content={data?.specialAbilities || "none"} />
          <Detail title="Gun Handeling" content={data?.gunHandling ? "Yes" : "No"} />
        </section>

        {/* SPECIAL DETAILS */}
        <section>
          <h2 className="text-sm font-semibold mb-2">SPECIAL DETAILS</h2>

          <Detail title="Disabilities" content={data?.disabilities || "none"} />
          <Detail title="Description" content={data?.description || "none"} />
        </section>
      </section>

      {/* Right Column */}
      <aside className=" p-4 overflow-hidden">
        <section className="mt-8">
          <h2 className="text-sm font-semibold">EMERGENCY</h2>

          <div className="mt-4 space-y-6">
            <Info label="Name" value={data?.emergancey[0]?.name || "none"} />
            <Info label="Address" value={data?.emergancey[0]?.address || "none"} />
            <Info label="Contacts" value={data?.emergancey[0]?.contact || "none"} />
          </div>

          {/* Uploaded Files Section */}
          <section className="mt-10">
            <h3 className="text-sm font-semibold mb-4">Files</h3>

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
