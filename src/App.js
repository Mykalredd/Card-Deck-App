import { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
import Deck from './Deck';
import Card from './Card';
import './App.css';

function App() {
/*App Component funtion*/
  
  const [deck, setDeck] = useState(null);
  /*deck state to hold current deck, initialized to nul*/
  
  const [card, setCard] = useState(null);
  /*card state to hold current deck, initialized to nul*/
  
  const [autoDraw, setAutoDraw] = useState(false);
  /*autoDraw state to track if auto-draw is enabled, initialized to false*/
  
  const intervalRef = useRef(null);
  /*intervalRef ref to hold interval ID for auto-draw*/
  
  useEffect(() => {
    async function getDeck() {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await response.json();
      setDeck(data.deck_id);
    }
    getDeck();
  }, []);
  /*On initial render, get a new shuffled deck from API*/

  const handleCardDraw = async () => {
    if (!deck) return;

    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
    const data = await response.json();

    if (data.remaining === 0) {
      alert('Error: no cards remaining!');
      return;
    }

    setCard(data.cards[0]);
  }
  /*Draw a card function*/
  
  
  const handleShuffle = async () => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/shuffle/`);

    setCard(null);
  }
  /*Shuffle deck function*/
  
  
  const toggleAutoDraw = () => {
    setAutoDraw(prev => !prev);
    if (autoDraw) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(handleCardDraw, 1000);
    }
  }
  /*Toggle auto draw on/off*/
  
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    }
  }, []);
  /*Clear auto-draw interval on unmount*/
  
  
  return (
    <div>
      {deck && <Deck id={deck} onShuffle={handleShuffle} />}

      {card && <Card card={card} />}

      <button onClick={handleCardDraw}>
        {autoDraw ? 'Next Card' : 'Draw Card'}
      </button>

      <button onClick={toggleAutoDraw}>
        {autoDraw ? 'Stop Auto-Draw' : 'Start Auto-Draw'}
      </button>
    </div>
  );
  /*Returns all functions and button events*/

}

export default App;