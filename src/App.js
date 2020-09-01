import { Client } from 'boardgame.io/react';
import { HP } from './Game';
import { Board } from './Board';

// import 'antd/dist/antd.css';

const App = Client({ 
  game: HP, 
  board: Board,
  debug: false,
});

export default App;