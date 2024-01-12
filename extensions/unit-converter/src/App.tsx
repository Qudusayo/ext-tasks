import Select from "react-select";
import Swap from "./swap";
import { useEffect, useState } from "react";
import convert, { Measure, Unit } from "convert-units";
import { units } from "./units";

type iSelectOption = {
  value: string;
  label: string;
};

function App() {
  const [convertUnit, setConvertUnit] = useState<Measure>("" as Measure);
  const [fromEntries, setFromEntries] = useState<iSelectOption[]>([]);
  const [toEntries, setToEntries] = useState<iSelectOption[]>([]);
  const [fromUnit, setFromUnit] = useState<Unit>("" as Unit);
  const [toUnit, setToUnit] = useState<Unit>("" as Unit);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [oneUnitFromToTo, setOneUnitFromToTo] = useState(0);
  const [oneUnitToToFrom, setOneUnitToToFrom] = useState(0);

  const convertUnitFn = (from: Unit, to: Unit, amount: number) => {
    const result = convert(amount).from(from).to(to);
    return result;
  };

  useEffect(() => {
    if (!fromUnit || !toUnit) return;

    const result = convertUnitFn(fromUnit, toUnit, fromValue);
    setToValue(result);
    setOneUnitFromToTo(convertUnitFn(fromUnit, toUnit, 1));
    setOneUnitToToFrom(convertUnitFn(toUnit, fromUnit, 1));
  }, [fromValue, fromUnit, toUnit]);

  useEffect(() => {
    if (!convertUnit) return;

    const possibleUnits = convert().list(convertUnit);
    const entries = possibleUnits.map((unit) => ({
      value: unit.abbr,
      label: unit.singular,
    }));
    setFromEntries(entries);
    setToEntries(entries);
  }, [convertUnit]);

  return (
    <div className="w-96 max-w-96 relative pb-14">
      <div className="border-t-4 border-t-blue-600"></div>

      <div className="text-left mt-10 mb-4 px-4 justify-between items-center">
        <span className="text-md font-light">Convert</span>
        <Select
          value={units.find((item) => item.value === convertUnit)}
          onChange={(e) => {
            setConvertUnit(e?.value as Measure);
          }}
          options={units}
          placeholder="Unit"
          components={{
            IndicatorSeparator: () => null,
          }}
          classNamePrefix={"react-select"}
          className="w-full"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: "none",
              paddingLeft: 0,
              fontSize: "25px",
              outline: "none",
              boxShadow: "none",
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: "0 0",
            }),
          }}
        />
      </div>

      <form className="flex flex-col gap-4 px-4">
        <div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Select
                value={fromEntries.find((item) => item.value === fromUnit)}
                onChange={(e) => {
                  setFromUnit(e?.value as Unit);
                }}
                options={fromEntries}
                className="w-full !border-none"
                placeholder="From"
              />
            </div>
            <div className="px-2">
              <label className="text-sm font-medium text-gray-400">
                {fromUnit && toUnit && (
                  <span>
                    1 {fromUnit.toUpperCase()} = {oneUnitFromToTo.toFixed(2)}{" "}
                    {toUnit.toUpperCase()}
                  </span>
                )}
              </label>
              <input
                type="number"
                className="w-full text-5xl h-10 outline-none disabled:bg-transparent disabled:cursor-not-allowed"
                placeholder="0"
                min={0}
                value={fromValue}
                onChange={(e) => {
                  setFromValue(Number(e.target.value));
                }}
                disabled={!convertUnit || !fromUnit || !toUnit}
              />
            </div>
          </div>
          <div className="border-b mt-6 mb-12 border-gray-200 relative">
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-gray-400 bg-blue-600 w-12 h-12 rounded-full justify-center absolute -top-6 left-1/2 transform -translate-x-1/2"
              onClick={() => {
                const tempFrom = fromUnit;
                const tempTo = toUnit;
                const tempToValue = toValue;
                setFromUnit(tempTo);
                setToUnit(tempFrom);
                setFromValue(tempToValue);
              }}
            >
              <Swap className="text-white rotate-90" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Select
                value={toEntries.find((item) => item.value === toUnit)}
                onChange={(e) => {
                  setToUnit(e?.value as Unit);
                }}
                options={toEntries}
                className="w-full !border-none"
                placeholder="To"
              />
            </div>
            <div className="px-2">
              <label className="text-sm font-medium text-gray-400">
                {fromUnit && toUnit && (
                  <span>
                    1 {toUnit.toUpperCase()} = {oneUnitToToFrom.toFixed(2)}{" "}
                    {fromUnit.toUpperCase()}
                  </span>
                )}
              </label>
              <input
                type="text"
                className="w-full text-5xl h-10 outline-none disabled:bg-transparent"
                value={toValue}
                onChange={(e) => {
                  setToValue(Number(e.target.value));
                }}
                placeholder="0"
                disabled
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
