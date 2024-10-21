import React, { useState, useEffect } from "react";
import "./App.css";

const emojiList = [
  "🐵", "🐶", "🐱", "🐸", "🦄", "🐍", 
  "🐷", "🐙", "🐢", "🐼", "🦁", "🐯", 
];
const shuffledEmojis = [...emojiList, ...emojiList].sort(() => Math.random() - 0.5);

function App() {
  const [cards, setCards] = useState(
    shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }))
  );
  const [firstPick, setFirstPick] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matches, setMatches] = useState(0);
  const [flipCount, setFlipCount] = useState(0);

  useEffect(() => {
    if (firstPick && secondPick) {
      setDisabled(true);
      setFlipCount((prev) => prev + 1);

      if (firstPick.emoji === secondPick.emoji) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.emoji === firstPick.emoji ? { ...card, matched: true } : card
          )
        );
        setMatches((prev) => prev + 1);
        resetPicks();
      } else {
        setTimeout(() => resetFlips(), 1000);
      }
    }
  }, [firstPick, secondPick]);

  const resetPicks = () => {
    setFirstPick(null);
    setSecondPick(null);
    setDisabled(false);
  };

  const resetFlips = () => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.flipped && !card.matched ? { ...card, flipped: false } : card
      )
    );
    resetPicks();
  };

  const handleFlip = (card) => {
    if (!disabled && !card.flipped && !card.matched) {
      setCards((prevCards) =>
        prevCards.map((c) =>
          c.id === card.id ? { ...c, flipped: true } : c
        )
      );
      firstPick ? setSecondPick(card) : setFirstPick(card);
    }
  };

  return (
    <div className="App">
      <h1>Emoji Flip Game 🎯</h1>
      <p>Flips: {flipCount}</p>
      <div className="board">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? "flipped" : ""}`}
            onClick={() => handleFlip(card)}
          >
            <div className="front">{card.emoji}</div>
            <div className="back">❓</div>
          </div>
        ))}
      </div>
      {matches === emojiList.length && (
        <p className="win-message">You won in {flipCount} flips! 🎉</p>
      )}
    </div>
  );
}

export default App;
