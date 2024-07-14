export default function randomaize() {
  const rows = 30;
  const cols = 30;
  let grid: number[][] = Array(rows).fill(Array(cols).fill(0));

  const glider = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
  ];

  const blinker = [[1, 1, 1]];

  const toad = [
    [0, 1, 1, 1],
    [1, 1, 1, 0],
  ];
  const beacon = [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
    [0, 0, 1, 1],
  ];
  const pulsar = [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ];
  const block = [
    [1, 1],
    [1, 1],
  ];
  const boat = [
    [1, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
  ];
  const tub = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
  ];
  const loaf = [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 0, 1],
    [0, 0, 1, 0],
  ];
  const lwss = [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
  ];
  const paterns = [
    glider,
    beacon,
    blinker,
    toad,
    tub,
    loaf,
    lwss,
    boat,
    block,
    pulsar,
  ];

  const randomNumber = Math.floor(Math.random() * paterns.length);

  const selectedPattern = paterns[randomNumber];

  let patternsRow = 0;
  let patternsCol = 0;

  let gridsMiddleRow = Math.floor(15 - selectedPattern.length / 2);
  let gridMdiddleCol = Math.floor(15 - selectedPattern.length / 2);

  let flag = 0;
  const tempGrid = grid.map((row) => [...row]);
  for (
    let row = gridsMiddleRow;
    row < gridsMiddleRow + selectedPattern.length;
    row++
  ) {
    for (
      let col = gridMdiddleCol;
      col < gridMdiddleCol + selectedPattern.length;
      col++
    ) {
      flag++;

      tempGrid[row][col] = selectedPattern[patternsRow][patternsCol];
      patternsCol++;
    }
    patternsCol = 0;
    patternsRow++;
  }
  console.log(tempGrid);

  return tempGrid;
}
