//import React, { Component } from "react";
import {useState} from 'react';
import TodoList from './component/todoList';
import TodoCreate from './component/todoCreate';

function TodoHead(){
  return (
    <div className={'headingArea'}>
      <h1 className={'heading__h1'}>TodoList</h1>
      <p className={'desctext'}>Enter your to-do and Complete!!</p>
    </div>
  )
}

function TodoContent() {
  const [number, count] = useState(0);
  const onIncrease = () => {
    count(prevNum => prevNum + 1);
  }
  const onDecrease = () => {
    count(prevNum => prevNum - 1);
  }

  return (
    <div className={'listArea'}>
      <div className={'listBox'}>
        <h2 className={'heading__note'}>NOTE.</h2>
        <p className={'todoCount'}>⭐️ Complete : {number}</p>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
        <TodoList></TodoList>
        <TodoCreate></TodoCreate>        
      </div>
    </div>
  )
}


function App() {
  return (
    <div className={'todolistWrap'}>
      <TodoHead></TodoHead>
      <TodoContent></TodoContent>
    </div>
  )
}

export default App;