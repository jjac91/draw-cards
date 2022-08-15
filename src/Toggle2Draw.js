import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

function Toggle2Draw() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [autoStatus, setAutostatus] = useState(false);
  const timerId = useRef(null);
  
  useEffect(function getDeckidOnMount() {
    async function getDeckId() {
      const res = await axios.get(
        "http://deckofcardsapi.com/api/deck/new/shuffle/"
      );
      setDeck(res.data);
    }
    getDeckId();
  }, []);

  useEffect(() => {
    async function getCard(deckId) {
      try {
        const res = await axios.get(
          `http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/`
        );
        if (res.data.remaining === 0) {
            setAutostatus(false)
          throw new Error("no cards remaing!");
        }
        let newCard = res.data.cards[0];
        setCards((cards) => [...cards, newCard]);
      } catch (err) {
        alert(err);
      }
    }
    if (autoStatus && !timerId.current) {
      timerId.current = setInterval(async () => {
        await getCard();
      }, 1000);
    }

    return () => {
      clearInterval(timerId.current);
      timerId.current = null;
    };
  },[autoStatus]);

  const renderCards = cards.map((card) => (
    <Card id={card.code} key={card.code} image={card.image} />
  ));

  const autoToggle = () => {
    setAutostatus(status => !status);
  };

  return (
    <div>
      <button onClick={autoToggle}>{autoStatus ? "Stop" : "Draw"}</button>
      <div>{renderCards}</div>
    </div>
  );
}

export default Toggle2Draw;
