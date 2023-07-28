// Estilos
import './Game.css'

// Hooks
import { useState, useRef } from 'react'

const Game = ({ 
    verifyLetter, 
    pickedCategory, 
    letters, 
    guessedLetters, 
    wrongLetters, 
    guesses, 
    score,
    help,
    helpsQty 
}) => {
    // State para gerenciar a letra do input
    const [letter, setLetter] = useState('');
    const letterInputRef = useRef(null);

    // Recebimento da letra digitada no input
    const handleSubmit = (e) => {
        // Cancela o reload
        e.preventDefault();

        // Verifica a letra
        verifyLetter(letter);

        // Limpa o input
        setLetter('');
    
        // Manter o input selecionado
        letterInputRef.current.focus();
      };
  return (
    <div className="game">
        <p className="points">
            <span>Pontuação: {score}</span>
        </p>
        <div className='help_container'>
          <button className='help' onClick={help}>Ajuda</button>
          <span>Você tem {helpsQty} ajuda(s)</span>
        </div>
        <h1>Advinhe a palavra</h1>
        <h3 className="hint">
            Dica: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativa(s)</p>
        <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className="letter" key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>

      <div className="letterContainer">
        <p>Tente adivnhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            name='letter'
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            required
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game