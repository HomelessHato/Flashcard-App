import React, {useEffect, useState} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import CardsList from "../Cards/CardList"
import { readDeck, deleteDeck} from "../../utils/api";
import { Trash, Book, Pencil, PlusLg } from "react-bootstrap-icons";

export default function ViewDeck(){
 const params = useParams();
 const deckId = params.deckId;
 const history = useHistory();
 const [deck, setDeck] = useState({});
 const studyPagePath = `/decks/${deckId}/study`;
 const addCardsPath = `/decks/${deckId}/cards/new`;
 
 useEffect(() => {
   const ac = new AbortController();
   async function fetchlistDecks() {
     const response = await readDeck(deckId, ac.signal);
     setDeck(response);
     console.log(response)
   }
   fetchlistDecks();
   return () => ac.abort();
 }, [deckId]);

 
  const handleDelete = (event) => {
    event.preventDefault();
    if(window.confirm(
      "Delete this deck? You will not be able to recover it."
      )
    ) {
      deleteDeck(deckId)
      history.push("/")
    }
  }



  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">{deck.name}</li>
        </ol>
      </nav>
      <h1>{deck.name}</h1>
      <p>{deck.description}</p>
      <div className="d-flex justify-content-between">
      <div>
      <Link to ={`/decks/${deckId}/edit`} type="button" className="btn btn-secondary mr-2">
        <Pencil /> Edit
      </Link>
      <Link className="btn btn-primary mr-2" to={studyPagePath}>
        <Book/> Study
      </Link>
      <Link to={addCardsPath} className="btn btn-primary mr-2">
        <PlusLg/> Add Cards
      </Link>
      </div>
      <button onClick={handleDelete} className="btn btn-danger m1-1">
        <Trash/>
      </button>
      </div>
      <div>
        <CardsList />
      </div>
    </>
  );
}
