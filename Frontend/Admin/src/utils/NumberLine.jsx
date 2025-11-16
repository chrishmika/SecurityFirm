/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaGripLinesVertical } from "react-icons/fa6";

const NumberLine = ({ year, month, onSelectDay, today = 1 }) => {
  const [clicked, setClicked] = useState(today);

  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  const days = new Date(year, monthIndex + 1, 0).getDate();

  let boxes = [];

  for (let day = 1; day <= days; day++) {
    const dayName = new Date(year, month - 1, day).toLocaleDateString("en-US", { weekday: "long" });

    boxes.push(
      <div
        className={`flex justify-center items-center rounded-md h-10 w-10 hover:bg-blue-100 cursor-pointer ${
          clicked == day
            ? "bg-blue-300"
            : dayName == "Sunday" || !clicked == day
            ? "bg-red-400"
            : dayName == "Saturday"
            ? "bg-red-200"
            : "bg-gray-300"
        } `}
        key={day}
        title={dayName}
        onClick={() => {
          setClicked(day);
          onSelectDay(day);
        }}>
        <span className="flex items-center justify-center flex-col">
          <span>{`${day}`}</span>
          <span className="text-[11px] leading-0">{`${dayName.slice(0, 2)}`}</span>
        </span>
      </div>
    );

    //seperate weeks
    {
      dayName == "Sunday" &&
        boxes.push(
          <div key={`sep-${day}`} className="flex items-center">
            <FaGripLinesVertical />
          </div>
        );
    }
  }

  return (
    <div>
      <div className="flex gap-3 flex-wrap ">{boxes}</div>
    </div>
  );
};

export default NumberLine;
