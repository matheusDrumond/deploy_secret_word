// Estilos
import './Rules.css'

const Rules = ({ showRules }) => {
  return (
    <div className="rulesContainer">
        <h2>Regras:</h2>
        <ul>
            <li>Você tem 5 tentativas, a cada erro diminui uma;</li>
            <li>Se chegarem a zero, você perde</li>
            <li>Cada palavra acertada, você ganha 100 pontos</li>
            <li>Você começa o jogo com 2 (duas) ajudas, que adicionam uma letra aleatória da palavra</li>
        </ul>
        <button onClick={showRules}>entendi</button>
    </div>
  )
}

export default Rules