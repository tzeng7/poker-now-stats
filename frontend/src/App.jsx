import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Upload from './Upload'
import StatsTable from './statsTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Upload></Upload>
  
    </div>
    
  )
}

export default App
