import type { Direction, XY } from "./types";
import StartGame from "./assets/StartGame.svg";
import { RESOLUTION } from "./constants";

export default function SnakeDisplay({
  snake,
  food,
  direction,
  gameStarted,
  startGame,
}: {
  snake: XY[];
  food: XY;
  direction: Direction;
  gameStarted: boolean;
  startGame: () => void;
}) {
  return (
    <div className="w-[240px] h-[400px] bg-background bg-opacity-[84%] shadow-snakeGameWindow rounded-lg relative">
      {gameStarted ? (
        <>
          {snake.map(([x, y], i, arr) => (
            <div
              className={
                "w-[8px] h-[8px] absolute bg-accent-200" +
                (i === 0
                  ? direction === "up"
                    ? " rounded-t-full"
                    : direction === "down"
                    ? " rounded-b-full"
                    : direction === "left"
                    ? " rounded-l-full"
                    : direction === "right"
                    ? " rounded-r-full"
                    : ""
                  : "")
              }
              style={{
                left: `${x * RESOLUTION}px`,
                top: `${y * RESOLUTION}px`,
                opacity:
                  i < arr.length - 8 ? 1 : 1 - (i - (arr.length - 8)) / 8,
              }}
            />
          ))}
          {/* food */}
          {
            <div
              className="rounded-full bg-accent-200 absolute animate-ping"
              style={{
                width: `${RESOLUTION}px`,
                height: `${RESOLUTION}px`,
                left: `${food[0] * RESOLUTION}px`,
                top: `${food[1] * RESOLUTION}px`,
              }}
            />
          }
          {
            <div
              className="rounded-full bg-accent-200 absolute"
              style={{
                width: `${RESOLUTION}px`,
                height: `${RESOLUTION}px`,
                left: `${food[0] * RESOLUTION}px`,
                top: `${food[1] * RESOLUTION}px`,
              }}
            />
          }
          {/* </div> */}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <img src={StartGame} draggable={false} alt="Snake game demo" />
          <button
            className="bg-accent-100 rounded-xl mt-4 p-2 text-primary-100 hover:bg-accent-200"
            onClick={startGame}
          >
            start-game
          </button>
        </div>
      )}
    </div>
  );
}
