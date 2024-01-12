import { useEffect, useState } from "react";
import styles from "./loading.module.css";

export default function SnakeLoading() {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => (dots + 1) % 4);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="m-auto border-black snake-box-gradient shadow-snakeWindow backdrop-blur-[32px] p-4 rounded-lg w-fit flex flex-col sm:flex-row mx-auto">
      <div className="flex absolute top-0 left-0 h-full w-full">
        <div className="w-full h-fit bg-background bg-opacity-[90%] shadow-snakeGameWindow my-auto py-2 text-center text-white">
          Loading{new Array(dots).fill(".").join("")}
        </div>
      </div>
      <div className="bg-background bg-opacity-[84%] shadow-snakeGameWindow rounded-lg snake-loading p-8 min-h-fit min-w-fit">
        <div className={styles["snake-loading"] + " h-fit"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-8 -8 64 84"
            shape-rendering="crispEdges"
            className="w-full h-full"
          >
            <defs>
              <pattern
                id="pattern"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
                x="-4"
                y="-4"
              >
                <path d="M 0 0 L8 0 8 8 0 8 z" fill="none"></path>
              </pattern>
            </defs>

            <g
              className={styles["snake-group"]}
              stroke-linejoin="miter"
              stroke-linecap="square"
              stroke-width="8"
              fill="none"
            >
              <path
                className={styles["dot"] + " " + styles["dot-1"]}
                d="M28,48 l8,0z"
              />
              <path
                className={styles["dot"] + " " + styles["dot-2"]}
                d="M-4,48 l8,0z"
              />
              <path
                className={styles["dot"] + " " + styles["dot-3"]}
                d="M4,16 l8,0z"
              />

              <path
                className={styles["snake"]}
                d="M0 16 h48 v16 H32 v32 H0 V48 h16 V0 H0 v16"
              />
            </g>

            <rect x="-4.5" y="-4.5" fill="url(#pattern)"></rect>
          </svg>
        </div>
      </div>
    </div>
  );
}
