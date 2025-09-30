/* eslint-disable react/prop-types */
import { useState } from "react";

const NumberLine = ({ year, month, onSelectDay, today = 1 }) => {
  const [clicked, setClicked] = useState(today);

  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  const days = new Date(year, monthIndex + 1, 0).getDate();

  let boxes = [];

  for (let day = 1; day <= days; day++) {
    const dayName = new Date(year, month - 1, day).toLocaleDateString("en-US", { weekday: "long" });

    boxes.push(
      <div
        className={`flex justify-center px-3 ${
          clicked == day
            ? "bg-blue-300"
            : dayName == "Sunday" || !clicked == day
            ? "bg-red-400"
            : dayName == "Saturday"
            ? "bg-red-200"
            : "bg-gray-300"
        } hover:bg-blue-100 cursor-pointer`}
        key={day}
        title={dayName}
        onClick={() => {
          setClicked(day);
          onSelectDay(day);
        }}>
        {day}
      </div>
    );

    //seperate weeks
    {
      dayName == "Sunday" ? boxes.push(` | `) : "";
    }
  }

  return (
    <div className="">
      <div className="flex gap-3 flex-wrap ">{boxes}</div>
    </div>
  );
};

export default NumberLine;
