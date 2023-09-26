function Deck({ id, onShuffle }) {
    return (
      <div>
        <p>Let's Draw Some Cards!</p>
        <button onClick={onShuffle}>Shuffle Deck</button>
      </div>
    );
  }
  
  export default Deck;
  