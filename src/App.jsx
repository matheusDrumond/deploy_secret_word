// Data
import { wordsList } from './data/words' 

// Importação de hooks
import { useState, useCallback, useEffect } from 'react'

// Estilos
import './App.css'

//Importação de componentes
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'
import Rules from './components/Rules'

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {

  // Funções para transitar entre as telas
  const [gameStage, setGameStage] = useState(stages[0].name);

  // Data
  const [words] = useState(wordsList);

  // Setando as palavras, categorias e letras
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(5);
  const [score, setScore] = useState(0);

  // Função de escolher a palavra e a categoria 
  const pickWordAndCategory = useCallback(() => {
    //Escolhendo a categoria
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    // Escolhendo a palavra
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category };
  }, [words]);

  // Iniciar o jogo
  const startGame = useCallback(() => {   
    // Limpar letras anteriores
    resetLetters();
    
    // Escolher palavra e categoria aleatoriamente
    const { word, category } = pickWordAndCategory();
    (word, category);

    // Criando o array de letras da palavra
    let wordLetters = word.split('');
    (wordLetters);
    
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // Preenchendo os states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // Receber o input de letra
  const verifyLetter = (letter) => {
    // Padronizar todas as letras como minúsculas
    const padronizedLetter = letter.toLowerCase();

    // Verificar se a letra já foi utilizada
    if(guessedLetters.includes(padronizedLetter) || wrongLetters.includes(padronizedLetter)){
      return;
    }

    // Coloca a letra como certa ou errada
    if (letters.includes(padronizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        padronizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        padronizedLetter,
      ]);

      // Quando a letra for errada diminui uma tentativa
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }

  // Função de resetar os states de letras
  const resetLetters = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }


  // Game over quando a pontuação chegar a 0
  useEffect(() =>{
    if(guesses <= 0){
      // Resetar os states atuais
      resetLetters();

      // Vai para a tela de fim de jogo
      setGameStage(stages[2].name)
    }
  }, [guesses])

  // Checar a condição de vitória
  useEffect(() => {
    // Tornar o array de letras das palavras , únicas
    const uniqueLetters = [... new Set(letters)]

    // Condição de vitória
    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      // Adicionar pontuação
      setScore((actualScore) => actualScore + 100)

      // Trocar a palavra e reiniciar as letras 
      startGame();
    }

  }, [guessedLetters, letters, startGame])

  // Reiniciar o jogo
  const retry = () => {
    // Resetar pontuação e tentativas
    setGuesses(5);
    setScore(0);

    setGameStage(stages[0].name);
  }

  // Função de mostrar as regras
  const [rulesVisible, setRulesVisible] = useState(false);

  const showRules = () => {
    if(rulesVisible === false){
      setRulesVisible(true)
    } else if( rulesVisible === true){
      setRulesVisible(false)
    }
  }

  // Função de ajuda dos convidados
  const [helpsQty, setHelpsQty] = useState(2);

  const randomLetter = () => {
    // Criando o array de letras da palavra
    let wordLetters = pickedWord.split('');
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // Gerando um array com as letras da palavra  que ainda não foram advinhadas
    const notGuessedLetters = [... new Set(wordLetters)].filter((letter) => guessedLetters.includes(letter) === false)
    
    const randomLetter = notGuessedLetters[Math.floor(Math.random() * letters.length)]
    return randomLetter;
  }

  const help = ()=> {
    // Limitar a quantidade de ajudas
    if(helpsQty > 0){
      // Adicionar uma letra aleátória
      let pickedLetter = randomLetter();
      if(guessedLetters.includes(pickedLetter)){
        pickedLetter = randomLetter();
      } else {
        setGuessedLetters((actualGuessedLetters) => [
          ...actualGuessedLetters,
          pickedLetter,
        ])
      }

      // Diminuir a quantidade de ajudas
      setHelpsQty((actualHelpsQty) => actualHelpsQty - 1)
    } else {
      return;
    }
  }

  return (
    <>
      {rulesVisible === true && <Rules showRules={showRules}/>}
      {gameStage === 'start' && <StartScreen startGame={startGame} showRules={showRules}/>}
      {gameStage === 'game' && (
        <Game 
        verifyLetter={verifyLetter} 
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        help={help}
        helpsQty={helpsQty}
        />)
      }
      {gameStage === 'end' && 
      <GameOver 
      retry={retry}
      score={score}
      />}
    </>
  )
}

export default App
