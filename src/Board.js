import React from 'react'
import BoardOverview from './BoardOverview'

const renderBoard = (board) => {
    return board && board.map((rows, i)=>{
      return <div className='row'>
        {rows.map((col, j)=>{
          const body = board[i][j] === 1 ? <div style={{width: '100%', height: '100%', backgroundColor: 'orange'}}></div> : board[i][j] === 2 ? <div style={{width: '100%', height: '100%', backgroundColor: 'green'}}></div> : <div></div>
          return <div className='col'>{body}</div>
        })}
      </div>
    })
}

const getBoardStatusInfo = (board, currentPlayer, getTurn) => {
    if(!board.playersReady){
        return "Waiting for players to join";
    } else if(board.playersReady && !board.winner){
        return getTurn().message;
    } else if(board.winner){
        return board.winner === currentPlayer ? "Congratulations! You win the game." : "You lose.";
    } else {
        return null
    }
}

const getRestartButton = (handleRestartGame) => {
    return <button onClick={handleRestartGame}>Restart Game</button>
}
  

export default function Board({board, handleClick, currentPlayer, getTurn, handleRestartGame, leaveGame}) {
  return (
    <React.Fragment>
        <BoardOverview player1={board.player1} player2={board.player2} gameId={board.gameID} leaveGame={leaveGame} />
        <div className='status' style={{ backgroundColor: currentPlayer == 1 ? 'orange' : 'green' }}>
            {getBoardStatusInfo(board, currentPlayer, getTurn)}
            {board.winner && getRestartButton(handleRestartGame)}
        </div>
        <div className='row'>
            {Array(9).fill(0).map((a, col)=> <div className='col col-header' onClick={()=>handleClick(col, board.gameID)}></div>)}
        </div>
        {renderBoard(board.board)}
    </React.Fragment>
  )
}