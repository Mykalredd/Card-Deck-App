function Card({ card }) {
    return (
      <div>
        <p>{card.value} of {card.suit}</p>
        <img src={card.image} alt={`${card.value} of ${card.suit}`} />
      </div>
    )
  }
  
  export default Card;