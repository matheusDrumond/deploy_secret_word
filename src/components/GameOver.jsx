import './GameOver.css'

const GameOver = ({ retry, score }) => {
  return (
    <div>
        <h1 className='game_over_title'>Game Over</h1>
        <h2>A sua potuação foi: <span className='score'>{score}</span></h2>
        <button onClick={retry}>Jogar denovo</button>
    </div>
  )
}

export default GameOver