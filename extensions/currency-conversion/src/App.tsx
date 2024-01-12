import Select from "react-select";
import Swap from "./swap";
import { currency } from "./cuurrency";
import { useEffect, useState } from "react";
import Refresh from "./refresh";

const priceFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

function App() {
  const [rate, setRate] = useState<{
    [key: string]: number;
  }>({});
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("usd");
  const [fromAmount, setFromAmount] = useState<number>(0);
  const [toAmount, setToAmount] = useState<number>(0);
  const [oneUnitFromToTo, setOneUnitFromToTo] = useState(0);
  const [oneUnitToToFrom, setOneUnitToToFrom] = useState(0);
  const [errorFetchingRate, setErrorFetchingRate] = useState(false);
  const [isFetchingRate, setIsFetchingRate] = useState(false);
  const [rateUpdated, setRateUpdated] = useState(false);

  const calculate = (from: string, to: string, amount: number) => {
    const fromRate = rate[from.toUpperCase()] ?? 1;
    const toRate = rate[to.toUpperCase()] ?? 1;

    const result = (amount / fromRate) * toRate;

    return result;
  };

  useEffect(() => {
    setToAmount(calculate(fromCurrency, toCurrency, fromAmount ?? 0));
    setOneUnitFromToTo(calculate(fromCurrency, toCurrency, 1));
    setOneUnitToToFrom(calculate(toCurrency, fromCurrency, 1));
  }, [fromAmount, fromCurrency, toCurrency, rate]);

  const fetchRate = async () => {
    try {
      setIsFetchingRate(true);
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/a8b34285ce6352c8a547fbe5/latest/usd`
      );
      const data = await response.json();
      setErrorFetchingRate(false);
      setRateUpdated(true);
      setRate(data.conversion_rates);
    } catch (e) {
      setErrorFetchingRate(true);
    } finally {
      setIsFetchingRate(false);
    }
  };

  useEffect(() => {
    fetchRate();
  }, []);

  useEffect(() => {
    if (rateUpdated) {
      setTimeout(() => setRateUpdated(false), 3000);
    }
  }, [rateUpdated]);

  return (
    <div className="w-96 max-w-96 relative pb-14">
      <div className="border-t-4 border-t-red-600"></div>
      <div
        className={`fixed w-96 bg-red-600 text-sm text-center text-white py-1 ${
          errorFetchingRate ? "top-0" : "-top-8"
        } transition-all`}
      >
        Error fetching rate, kindly refresh again
      </div>
      <div
        className={`fixed w-96 bg-green-500 text-sm text-center text-white py-1 ${
          rateUpdated ? "top-0" : "-top-8"
        } transition-all`}
      >
        Rate updated successfully
      </div>

      <div className="text-left mt-10 mb-4 px-4 flex justify-between items-center">
        <h2 className="text-4xl font-semibold">Convert</h2>
        <button
          type="button"
          onClick={() => fetchRate()}
          className={`flex gap-2 items-center text-sm ${
            isFetchingRate ? "text-gray-400" : "text-red-600"
          }`}
        >
          <span>Refresh Rate</span>
          <Refresh className={`w-4 h-4 ${isFetchingRate && " animate-spin"}`} />
        </button>
      </div>

      <form className="flex flex-col gap-4 px-4">
        <div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Select
                value={currency.find((item) => item.value === fromCurrency)}
                onChange={(e) => {
                  setFromCurrency(e?.value as string);
                }}
                options={currency as any}
                className="w-full !border-none"
              />
            </div>
            <div className="px-2">
              <label className="text-sm font-medium text-gray-400">
                1 {fromCurrency.toUpperCase()} = {oneUnitFromToTo.toFixed(2)}{" "}
                {toCurrency.toUpperCase()}
              </label>
              <input
                type="number"
                className="w-full text-5xl h-10 outline-none"
                placeholder="0"
                min={0}
                value={fromAmount}
                onChange={(e) => {
                  if (+e.target.value < 0) {
                    setFromAmount(e.target.valueAsNumber * -1);
                  } else {
                    setFromAmount(e.target.valueAsNumber);
                  }
                }}
              />
            </div>
          </div>
          <div className="border-b mt-6 mb-12 border-gray-200 relative">
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-gray-400 bg-red-600 w-12 h-12 rounded-full justify-center absolute -top-6 left-1/2 transform -translate-x-1/2"
              onClick={() => {
                setFromCurrency(toCurrency);
                setToCurrency(fromCurrency);
                setFromAmount(toAmount);
              }}
            >
              <Swap className="text-white rotate-90" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Select
                value={currency.find((item) => item.value === toCurrency)}
                onChange={(e) => {
                  setToCurrency(e?.value as string);
                }}
                options={currency as any}
                className="w-full !border-none"
              />
            </div>
            <div className="px-2">
              <label className="text-sm font-medium text-gray-400">
                1 {toCurrency.toUpperCase()} = {oneUnitToToFrom.toFixed(2)}{" "}
                {fromCurrency.toUpperCase()}
              </label>
              <input
                type="text"
                className="w-full text-5xl h-10 outline-none disabled:bg-transparent"
                value={priceFormat.format(toAmount)}
                onChange={(e) => setToAmount(+e.target.value)}
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
