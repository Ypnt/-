import React from 'react';
import logo from './logo.svg';
import './App.css';
import HelloMessage from './HelloMessage';
import Avatar from './Avatar';
import UserList from './UserList';
import Counter from './Counter';
import Calc from './Calc';
function App() {
  return (
    <div className="App">
      <div><Avatar path="https://dl.op.wpscdn.cn/odimg/web/2022-06-21/065738/logo-dah.svg"></Avatar></div>
      <div><Avatar path="https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png"></Avatar></div>
      <div><UserList></UserList></div>
      <Counter></Counter>
      <Calc></Calc>
      <header className="App-header">
        <HelloMessage name="cug" num={25}></HelloMessage>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
