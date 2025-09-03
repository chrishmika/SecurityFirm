/* eslint-disable react/prop-types */
import { useState } from "react";

const NumberLine = ({ year, month, onSelectDay }) => {
  const [clicked, setClicked] = useState(1);

  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  const days = new Date(year, monthIndex + 1, 0).getDate();

  let boxes = [];

  for (let day = 1; day <= days; day++) {
    boxes.push(
      <div
        className={`flex justify-center px-3 ${
          clicked == day ? "bg-blue-300" : "bg-gray-300"
        } hover:bg-blue-100 cursor-pointer`}
        key={day}
        title={day}
        onClick={() => {
          console.log(day);
          setClicked(day);
          onSelectDay(day);
        }}>
        {day}
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex gap-3 flex-wrap ">{boxes}</div>
    </div>
  );
};

export default NumberLine;
