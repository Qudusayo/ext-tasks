// @ts-nocheck

import React, { useEffect } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import { useState } from "react";
import CityModal from "./Modal";
import TimeWall from "./time-wall";
import Plus from "./plus";
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(tz);

const curCity = dayjs.tz.guess();
const data = [curCity];

function App() {
  const [modal, showModal] = useState(false);
  const [cities, setCities] = useState(data);
  const [editMode, setEditMode] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const addCity = (city) => {
    setCities((prev) => [...prev, city]);
    chrome.storage.sync.set({ cities: [...cities, city] });
  };

  const handleDeleteCity = (deletedCity) => {
    const updatedCities = cities.filter((city) => city !== deletedCity);
    setCities(updatedCities);
  };

  useEffect(() => {
    // Get cities from chrome storage
    chrome.storage.sync.get(["cities"], (result) => {
      if (result.cities) {
        setCities(result.cities);
      }
    });
  }, []);

  return (
    <section className="h-screen border bg-gray-500">
      <div
        className="w-full mx-auto h-full text-gray-200 text-xl px-3 py-3 overflow-y-auto"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #111827 25%, #112333 25%, #112333 50%, #111827 50%, #111827 75%, #112333 75%, #112333 100%)",
          backgroundSize: "141.42px 141.42px",
        }}
      >
        <div className="flex justify-between items-center w-full sticky top-0 gap-9">
          <form
            className="flex gap-2 flex-grow md:max-w-[500px]"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `https://www.google.com/search?q=${searchInput}`;
            }}
          >
            <input
              placeholder="Google search"
              className="bg-transparent text-white border border-gray-700  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xl"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-0 font-light rounded-lg text-xl sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </form>
          <div
            onClick={() => {
              showModal(true);
              setEditMode(false);
            }}
            className="flex gap-2 items-center"
          >
            <button className="text-white">
              <Plus />
            </button>
            <span className="text-white cursor-pointer">Add Time</span>
          </div>
        </div>

        <div className="mb-4 mt-48">
          <p className="font-medium text-7xl text-center">World Clock</p>
          <p className="text-center text-gray-400 text-2xl">
            {dayjs().tz(curCity).format("dddd, MMMM D")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto lg:grid-cols-3 gap-4 max-w-screen-lg">
          {cities.map((city, i) => (
            <TimeWall
              key={i}
              city={city}
              curCity={curCity}
              editMode={editMode}
              onDelete={handleDeleteCity}
              isLast={i === cities.length - 1}
            />
          ))}
        </div>
      </div>
      <CityModal showModal={showModal} modal={modal} addCity={addCity} />
    </section>
  );
}

export default App;
