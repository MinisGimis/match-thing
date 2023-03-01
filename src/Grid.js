import React, { useState, useEffect } from 'react';
import './Grid.css';

const ROWS = 5;
const COLUMNS = 5;

function getRandomInt(max) {
  let retVal = Math.floor(Math.random() * max)
  //console.log("random is " + retVal)
  return retVal;
}

const getRow = (index) => {
  return Math.floor(index/ROWS)
}

const getColumn = (index) => {
  return index % COLUMNS
}

function App() {
  const [playGrid, setPlayGrid] = useState(Array(25).fill('empty'));
  const [inventoryGrid, setInventoryGrid] = useState(Array(3).fill('empty'));
  const [draggedStart, setDraggedStart] = useState(null);
  const [draggedStartIndex, setDraggedStartIndex] = useState(null);
  const [score, setScore] = useState(0)
  const [lost, setLost] = useState(false)
  const [lockedColumn, setLockedColumn] = useState(getRandomInt(COLUMNS));
  const [lockedRow, setLockedRow] = useState(getRandomInt(ROWS));
  const [lockedColumn2, setLockedColumn2] = useState(getRandomInt(COLUMNS));
  const [lockedRow2, setLockedRow2] = useState(getRandomInt(ROWS));
  const [lockedValue, setLockedValue] = useState(0)

  const resetGame = () => {
    console.log('reset')
    setInventoryGrid(Array(3).fill('empty'))
    setPlayGrid(Array(25).fill('empty'))
    setScore(0)
    setLost(false)
    setDraggedStart(null)
    setDraggedStartIndex(null)
    setLockedColumn(getRandomInt(COLUMNS))
    setLockedRow(getRandomInt(ROWS))
    setLockedColumn2(getRandomInt(COLUMNS))
    setLockedRow2(getRandomInt(ROWS))
    setLockedValue(0)
  }

  const handleDragStart = (e, index) => {
    setDraggedStart(e.currentTarget)
    setDraggedStartIndex(index)
  };

  const handleDragEnd = (e) => {
    setDraggedStart(null)
    setDraggedStartIndex(null)
  };

  const handleDragOver = (e) => {
    if (draggedStart) {
      e.preventDefault();
    }
  };
  
  const handleDrop = (e, index) => {
    e.preventDefault();
    console.log(e.target)

    if (e.target.id != "empty") {
      console.log("empty");
    }
    else if (getColumn(index) == lockedColumn && getRow(index) == lockedRow) {
      console.log("locked")
    }
    else if (getColumn(index) == lockedColumn2 && getRow(index) == lockedRow2) {
      console.log("locked")
    }
    else {
      setInventoryGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[draggedStartIndex] = "empty"
        return newGrid;
      });
      e.target.id = draggedStart.id
      draggedStart.id = "empty"

      setPlayGrid(prevGrid => {
        const newGrid = [...prevGrid]
        newGrid[index] = e.target.id
        return newGrid
      });
    }
    setDraggedStart(null)
    setDraggedStartIndex(null)
  };

  const clearVertical = (index) => {
    setPlayGrid(prevGrid => {
      const newGrid = [...prevGrid]
      for (let i = getColumn(index); i < ROWS*COLUMNS; i = i+COLUMNS) {
        newGrid[i] = "empty"
      }
      return newGrid
    })
    console.log("vertical cleared")
  }

  const clearHorizontal = (index) => {
    setPlayGrid(prevGrid => {
      const newGrid = [...prevGrid]
      for (let i = getRow(index)*COLUMNS; i < getRow(index)*COLUMNS + COLUMNS; i++) {
        newGrid[i] = "empty"
      }
      return newGrid
    })
    console.log("horizontal cleared")
  }

  const checkBoard = (index, newColour) => {

    let locked1 = lockedColumn + lockedRow*ROWS
    let locked2 = lockedColumn2 + lockedRow2*ROWS
    let temp = document.getElementsByClassName("locked");
    console.log("bbbb", temp)
    for (let i = 0; i < temp.length; i++) {
      console.log("aaaaaaaaa", temp[i])
      if (temp[i]) {
        if (!temp[i].classList.contains(locked1.toString()) && !temp[i].classList.contains(locked2.toString())) {
          temp[i].classList.remove("locked")
        }
      }
    }
    let element1 = document.getElementsByClassName(locked1.toString())
    let element2 = document.getElementsByClassName(locked2.toString())
    console.log(element1, "element1")
    console.log(element2, "element2")
    if (element1[0] && !element1[0].classList.contains("locked")) {
      element1[0].classList.add("locked")
    }
    if (element2[0] && !element2[0].classList.contains("locked")) {
      element2[0].classList.add("locked")
    }

    let addScore = 0;
    if (index == null) {
      return 0
    }
    if (newColour == "empty") {
      return 0
    }
    console.log(getRow(index), getColumn(index));

    //check vertical
    let vertical = true;
    for (let i = getColumn(index); i < ROWS*COLUMNS; i = i+COLUMNS) {
      if (i != index && playGrid[i] != newColour) {
        vertical = false;
        break;
      }
    }

    console.log("vertical", vertical)

    //check horizontal
    let horizontal = true;
    for (let i = getRow(index)*COLUMNS; i < getRow(index)*COLUMNS + COLUMNS; i++) {
      if (i != index && playGrid[i] != newColour) {
        horizontal = false;
        break;
      }
    }

    if (horizontal && vertical) {
      clearHorizontal(index)
      clearVertical(index)
      return 3
    }

    if (vertical) {
      clearVertical(index)
      return 2
    }

    if (horizontal) {
      clearHorizontal(index)
      return 1
    }
    console.log("horizontal", horizontal)
    return 0;
  }

  useEffect(() => {
    if (lockedValue > 1000) {
      let x1 = getRandomInt(ROWS)
      let x2 = getRandomInt(ROWS)
      let y1 = getRandomInt(COLUMNS)
      let y2 = getRandomInt(COLUMNS)
      while (x1 == x2 && y1 == y2) {
        x1 = getRandomInt(ROWS)
        x2 = getRandomInt(ROWS)
        y1 = getRandomInt(COLUMNS)
        y2 = getRandomInt(COLUMNS)
      }
      setLockedColumn(y1)
      setLockedRow(x1)
      setLockedColumn2(y2)
      setLockedRow2(x2)
      setLockedValue(lockedValue - 1000)
    }
    console.log(lockedColumn, lockedRow, lockedValue)

  }, [lockedValue])

  useEffect(() => {
    let result = 0;
    let failed = true;
    console.log("checked")
    setLockedValue(lockedValue + getRandomInt(500))
    for (let i = 0; i < ROWS*COLUMNS; i++) {
      if (playGrid[i] == "empty") {
        failed = false;
      }
      result = Math.max(result, checkBoard(i, playGrid[i]));
    }
    if (result == 0 && failed) {
      setLost(true)
    }
    else if (result == 1) {
      setScore(score + 100)
    }
    else if (result == 2) {
      setScore(score + 100)
    }
    else if (result == 3) {
      setScore(score + 500)
    }
  }, inventoryGrid)

  useEffect(() => {
    let intervalId = null;
    
    const updateGrid = () => {

      setInventoryGrid(prevGrid => {
        
        return prevGrid.map(square => {
          //console.log ((Math.log10(score))/100);
          if (square != "empty") {
            return square
          }
          
          let roll = Math.random();
          console.log(0.15 + (Math.log10(score+1))/100)
          if (roll < (Math.log10(score))/100) {
            return 'treasure'
          }
          else if (roll < (0.15 + (Math.log10(score+1))/100)) {
            return 'red';
          }
          else if (roll < 0.35 + (Math.log10(score+1))/100) {
            return 'green';
          }
          else if (roll < 0.55 + (Math.log10(score+1))/100) {
            return 'yellow';
          }
          else if (roll < 0.75 + (Math.log10(score+1))/100) {
            return 'purple';
          }
          else {
            return 'blue';
          }
        });
      });
      intervalId = setTimeout(updateGrid, 100);
    };
  
    updateGrid(); // trigger the first interval immediately
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div>
      <h1 className={"score"}>Score: {score}</h1>
      <div className={"game"}>
        <div className="grid-container play-grid">
          {playGrid.map((square, index) => (
            <div
              key={index}
              id={square}
              className={`square ${index}`}
              draggable = {false}
              onDragOver={(e) => {handleDragOver(e)}}
              onDrop={(e) => handleDrop(e, index)}
            />
          ))}
        </div>
        
        <div className="inventory-grid">
          {inventoryGrid.map((square, index) => (
            <div
              key={index}
              id={square}
              className={`${`square`}`}
              draggable = {true}
              onDragEnd={(e) => handleDragEnd(e)}
              onDragStart={(e) => handleDragStart(e, index)}
            />
          ))}
        </div>
      </div>
      {lost && <button className={"retry"} onClick={()=> {
        resetGame()
      }}>you lost</button>}
    </div>
  );
}

export default App;