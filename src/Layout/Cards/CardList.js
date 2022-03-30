import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom"
import { readDeck } from '../../utils/api';
import Card from './Card';

export default function CardsList(){
    const [cards, setCards] = useState([]);
    const params = useParams();
    const deckId = params.deckId;

useEffect(() => {
    const ac = new AbortController();

    async function fetchCards(){
        const response = await readDeck(deckId, ac.signal)
        setCards(response.cards)
    }
    fetchCards();
},[deckId])

const cardMap = cards.map(({ id, front, back, deckId}, index) => (
    <Card 
    key={index}
    id={id}
    front={front}
    back={back}
    deckId={deckId}
    />
))
    return (
        <div>
            <h1>Cards</h1>
            <div>{cardMap}</div>
        </div>
    )
}