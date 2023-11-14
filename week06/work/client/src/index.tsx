import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Head from './Head';
import List from './List';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <div>
      <Head></Head>
      <List></List>
    </div>
  </React.StrictMode>,
);
