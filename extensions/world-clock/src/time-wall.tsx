// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Trash from "./trash";
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isTomorrow);
dayjs.extend(customParseFormat);

export default function TimeWall({
  city,
  curCity,
  onDelete,
}: {
  city: any;
  curCity: any;
  onDelete: any;
}) {
  const [time, setTime] = useState(dayjs().tz(city).format("HH:mm"));
  const [diff, setDiff] = useState();
  const [day, setDay] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().tz(city).format("HH:mm"));
    }, 1000);
    return () => clearInterval(interval);
  }, [city]);

  useEffect(() => {
    const timezone1 = curCity;
    const date1 = dayjs(dayjs().tz(timezone1).format("YYYY-MM-DD HH:mm:ss"));

    const timezone2 = city;
    const date2 = dayjs(dayjs().tz(timezone2).format("YYYY-MM-DD HH:mm:ss"));
    let day;
    if (date2.isToday()) {
      day = "Today";
    } else if (date2.isYesterday()) {
      day = "Yesterday";
    } else if (date2.isTomorrow()) {
      day = "Tomorrow";
    }
    setDay(day);

    const minutesDiff = date2.diff(date1, "m");
    let hours = Math.trunc(minutesDiff / 60);
    let remainingMinutes = Math.abs(minutesDiff % 60);
    remainingMinutes = remainingMinutes === 0 ? "00" : remainingMinutes;
    let finalDiff = `${hours}:${remainingMinutes}`;
    finalDiff = minutesDiff === 0 ? "0HRS" : finalDiff;
    finalDiff = hours >= 0 ? `+${finalDiff}` : finalDiff;
    setDiff(finalDiff);
  }, [city]);

  return (
    <div
      className={`flex justify-between items-center py-4  border-gray-700 border p-3 rounded-md select-none relative group hover:bg-gray-900 hover:border-gray-900 transition-all duration-300 ease-in-out`}
    >
      <div>
        <p className="text-base text-gray-400">
          {day}, {diff}
        </p>
        <h3 className="text-3xl font-light">{city.split("/")[1]}</h3>
      </div>
      <h3 className="text-6xl font-extralight">{time}</h3>
      <div
        className="opacity-0 group-hover:opacity-100 absolute -top-5 -right-2 z-10 bg-red-700 rounded-full text-sm p-2 cursor-pointer"
        onClick={() => onDelete(city)}
      >
        <Trash className="" />
      </div>
    </div>
  );
}
