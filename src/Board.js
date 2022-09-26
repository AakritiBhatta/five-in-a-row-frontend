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