"use client";
import randomaize from "@/utils/game.utils";
import { useEffect, useRef, useState } from "react";
export default function Home() {
  const rows = 30;
  const cols = 30;
  const [grid, setGrid] = useState<number[][]>(
    Array(rows).fill(Array(cols).fill(0))
  );
  let [speed, setSpeed] = useState(3);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(handleEvolution, 1000 - speed * 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed]);
  const handleEvolution = () => {
    setGrid((prevGrid) => {
      const tempGrid = prevGrid.map((row) => [...row]);
      const toCheckGrid = tempGrid.map((row) => [...row]);

      tempGrid.forEach((rowVal, row) => {
        rowVal.forEach((colVal, col) => {
          const neighbors = [
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1],
            [row - 1, col - 1],
            [row - 1, col + 1],
            [row + 1, col - 1],
            [row + 1, col + 1],
          ];

          const validNeighbors = neighbors.filter(
            ([r, c]) => r >= 0 && r < rows && c >= 0 && c < cols
          );

          const liveNeighbors = validNeighbors.reduce(
            (count, [r, c]) => count + tempGrid[r][c],
            0
          );

          if (tempGrid[row][col] === 1) {
            toCheckGrid[row][col] =
              liveNeighbors < 2 || liveNeighbors > 3 ? 0 : 1;
          } else {
            toCheckGrid[row][col] = liveNeighbors === 3 ? 1 : 0;
          }
        });
      });

      return toCheckGrid;
    });
  };
  return (
    <>
      <div className="text-black w-[100vw] h-[100vh] flex items-center justify-center bg-gradient-to-r from-violet-400 to-purple-400 border-black  flex-wrap">
        <h1 className="mb-4 text-5xl mb:text-5xl  xl:hidden sm:visible md:hidden lg:hidden font-extrabold text-center text-gray-900 dark:text-white  ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Conway's
          </span>{" "}
          Game of Life
        </h1>
        <main className=" w-[1200px] sm:mb-14 tsm:w-[450px]  mb:relative  lg:w-[1000px] md:w-[800px] sm:w-[650px] sm:h-[450px] overflow-hidden   ">
          <div className="flex w-[1200px] tsm:flex-col mb:relative mb:left-[4px] mb:flex-col ">
            <section className="w-[600px] shadow-lg shadow-black lg:shadow-lg lg:shadow-black  h-[600px]  bg-gradient-to-r from-yellow-200 to-yellow-200 mb:w-[385px] mb:h-[420px] sm:w-[450px] sm:h-[450px] tsm:w-[450px] tsm:h-[450px] flex flex-wrap overflow-hidden ">
              {grid.map((row, rowIndex) => {
                return row.map((col, colIndex) => {
                  return (
                    <span
                      key={`${colIndex}${rowIndex}`}
                      onClick={() => {
                        const tempGrid = grid.map((row) => [...row]);
                        const tempState = tempGrid[rowIndex][colIndex];
                        tempGrid[rowIndex][colIndex] = Number(!tempState);
                        setGrid(tempGrid);
                      }}
                      className={`w-[20px] h-[20px] sm:w-[15px] tsm:h-[15px]  tsm:w-[15px] sm:h-[15px] mb:w-[12.83px] mb:h-[14px] border  ${
                        grid[rowIndex][colIndex] == 1 ? "bg-slate-600" : null
                      } border-yellow-400 `}
                    ></span>
                  );
                });
              })}
            </section>
            <section className="w-[50%] tsm:relative mb:relative mb:right-24 tsm:left-[-6%] mb:bg-none mb:border-none  mb:flex-row tsm:items-center tsm:mt-4 lg:w-[400px] tsm:flex-row  md:w-[200px] tsm:bg-none tsm:border-none sm:w-[200px] border-purple-900 bg-gradient-to-r from-slate-300 to-indigo-600 border flex flex-col gap-10 tsm:gap-4 sm:gap-5 justify-center items-center mb:gap-4 ">
              <h1 className="mb-4 text-6xl tsm:hidden mb:hidden  lg:text-5xl sm:hidden md:text-3xl font-extrabold text-center text-gray-900 dark:text-white  ">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  Conway's
                </span>{" "}
                Game <br /> of Life
              </h1>
              <div className="flex flex-col tsm:flex-row  ">
                <button
                  className="relative inline-flex tsm:w-20 tsm:justify-center tsm:items-center tsm:flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800
                mb:w-[150px] mb:relative mb:top-8
                "
                >
                  <span
                    onClick={() => {
                      setIsRunning(!isRunning);
                    }}
                    className="relative w-full tsm:text-xl tsm:h-full tsm:justify-center tsm:items-center tsm:flex  px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md text-2xl group-hover:bg-opacity-0"
                  >
                    {isRunning ? "Stop" : "Start"}
                  </span>
                </button>
                <br />
                <button
                  className="relative tsm:w-[84px] inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800  mb:w-[150px]
                mb:relative mb:top-4"
                >
                  <span
                    onClick={() => {
                      const randomGrid = randomaize();
                      setGrid(randomGrid);
                    }}
                    className="relative tsm:hidden  px-5 text-2xl tsm:h-full tsm:text-lg py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 mb:hidden"
                  >
                    Randomize
                  </span>
                  <span
                    onClick={() => {
                      const randomGrid = randomaize();
                      setGrid(randomGrid);
                    }}
                    className="relative tsm:visible sm:hidden md:hidden lg:hidden  xl:hidden px-5 text-2xl tsm:h-full tsm:text-xl tsm:w-full tsm:flex tsm:justify-center tsm:items-center py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 mb:w-full"
                  >
                    Shuffle
                  </span>
                </button>
                <br />
                <button className="relative inline-flex tsm:w-20 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400  mb:w-[150px]">
                  <span
                    onClick={() => {
                      setGrid(Array(rows).fill(Array(cols).fill(0)));
                    }}
                    className="relative  text-2xl px-5 py-2.5 tsm:flex tsm:justify-center tsm:items-center tsm:text-xl transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full"
                  >
                    Reset
                  </span>
                </button>
              </div>
              <div className="text-3xl tsm:relative tsm:top-[6%]  text-white flex  flex-col text-center md:text-2xl justify-center items-center gap-2 tsm:gap-0 font-extrabold">
                <div className="tsm:hidden mb:text-2xl"> Speed Control</div>
                <form className="max-w-lg mx-auto tsm:relative tsm:top-1">
                  <div className="relative flex items-center max-w-[8rem]">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsRunning(false);
                        if (speed > 2) setSpeed(speed - 1);
                      }}
                      className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 text-gray-400 flex justify-center items-center focus:outline-none"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="bg-gray-50 border-x-0 text-white border-gray-300 h-11 text-center  text-sm focus:ring-blue-500 focus:border-blue-500  w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 block ml-[4px"
                      value={speed == 8 ? "max" : speed == 2 ? "min" : speed}
                    />

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsRunning(false);
                        if (speed <= 7) setSpeed(speed + 1);
                      }}
                      className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 text-gray-400 flex justify-center items-center focus:ring-2 focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </form>
                <div className="tsm:text-sm tsm:relative tsm:top-1  sm:hidden md:hidden lg:hidden  xl:hidden mb:hidden ">
                  {" "}
                  Speed Control
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
