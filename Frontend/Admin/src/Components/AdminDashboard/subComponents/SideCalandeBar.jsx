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
    <div>
      <div className={`${showData ? "block" : "hidden"} font-bold ml-5`}>
        <span>Requirement</span>

        <div className="flex flex-col mx-10">
          {Array.isArray(companylist) &&
            companylist.map((company) =>
              company.count.map((requirement) => (
                <span
                  key={requirement._id}
                  className={company.name == selectedCompanyName ? "block" : "hidden"}>
                  {requirement.position} : {requirement.amount}
                </span>
              ))
            )}
        </div>
      </div>

      <div className="text-2xl scale-[0.9] lg:scale-[0.7] md:scale-[0.6] sm:scale-[0.5] ">
        <Calendar onChange={setDateValue} value={dateValue} />
      </div>
    </div>
  );
};

export default SideCalandeBar;
