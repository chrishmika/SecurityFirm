/* eslint-disable react/prop-types */
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const SideCalandeBar = ({
  showData,
  companylist,
  selectedCompanyName,
  setDateValue,
  dateValue,
}) => {
  return (
    <div className="">
      <div className={`${showData ? "block" : "hidden"} font-bold ml-5`}>
        <span>● Requirement</span>
        <div className="flex flex-col mx-10 pt-4">
          <table>
            <thead>
              <tr className="bg-blue-100">
                <th>Position</th>
                <th>Requirement</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(companylist) &&
                companylist.map((company) =>
                  company.count.map((requirement) => (
                    <tr
                      key={requirement._id}
                      className={`${
                        company.name == selectedCompanyName ? "" : "hidden"
                      } even:bg-blue-100 odd:bg-white`}>
                      <td className="font-extrabold text-center">{requirement.position}</td>
                      <td className="text-center"> {requirement.amount}</td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="text-2xl  w-sm  "> */}
      <div className="text-2xl  w-sm  scale-[0.7] lg:scale-[0.9] md:scale-[0.7] s pt-10 ">
        <Calendar
          onChange={setDateValue}
          value={dateValue}
          className="rounded-xl  border-gray-300 "
        />
        {/* <div className="w-full h-[600px] pt-10">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=Asia/Colombo"
            style={{ border: 0 }}
            width="100%"
            height="70%"
            title="Calendar"
            loading="lazy"></iframe>
        </div> */}
      </div>
    </div>
  );
};

export default SideCalandeBar;
