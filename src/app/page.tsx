'use client'                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react'

import { Coordinate, Model, Square } from '../model'

export default function Home() {
  // initial instantiation of the Model comes from the first configuration
  const [model, setModel] = React.useState(new Model(0))
  const [redraw, forceRedraw] = React.useState(0)
  const [moveCount, setMoveCount] = React.useState(0) // initialize movecount
  const [score, setScore] = React.useState(0) // initialize score

  const incrementMove = () => {
    setMoveCount(prevCount => prevCount + 1);
  }
  
  function changeConfig(config:number) {
    setModel(new Model(config))
    setMoveCount(0)
    setScore(0)
    andRefreshDisplay()
  }

  function resetConfig() {
    let config = model.chosen
    setModel(new Model(config))
    setMoveCount(0)
    setScore(0)
    andRefreshDisplay()
  }

  function checkScore() {
    let wordScore:number = 0
    for (let r:number = 0; r < 5; r++) {
      for (let c:number = 0; c < 5; c++) {
        for (const word of model.words) {
          let s = model.contents(r, c).length
          if (word.includes(model.contents(r, c)) && s > 1) {
            wordScore += s
            break
          }
        }
      }
    }
    setScore(wordScore)
  }

  function checkSolution() {
    let currentWords : string[] = []
    for (let r:number = 0; r < 5; r++) {
      for (let c:number = 0; c < 5; c++) {
        let contents = model.contents(r, c)
        if (contents != '') {
          currentWords.push(contents)
        }
      }
    }
    for (let i:number = 0; i < currentWords.length; i++) {
      console.log(currentWords[i])
    }
    console.log(model.words)
    if (areArraysEqual(currentWords, model.words)) {
      alert("CONGRATULATIONS! You got a score of " + score + " in " + moveCount + " moves.")
    } else {
      alert("INCORRECT SOLUTION")
    }
  }
  // helper function to check if 2 arrays are equal
  function areArraysEqual<T>(arr1: T[], arr2: T[]): boolean {
    // Check if lengths are different
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    arr1 = [...arr1].sort(); // Create a copy of arr1 and sort it
    arr2 = [...arr2].sort(); // Create a copy of arr2 and sort it
    
    // Check if all elements are equal
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  
    return true;
  }

  // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  // ((target.row + 1) === (selected.row))
  function isValidMove(selected:Coordinate, target:Coordinate) {
    if ((
       (((selected.row - 1) === (target.row)) && (selected.column === target.column) // UP
    || (((selected.row + 1) === (target.row)) && (selected.column === target.column)) // DOWN
    || ((selected.row === target.row) && ((selected.column - 1) === target.column)) // LEFT
    || ((selected.row === target.row) && ((selected.column + 1) === target.column))) // RIGHT
    && (model.contents(target.row, target.column) != '') // NOT EMPTY
    && ((model.contents(target.row, target.column) + model.contents(selected.row, selected.column)).length <= 6) 
        )) 
    { 
      return true
    } else {
      return false
    }
  }

  
  function fold(row:number, column:number) {
    if (model.board.selectedSquare) {
      const selectedRow = model.board.selectedSquare.row
      const selectedCol = model.board.selectedSquare.column
      const selectedCoord = new Coordinate(selectedRow, selectedCol)
      const targetCoord = new Coordinate(row, column)
      const foldContents = model.contents(selectedRow, selectedCol) + model.contents(row, column)
      if (isValidMove(selectedCoord, targetCoord)) {
        model.setcontents(selectedRow, selectedCol, '') 
        model.setcontents(row, column, foldContents)
        incrementMove()
        return foldContents
      } else {
        return null 
      }
    }
    return null
  }

  function handleClick(row:number, column:number) {

    let selected = new Coordinate(row, column)
    if (!model.board.selectedSquare && model.contents(row, column) != '') {
      model.board.selectedSquare = selected
    } else {
      if (fold(row,column)) {
        checkScore()
        model.board.selectedSquare = undefined
      }
    }
    andRefreshDisplay()
  }


  // change the style for the given square based on model. Space separated string.
  // So "square" is a regular square, while "square selected" is a selected square. Find
  // these CSS definitions inside the global.css file
  function css(row:number, column:number) {
    if ((row === model.board.selectedSquare?.row) && (column === model.board.selectedSquare.column))  {
      return "square selected"
    }
    return "square"
  }

  function configSelected(config:number) {
    if (model.chosen === config) {
      return "config-button-selected"
    } 
    return "config-button"
  }

  return (
    <div>
      <h1 className="wordfold-heading">WordFold</h1>
      <div className="board">
        <div className="button-container">
          <button data-testid="0,0" className={css(0,0)} onClick={() => handleClick(0, 0)}>{model.contents(0,0)}</button>
          <button data-testid="0,1" className={css(0,1)} onClick={() => handleClick(0, 1)}>{model.contents(0,1)}</button>
          <button data-testid="0,2" className={css(0,2)} onClick={() => handleClick(0, 2)}>{model.contents(0,2)}</button>
          <button data-testid="0,3" className={css(0,3)} onClick={() => handleClick(0, 3)}>{model.contents(0,3)}</button>
          <button data-testid="0,4" className={css(0,4)} onClick={() => handleClick(0, 4)}>{model.contents(0,4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="1,0" className={css(1,0)} onClick={() => handleClick(1, 0)}>{model.contents(1,0)}</button>
          <button data-testid="1,1" className={css(1,1)} onClick={() => handleClick(1, 1)}>{model.contents(1,1)}</button>
          <button data-testid="1,2" className={css(1,2)} onClick={() => handleClick(1, 2)}>{model.contents(1,2)}</button>
          <button data-testid="1,3" className={css(1,3)} onClick={() => handleClick(1, 3)}>{model.contents(1,3)}</button>
          <button data-testid="1,4" className={css(1,4)} onClick={() => handleClick(1, 4)}>{model.contents(1,4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="2,0" className={css(2,0)} onClick={() => handleClick(2, 0)}>{model.contents(2,0)}</button>
          <button data-testid="2,1" className={css(2,1)} onClick={() => handleClick(2, 1)}>{model.contents(2,1)}</button>
          <button data-testid="2,2" className={css(2,2)} onClick={() => handleClick(2, 2)}>{model.contents(2,2)}</button>
          <button data-testid="2,3" className={css(2,3)} onClick={() => handleClick(2, 3)}>{model.contents(2,3)}</button>          
          <button data-testid="2,4" className={css(2,4)} onClick={() => handleClick(2, 4)}>{model.contents(2,4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="3,0" className={css(3,0)} onClick={() => handleClick(3, 0)}>{model.contents(3,0)}</button>
          <button data-testid="3,1" className={css(3,1)} onClick={() => handleClick(3, 1)}>{model.contents(3,1)}</button>
          <button data-testid="3,2" className={css(3,2)} onClick={() => handleClick(3, 2)}>{model.contents(3,2)}</button>
          <button data-testid="3,3" className={css(3,3)} onClick={() => handleClick(3, 3)}>{model.contents(3,3)}</button>
          <button data-testid="3,4" className={css(3,4)} onClick={() => handleClick(3, 4)}>{model.contents(3,4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="4,0" className={css(4,0)} onClick={() => handleClick(4, 0)}>{model.contents(4,0)}</button>
          <button data-testid="4,1" className={css(4,1)} onClick={() => handleClick(4, 1)}>{model.contents(4,1)}</button>
          <button data-testid="4,2" className={css(4,2)} onClick={() => handleClick(4, 2)}>{model.contents(4,2)}</button>
          <button data-testid="4,3" className={css(4,3)} onClick={() => handleClick(4, 3)}>{model.contents(4,3)}</button>
          <button data-testid="4,4" className={css(4,4)} onClick={() => handleClick(4, 4)}>{model.contents(4,4)}</button>
        </div>
      </div>
     
      <div style={{ marginLeft: '545px', marginTop: '40px', display: 'flex', flexDirection: 'column' }}>
        <label className="score-title">SCORE</label>
        <label className="score">{score}</label>
        <label className="numMoves">{"Moves: " + moveCount}</label>

        {/* Label for button configuration */}
        <label style={{ marginTop: '20px', fontWeight: 'bold' }}>Choose Configuration</label>

        {/* Container for buttons with fixed width */}
        <div style={{ width: '180px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          {/* Row for the first three blue buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className={configSelected(0)} onClick={() => changeConfig(0)}>
              1
            </button>
            <button className={configSelected(1)} onClick={() => changeConfig(1)}>
              2
            </button>
            <button className={configSelected(2)} onClick={() => changeConfig(2)}>
              3
            </button>
          </div>

          {/* RESET button spans the width of the container */}
          <button className="reset-button" style={{ width: '100%' }} onClick={() => resetConfig()}>
            RESET PUZZLE
          </button>
          <button className="check-button" style={{ width: '100%' }} onClick={() => checkSolution()}>
            CHECK SOLUTION
          </button>
        </div>
      </div>


    </div>
  )
}
