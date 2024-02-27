import './App.css'
import UpperCaseP from './components/upperCaseP/upperCaseP.jsx'
import AlertButton from './components/alertButton/alertButton.jsx'

function App() {
  return (
    <>
      <UpperCaseP color="red">texto do parágrafo vermelho</UpperCaseP>
      <UpperCaseP color="blue">texto do parágrafo azul</UpperCaseP>
      <AlertButton label="sucesso"/>
    </>
  )
}

export default App