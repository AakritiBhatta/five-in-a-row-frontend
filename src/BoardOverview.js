import React from 'react';
import './App.css';
export default function BoardOverview({player1, player2, gameId, leaveGame}) {
  return (
    <div id='boardOverview'>
       <div className='d-flex'>
            <div className='player'>
                <div className='player1'></div>
                <span>{player1}</span>
            </div>
            <div className='player'>
                <div className='player2'></div>
                <span>{player2}</span>
            </div>
       </div>
       <div className='d-flex'>
            <div className='gameId'>GAME ID: {gameId}</div>
            <button onClick={leaveGame}>Leave Game</button>
       </div>
    </div>
  )
}