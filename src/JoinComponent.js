import React from 'react';

const JoinComponent = ({joinGame, createGame}) => {
    const [username, setUserName] = React.useState('');
    const [username2, setUserName2] = React.useState('');
    const [gameId, setGameId] = React.useState(null);
    return <div>
        <h1>FIVE IN A ROW</h1>
        <hr></hr>
        <div>
            <h2>Create new game</h2>
            <input className='input-field' type='text' name='username' placeholder='Username' value={username} onChange={(e)=> setUserName(e.target.value)} />
            <button onClick={()=> createGame(username)}>Create Game</button>
        </div>
        <h5>OR</h5>
        <div>
            <h2>Join game</h2>
            <input className='input-field' type='text' name='username2' placeholder='Username' value={username2} onChange={(e)=> setUserName2(e.target.value)} />
            <input className='input-field' type='text' name='gameId' placeholder='Game ID' value={gameId} onChange={(e)=> setGameId(e.target.value)} />
            <button onClick={()=>joinGame(username2, gameId)}>Join Game</button>
        </div>
    </div>
}

export default JoinComponent;