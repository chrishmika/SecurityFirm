import { useState } from "react";

const NumberLine = ({ month, onSelectDay }) => {
  const [clicked, setClicked] = useState(1);
  const [select, setSelect] = useState([]); //no idea why i put this

  let days =
    month === "February"
      ? 28
      : ["January", "March", "May", "July", "August", "October", "December"].includes(month)
      ? 31
      : 30;

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
