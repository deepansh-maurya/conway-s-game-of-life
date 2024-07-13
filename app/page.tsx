"use client";
import { useState } from "react";
export default function Home() {
  const rows = 30;
  const cols = 30;
  const [grid, setGrid] = useState<number[][]>(
    Array(rows).fill(Array(cols).fill(0))
  );
  const handleEvolution = () => {
    const tempGrid = grid.map((row) => [...row]);
    // console.log(tempGrid);
    tempGrid.forEach((rowVal, row) => {
      let flag = 1;
      let rowIndex = row;
      rowVal.map((colVal, colIndex) => {
        const currentPos = [rowIndex, colIndex];
        console.log(rowIndex, flag++, rowVal.length);
        const topPos = --rowIndex > 0 ? [--rowIndex, colIndex] : null;
        const downPos = ++rowIndex < rows ? [++rowIndex, colIndex] : null;
        const leftPos = --colIndex > 0 ? [rowIndex, --colIndex] : null;
        const rightPos = ++colIndex < colIndex ? [rowIndex, --colIndex] : null;
        const topLeftPos =
          --rowIndex > 0 && --colIndex > 0 ? [--rowIndex, --colIndex] : null;
        const topRightPos =
          --rowIndex > 0 && ++colIndex < cols ? [--rowIndex, ++colIndex] : null;
        const downRightPos =
          ++rowIndex < rows && ++colIndex > cols
            ? [++rowIndex, ++colIndex]
            : null;
        const downLeftPos =
          ++rowIndex < rows && --colIndex > 0 ? [++rowIndex, --colIndex] : null;
        console.log(
          "curr",
          currentPos,
          "top",
          topPos,
          "down",
          downPos,
          "left",
          leftPos,
          "right",
          rightPos,
          "topl",
          topLeftPos,
          "topr",
          topRightPos,
          "downl",
          downLeftPos,
          "downr",
          downRightPos
        );

        const allPosArray = [
          topPos ? topPos : null,
          downPos ? downPos : null,
          leftPos ? leftPos : null,
          rightPos ? rightPos : null,
          topLeftPos ? topLeftPos : null,
          topRightPos ? topRightPos : null,
          downLeftPos ? downLeftPos : null,
          downRightPos ? downRightPos : null,
        ];
        const filteredPosArray = allPosArray.filter((pos) => pos != null);
        if (tempGrid[rowIndex][colIndex] == 1) {
          let survivalChance = 0;
          filteredPosArray.map((pos) => {
            tempGrid[pos[0]][pos[1]] == 1 ? survivalChance++ : null;
          });
          survivalChance > 3 || survivalChance < 2
            ? (tempGrid[rowIndex][colIndex] = 0)
            : null;
        } else {
          let birthChance = 0;
          filteredPosArray.map((pos) => {
            tempGrid[pos[0]][pos[1]] == 1 ? birthChance++ : null;
          });
          birthChance >= 3 ? (tempGrid[rowIndex][colIndex] = 1) : null;
        }
      });
    });

    for (let row = 0; row < rows; row++) {
      console.log("aa gay");
    }
    setGrid(tempGrid);
  };
  return (
    <>
      <div className="text-black w-[100vw] h-[100vh] flex items-center justify-center bg-slate-600 border border-black  flex-wrap">
        <main className="w-[90.2%]  bg-slate-400 overflow-scroll ">
          <section className="w-[600px] h-[600px] flex flex-wrap overflow-auto ">
            {grid.map((row, rowIndex) => {
              return row.map((col, colIndex) => {
                return (
                  <span
                    key={`${colIndex}${rowIndex}`}
                    onClick={() => {
                      const tempGrid = grid.map((row) => [...row]);
                      const tempState = tempGrid[rowIndex][colIndex];
                      tempGrid[rowIndex][colIndex] = Number(!tempState);
                      // console.log(
                      //   tempGrid,
                      //   tempState,
                      //   tempGrid[rowIndex][colIndex],
                      //   rowIndex,
                      //   colIndex
                      // );
                      setGrid(tempGrid);
                      // setTimeout(() => {
                      //   handleEvolution();
                      // }, 700);
                    }}
                    className={`w-[20px] h-[20px] border  ${
                      grid[rowIndex][colIndex] == 1
                        ? "bg-yellow-500"
                        : "bg-yellow-100"
                    } border-black flex `}
                  >
                    {colIndex}
                  </span>
                );
              });
            })}
          </section>
        </main>

        <button onClick={handleEvolution}>start</button>
      </div>
    </>
  );
}
