
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const renderBoard = (board) => {
  return board && board.map((rows, i)=>{
    return <div className='row'>
      {rows.map((col, j)=>{
        const body = board[i][j] === 1 ? <div style={{width: '100%', height: '100%', backgroundColor: 'yellow'}}></div> : board[i][j] === 2 ? <div style={{width: '100%', height: '100%', backgroundColor: 'green'}}></div> : <div>{i},{j}</div>
        return <div className='col'>{body}</div>
      })}
    </div>
  })
}

function App() {
  const [board, setBoard] = useState({});
  const [name, setName] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const getBoard = async() => {
    const result = await axios.get('http://localhost:4001/getBoardStatus');
    setBoard(result.data);
  }

  useEffect(()=>{
    setInterval(()=>{
      getBoard();
    }, 2000)
  }, [])

  const handleClick = async(e, index) => {
    if(!getTurn().interact || !board.playersReady){
      return
    }
    await axios.post('http://localhost:4001/play', {index, player: currentPlayer});
  }

  const handleJoinGame = async (e) => {
    const result = await axios.post('http://localhost:4001/join', {playerName: name});
    setCurrentPlayer(result.data.player)
  }
  const getTurn = () => {
    if((board.turn || {}).value === currentPlayer.value){
      return {message: "It's Your turn", interact: true}
    } else {
      return {message: `${(board.turn || {}).name}'s turn. Please wait for his move.`, interact: false}
    }
  }
  return (
    <div className='container'>
      {currentPlayer && <div className='board'>
        {!board.playersReady && <h2>Waiting for players to join.</h2> }
        {board.playersReady && <h3>{getTurn().message}</h3>}
        <div className='row'>
          {Array(9).fill(0).map((a, i)=> <div className='col' style={{backgroundColor: 'pink', cursor: 'pointer'}} onClick={(e)=>handleClick(e, i)}> 🢃 </div>)}
        </div>
        {board && renderBoard(board.board)}
      </div>}
      {!currentPlayer && <div>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your name'></input>
        <button onClick={handleJoinGame}>Join game</button>
      </div>}
    </div>
  );
}

export default App;
