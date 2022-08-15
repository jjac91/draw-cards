import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

function Click2Draw() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(function getDeckidOnMount() {
    async function getDeckId() {
      const res = await axios.get(
        "http://deckofcardsapi.com/api/deck/new/shuffle/"
      );
      setDeck(res.data);
    }
    getDeckId();
  }, []);

  async function getCard(deckId) {
    try {
      const res = await axios.get(
        `http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/`
      );
      if (res.data.remaining === 0){
        throw new Error("no cards remaing!")
      }
      let newCard = res.data.cards[0];
      setCards((cards) => [...cards, newCard]);
    } catch (err) {
        alert(err)
    }
  }

  const renderCards = cards.map((card) => (
    <Card id={card.code} key={card.code} image={card.image} />
  ));

  return (
    <div>
      <button onClick={getCard}>Draw a card!</button>
      <div>{renderCards}</div>
    </div>
  );
}

export default Click2Draw;
