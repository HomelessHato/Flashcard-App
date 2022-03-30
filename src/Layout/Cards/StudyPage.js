import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyCard from "./StudyCard";
import NotEnoughCards from "./NotEnoughCards";

export default function StudyPage() {
  const params = useParams();
  const deckId = params.deckId;
  const [studyCards, setStudyCards] = useState([]);
  const [deckName, setDeckName] = useState("");
  const [cardIndex, setCardIndex] = useState(0);
  const [side, setSide] = useState(false);
  
  const history = useHistory();

  const currentCard = studyCards.find((card, index) => index === cardIndex);

  useEffect(() => {
    const ac = new AbortController();
    async function fetchStudyCards() {
      const response = await readDeck(deckId, ac.signal);
      setDeckName(response.name);
      setStudyCards(response.cards);
    }
    fetchStudyCards();
    return () => ac.abort();
  }, [deckId]);

  const cardNum = studyCards.length;
  const handleNext = (e) => {
      e.preventDefault();
      if (cardIndex === ((studyCards.length)-1)){
          if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")){
              setCardIndex(0);
              setSide(false);
          }else{
              history.push("/");
          }
      }else{
        setCardIndex(cardIndex => cardIndex + 1);
        setSide(!side);
      }
  }
  const flipHandler = (e) => {
    e.preventDefault();
    setSide(!side);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={deckId}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1 className="mb-3">Study: {deckName}</h1>
      {
      studyCards.length < 3 ? <NotEnoughCards cards={studyCards} /> : 
      <StudyCard 
      front={currentCard.front} 
      back={currentCard.back} 
      cardIndex={cardIndex} 
      totalCards={cardNum} // deck.cards.length
      handleNext={handleNext} 
      flipHandler={flipHandler}
      side={side} // cardFlip={cardFlip}
      />
      }
    </div>
  );
}