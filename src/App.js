import './App.css';
import Grid from './Grid';
import React, { useState, useEffect } from 'react'

function App() {

  return (
    <div className="App">
      <Grid></Grid>
    </div>
    
  );
}

export default App;


/*  <div className="background-square"></div>
      <div className="circle-container">
        <div className="circle-row gear-row-1">
          <div id="square" className={"empty"} draggable = {true} onDragStart={(e) => handleDragStart(e)} 
          onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}></div>
          <div id="square" className={"empty"} draggable = {true} onDragStart={(e) => handleDragStart(e)} 
          onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}></div>
        </div>
        <div className="circle-row gear-row-2">
          <div id="square" className={"empty"} draggable = {true} onDragStart={(e) => handleDragStart(e)} 
          onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}></div>
          <div id="square" className={"empty"} draggable = {true} onDragStart={(e) => handleDragStart(e)} 
          onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}></div>
        </div>
        <div className="circle-row gear-row-3">
          <div id="square" className={"empty"} draggable = {true} onDragStart={(e) => handleDragStart(e)} 
          onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}></div>
          <div id="square" className={"empty"} draggable = {true} onDragStart={(e) => handleDragStart(e)} 
          onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}></div>
        </div>
        <div className="circle-row gear-row-4">
          <div id="square" className={"empty"} draggable = {true} onDragStart={(e) => handleDragStart(e)} 
          onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}></div>
          <div id="square" className={"empty"} draggable = {true} onDragStart={(e) => handleDragStart(e)} 
          onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}></div>
        </div>
        <div className="circle-row gear-row-5">
          <div id="square" className={"empty"} draggable = {true} onDragStart={(e) => handleDragStart(e)} 
          onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}></div>
          <div id="square" className={"red"} draggable = {true} onDragStart={(e) => handleDragStart(e)} 
          onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}></div>
        </div>
      </div>

*/