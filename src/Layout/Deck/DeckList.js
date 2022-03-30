import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { listDecks } from '../../utils/api';
import Deck from './Deck';
import { PlusLg } from 'react-bootstrap-icons';

export default function DeckList() {
    const [decks, setDecks] = useState([]);
    useEffect(() => {
        const ac = new AbortController();

        async function fetchDecks() {
            try {
                const response = await listDecks(ac.signal);
                setDecks(response);
            } catch (error) {
                if (error.type === "AbortError") {
                    console.log("aborted");
                } else {
                    console.log(error);
                }
            }
        }
        fetchDecks();
        return () => ac.abort();
    }, [])
    const list = decks.map(({id, name, description, cards, handleDelete}, index) => 
    <Deck 
    handleDelete={() => handleDelete(index)}
    key={index} 
    id={id} 
    name={name} 
    description={description} 
    cards={cards} 
    />
    );
    return (
        <div>
        <Link className="btn btn-secondary mb-2" to="/decks/new">
           <PlusLg/> Create Deck
        </Link>
        <div>
            {list}
        </div>
        </div>
        
    )
}