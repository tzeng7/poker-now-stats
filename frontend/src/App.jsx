import { useEffect, useState } from 'react'
import './App.css'
import Upload from './Upload'

function App() {
  useEffect(() => {
    document.title = "PokerNow Stats"
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">♠</span>
          <h1>PokerNow Stats</h1>
        </div>
        <p className="tagline">Analyze your poker sessions with detailed statistics</p>
      </header>
      <main className="main-content">
        <Upload />
      </main>
      <footer className="footer">
        <div className="suits">
          <span>♠</span>
          <span>♥</span>
          <span>♦</span>
          <span>♣</span>
        </div>
      </footer>
    </div>
  )
}

export default App
