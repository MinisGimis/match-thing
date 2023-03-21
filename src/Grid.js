import React, { useState, useEffect } from 'react';
import './Grid.css';

const ROWS = 5;
const COLUMNS = 5;

function getRandomInt(max) {
  let retVal = Math.floor(Math.random() * max)
  //////console.log("random is " + retVal)
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
  const [lockedValue, setLockedValue] = useState(1001)

  const resetGame = () => {
    ////console.log('reset')
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

  const fillInventory = () => {
    let roll = Math.random();
    ////console.log(0.15 + (Math.log10(score+1))/100)
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
  }
  
  const handleDrop = (e, index) => {
    e.preventDefault();
    ////console.log(e.target)

    if (e.target.id !== "empty") {
      //console.log("not empty!");
    }
    else if (getColumn(index) === lockedColumn && getRow(index) === lockedRow) {
      //console.log("locked")
    }
    else if (getColumn(index) === lockedColumn2 && getRow(index) === lockedRow2) {
      //console.log("locked")
    }
    else {
      let targetColour = draggedStart.id
      //console.log("draggedStart", draggedStart)
      //console.log(targetColour)
      setInventoryGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[draggedStartIndex] = fillInventory();
        //console.log(newGrid[draggedStartIndex])
        return newGrid;
      });

      //e.target.id = targetColour
      //draggedStart.id = "empty"
      
      //f (targetColour != "empty") {
        checkBoard(index, targetColour)
        updateLocks()
        //console.log("board checked")
      //}
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
    ////console.log("vertical cleared")
  }

  const clearHorizontal = (index) => {
    setPlayGrid(prevGrid => {
      const newGrid = [...prevGrid]
      for (let i = getRow(index)*COLUMNS; i < getRow(index)*COLUMNS + COLUMNS; i++) {
        newGrid[i] = "empty"
      }
      return newGrid
    })
    ////console.log("horizontal cleared")
  }

  const clearSE = (index) => {
    setPlayGrid(prevGrid => {
      const newGrid = [...prevGrid]
      playGrid[index] = "empty"
      playGrid[index+1] = "empty"
      playGrid[index+ROWS] = "empty"
      playGrid[index+ROWS+1] = "empty"
      return newGrid
    })
  }

  const clearSW = (index) => {
    setPlayGrid(prevGrid => {
      const newGrid = [...prevGrid]
      playGrid[index] = "empty"
      playGrid[index-1] = "empty"
      playGrid[index+ROWS] = "empty"
      playGrid[index+ROWS-1] = "empty"
      return newGrid
    })
  }

  const clearNE = (index) => {
    setPlayGrid(prevGrid => {
      const newGrid = [...prevGrid]
      playGrid[index] = "empty"
      playGrid[index+1] = "empty"
      playGrid[index-ROWS] = "empty"
      playGrid[index-ROWS+1] = "empty"
      return newGrid
    })
  }

  const clearNW = (index) => {
    setPlayGrid(prevGrid => {
      const newGrid = [...prevGrid]
      playGrid[index] = "empty"
      playGrid[index-1] = "empty"
      playGrid[index-ROWS] = "empty"
      playGrid[index-ROWS-1] = "empty"
      return newGrid
    })
  }

  const updateLocks = () => {
    
    let val = lockedValue
    //console.log("updateLocks called", val)

    let x1 = lockedRow
    let x2 = lockedRow2
    let y1 = lockedColumn
    let y2 = lockedColumn2

    if (val > 1000) {
      val = 0;
      x1 = getRandomInt(ROWS)
      x2 = getRandomInt(ROWS)
      y1 = getRandomInt(COLUMNS)
      y2 = getRandomInt(COLUMNS)
      while (x1 === x2 && y1 === y2) {
        x1 = getRandomInt(ROWS)
        x2 = getRandomInt(ROWS)
        y1 = getRandomInt(COLUMNS)
        y2 = getRandomInt(COLUMNS)
      }
      setLockedColumn(y1)
      setLockedRow(x1)
      setLockedColumn2(y2)
      setLockedRow2(x2)
    }
    
    let locked1 = y1 + x1*ROWS
    let locked2 = y2 + x2*ROWS
    let temp = document.getElementsByClassName("square");
    //console.log(temp)
    ////console.log("bbbb", temp)
    for (let i = 0; i < temp.length; i++) {
      ////console.log("aaaaaaaaa", temp[i])
      if (temp[i]) {
        //if (!temp[i].classList.contains(locked1.toString()) && !temp[i].classList.contains(locked2.toString())) {
          temp[i].classList.remove("locked")
        //}
      }
    }
    let element1 = document.getElementsByClassName(locked1.toString())
    let element2 = document.getElementsByClassName(locked2.toString())
    if (element1[0] && !element1[0].classList.contains("locked")) {
      element1[0].classList.add("locked")
    }
    if (element2[0] && !element2[0].classList.contains("locked")) {
      element2[0].classList.add("locked")
    }

    setLockedValue(val + getRandomInt(499))
  }

  const checkBoard = (index, newColour) => {
    if (index === null) {
      return 0
    }
    if (newColour === "empty") {
      return 0
    }

    ////console.log(getRow(index), getColumn(index));

    //check vertical
    let vertical = true;
    for (let i = getColumn(index); i < ROWS*COLUMNS; i = i+COLUMNS) {
      if (i !== index && playGrid[i] !== newColour) {
        vertical = false;
        break;
      }
    }

    ////console.log("vertical", vertical)

    //check horizontal
    let horizontal = true;
    for (let i = getRow(index)*COLUMNS; i < getRow(index)*COLUMNS + COLUMNS; i++) {
      if (i !== index && playGrid[i] !== newColour) {
        horizontal = false;
        break;
      }
    }
    let i1, i2, i3 = 0
    let squareSE = false;
    i1 = index+1
    i2 = index+5
    i3 = index+6
    if (i1 >= 0 && i2 >= 0 && i3 >= 0 && i1 < COLUMNS*ROWS && i2 < COLUMNS*ROWS && i3 < COLUMNS*ROWS) {
      if (playGrid[i1] == newColour && playGrid[i2] == newColour && playGrid[i3] == newColour) {
        squareSE = true
        //console.log("squareSE!")
      }
    }

    i1 = index-1
    i2 = index+4
    i3 = index+5
    let squareSW = false;
    if (i1 >= 0 && i2 >= 0 && i3 >= 0 && i1 < COLUMNS*ROWS && i2 < COLUMNS*ROWS && i3 < COLUMNS*ROWS) {
      if (playGrid[i1] == newColour && playGrid[i2] == newColour && playGrid[i3] == newColour) {
        squareSW = true
        //console.log("squareSW!")
      }
    }


    i1 = index+1
    i2 = index-5
    i3 = index-4
    let squareNE = false;
    if (i1 >= 0 && i2 >= 0 && i3 >= 0 && i1 < COLUMNS*ROWS && i2 < COLUMNS*ROWS && i3 < COLUMNS*ROWS) {
      if (playGrid[i1] == newColour && playGrid[i2] == newColour && playGrid[i3] == newColour) {
        squareNE = true
        //console.log("squareNE!")
      }
    }

    i1 = index-1
    i2 = index-5
    i3 = index-6
    let squareNW = false;
    if (i1 >= 0 && i2 >= 0 && i3 >= 0 && i1 < COLUMNS*ROWS && i2 < COLUMNS*ROWS && i3 < COLUMNS*ROWS) {
      if (playGrid[i1] == newColour && playGrid[i2] == newColour && playGrid[i3] == newColour) {
        squareNW = true
        //console.log("squareNW!")
      }
    }

    let bonus = 0;
    if (squareNE) {
      clearNE(index)
      bonus += 100
    }

    if (squareNW) {
      clearNW(index)
      bonus += 100
    }

    if (squareSE) {
      clearSE(index)
      bonus += 100
    }

    if (squareSW) {
      clearSW(index)
      bonus += 100
    }

    if (horizontal && vertical) {
      clearHorizontal(index)
      clearVertical(index)
      bonus += 500
    }

    else if (vertical) {
      clearVertical(index)
      bonus += 100
    }

    else if (horizontal) {
      clearHorizontal(index)
      bonus += 100
    }
    if (bonus <= 0) {
      setPlayGrid(prevGrid => {
        const newGrid = [...prevGrid]
        newGrid[index] = newColour
        return newGrid
      });

      if (document.getElementById("empty").length == 0) {
        alert("Game Over")
      }


    }
    setScore(score + bonus)
    ////console.log("horizontal", horizontal)
    return 0;
  }

  useEffect(() => {
    //console.log("checking inventory", inventoryGrid)
    for (let i = 0; i < inventoryGrid.length; i++) {
      if (inventoryGrid[i] == "empty") {
        setInventoryGrid(prevGrid => {
          const newGrid = [...prevGrid];
          newGrid[i] = fillInventory();
          return newGrid;
        });
      }
    }

  }, [inventoryGrid])

  useEffect (() => {
    updateLocks()
  }, [])
  

  return (
    <div>
      <div>
        <h1 className={"score"}>Score: {score}</h1> 
      </div>
      
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
              className={`${`square inventory`}`}
              draggable = {true}
              onDragEnd={(e) => handleDragEnd(e)}
              onDragStart={(e) => handleDragStart(e, index)}
            />
          ))}
        </div>
      </div>
      {lost && <button className={"retry"} onClick={()=> {
        resetGame()
      }}>retry</button>}
      <p className="instructions">Drag and drop any of the 3 coloured squares onto an empty spot on the board. Certain squares will randomly be locked, meaning you will not be able to change its colour. Matching 5 of the same colours in a line removes them and earns you +100 score!</p>
    </div>
  );
}

export default App;