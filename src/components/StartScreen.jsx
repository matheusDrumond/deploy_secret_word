// Estilos
import './StartScreen.css'

const StartScreen = ({ startGame, showRules }) => {
  return (
    <div className='start'>
        <h1>Secret word</h1>
        <p>Clique no botão abaixo para jogar</p>
        <button onClick={startGame}>Jogar</button>
        <button className='rules_btn' onClick={showRules}>Regras</button>
    </div>
  )
}

export default StartScreen