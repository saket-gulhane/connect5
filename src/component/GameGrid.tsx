import { useState } from 'react';
import './style.css';
import { cellTYpe, checkState } from '../lib/grid-helpers';

const GRID_SIZE = 10;
const REQ_LEN = 5;

const gridArr = (): Array<Array<cellTYpe>> => {
  const grid: Array<Array<cellTYpe>> = [];
  let i = 0,
    j = 0;
  for (i = 0; i < GRID_SIZE; i++) {
    const row: Array<cellTYpe> = [];
    for (j = 0; j < GRID_SIZE; j++) {
      row.push({ x: i, y: j, state: 0, winner: false });
    }
    grid.push(row);
  }

  return grid;
};

const GameGrid = () => {
  const [gameGrid, setGameGrid] = useState<Array<Array<cellTYpe>>>(gridArr);
  const [turn, setTurn] = useState(true);
  const [completed, setCompleted] = useState(false);

  const getCellStyle = (state: number) => {
    if (state == -1) return 'p1 cell_dot';
    if (state == 1) return 'p2 cell_dot';
    return '';
  };

  const handleCellClick = (
    event: React.MouseEvent<HTMLDivElement>,
    cell: cellTYpe
  ) => {
    event.stopPropagation();
    if (completed || cell.state != 0) return;

    const grid = JSON.parse(JSON.stringify(gameGrid));

    const setState = turn == true ? 1 : -1;
    grid[cell.x][cell.y].state = setState;

    const ifCompleted = checkState(
      grid,
      { ...cell, state: setState },
      REQ_LEN,
      GRID_SIZE
    );

    // mark the borders
    if (ifCompleted != null) {
      setCompleted(true);
      const [dirx, diry] = ifCompleted;
      let { x, y } = cell;
      for (let c = 0; c < REQ_LEN; c++) {
        grid[x][y].winner = true;
        x += dirx;
        y += diry;
      }
    }

    setTurn((state) => !state);
    setGameGrid(grid);
  };

  const getBoxStyled = (state: number): string => {
    return completed || state !== 0 ? 'cell noCursor' : 'cell';
  };

  return (
    <div className='container'>
      {gameGrid.map((row: Array<cellTYpe>) => (
        <div className='row' key={`row:${row[0].x}`}>
          {row.map((cell: cellTYpe) => (
            <div
              className={getBoxStyled(cell.state)}
              key={`id-${cell.x}:${cell.y}`}
              onClick={(e) => handleCellClick(e, cell)}
            >
              <div className={cell.winner ? 'inner-box winner' : 'inner-box'}>
                {<div className={getCellStyle(cell.state)}></div>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
