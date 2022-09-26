import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import JoinComponent from './JoinComponent';
import Board from './Board';

function App() {
  const [board, setBoard] = useState({});
  const [gameId, setGameId] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const getBoard = async(currentGameId) => {
    try{
      const result = await axios.get(`http://localhost:4001/getBoardStatus?gameId=${currentGameId}`);
      setBoard(result.data);
    } catch(err){
      console.log('error')
    }
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      if(gameId){
        getBoard(gameId)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [gameId])

  const handleClick = async(column, gameId) => {
    if(currentPlayer != board.currentPlayer || !board.playersReady){
      return
    }
    await axios.post('http://localhost:4001/play', {column, gameId});
  }

  const handleLeaveGame = async() => {
    await axios.post('http://localhost:4001/leaveGame', {gameId, currentPlayer});
    setBoard({});
    setGameId(null);
    setCurrentPlayer(null);
  }

  const handleCreateGame = async (username) => {
    const result = await axios.post('http://localhost:4001/create', {username});
    setCurrentPlayer(1)
    setGameId(result.data.gameId)
  }

  const handleJoinGame = async (username, gameId) => {
    await axios.post('http://localhost:4001/join', {username, gameId});
    setCurrentPlayer(2)
    setGameId(gameId)
  }
  const getTurn = () => {
    if(board.currentPlayer == currentPlayer){
      return {message: "It's Your turn", interact: true}
    } else {
      return {message: `Opponent turn ! Please wait for his move.`, interact: false}
    }
  }

  const handleRestartGame = async() => {
    if(board.playerLeft){
      setCurrentPlayer(null)
      setGameId(null);
    }
    await axios.post('http://localhost:4001/restart', {gameId});
  }

  return (
    <div id='container'>
      {currentPlayer && <Board leaveGame={handleLeaveGame} currentPlayer={currentPlayer} board={board} handleRestartGame={handleRestartGame}  handleClick={handleClick} getTurn={getTurn} />}
      {!currentPlayer && <JoinComponent createGame={handleCreateGame} joinGame={handleJoinGame} />}
    </div>
  );
}

export default App;