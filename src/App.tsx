import {useEffect, useState} from "react";
import "./styles.css";
import {Board, cloneBoard, getNextBoard, generateBoard} from "./gameOfLife";

export default function App() {
  const [board, setBoard] = useState<Board>([[]]);
  const [rowCount, setRowCount] = useState(40);
  const [columnCount, setColumnCount] = useState(40);
  const [automationActive, setAutomationActive] = useState(false);

  const toggleAutomationState = (): void => setAutomationActive(bool => !bool);

  // const handleClear = (): void => {
  //   const godMode = generateBoard(rowCount, columnCount);
  //   setBoard(godMode);
  // }

  const randomizeBoard = (): void => {
    const randomBoard = generateBoard(rowCount, columnCount, true);
    setBoard(randomBoard);
  };

  useEffect(() => {
    const randomBoard = generateBoard(rowCount, columnCount, true);
    setBoard(randomBoard);
  }, [rowCount, columnCount]);

  // https://reactjs.org/docs/hooks-effect.html
  useEffect(
    // if you returned a cleanup fn last time this callback was run, then
    // react "runs it here"
    () => {
      if (!automationActive) return;
      const timerId = setInterval(() => setBoard(board => getNextBoard(board)), 70);
      const cleanupFn = () => clearInterval(timerId);
      return cleanupFn;
    },
    [automationActive],
  );

  return (
    <div className="App">
      <h1>Game of Life (Cellular Automation)</h1>
      <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>More details about the Game of Life here!</a>
      {/* <h3>Rules:</h3>
      <ul>
        <li>{`Any live cell with fewer than (< 2) two live neighbours dies (under-population)`}</li>
        <li>{`Any live cell with two or three live neighbours lives on to the next generation (survival)`}</li>
        <li>{`Any live cell with more than (> 3) three live neighbours dies (overcrowding)`}</li>
        <li>{`Any dead cell with exactly three (=== 3) live neighbours becomes a live cell (reproduction)`}</li>
      </ul> */}
      <table style={{borderCollapse: 'collapse', display: 'flex', alignContent: 'center', justifyContent: 'center', marginBottom: '2rem'}}>
        
      <tbody>
          {board.map((row, indexRow) => {
            return (
              <tr key={indexRow}>
                {row.map((column, indexColumn) => {
                  return (
                    <td
                      style={{
                        backgroundColor: column === 1 ? "#000" : "#fff",
                        width: "1rem",
                        height: "1rem",
                        // border: "1px solid black",
                      }}
                      key={indexColumn}
                      onClick={() => {
                        // setAutomationActive(false);
                        const boardClone = cloneBoard(board);
                        // consider a function: toggleCell(board: Board, row: number, column: number): Board
                        const value = boardClone[indexRow][indexColumn];
                        boardClone[indexRow][indexColumn] = value === 0 ? 1 : 0;
                        setBoard(boardClone);
                      }}
                      // onMouseUp={() => setAutomationActive(true)}
                    ></td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <input
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          setRowCount(isNaN(value) ? 0 : value);
          
        }}
        value={rowCount}
      />
      <input
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          setColumnCount(isNaN(value) ? 0 : value);
          
        }}
        value={columnCount}
      /> */}
      <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center'}}>
      {automationActive ? null : <button style={{width: '20rem'}} onClick={randomizeBoard}>Randomize Initial Generation</button>}
      {/* {!automationActive && <button style={{width: '50%'}} onClick={handleClear}>Play God</button>} */}
      <button style={{color: !automationActive ? 'inherit' : 'red', width: '20rem'}} onClick={toggleAutomationState}>{!automationActive ? 'Begin' : 'Pause'} generations</button>
      </div>
    </div>
  );
}
