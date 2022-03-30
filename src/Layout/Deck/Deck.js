import React from 'react';
import {Link, useHistory} from "react-router-dom"
import { deleteDeck } from '../../utils/api';
import { Trash, Eye, Book } from 'react-bootstrap-icons';

export default function Deck({ id, name, description, cards }){
    const studyPagePath = `/decks/${id}/study`;
    const { go } = useHistory();
    const handleDelete = (e) => {
        e.preventDefault();
        if(window.confirm("Delete this deck? You will not be able to recover it.")){
            deleteDeck(id);
            go(0);
        }
    }
    return (
        <div className='border'>
        <div className='d-flex justify-content-between'>
        <h5>{name}</h5>
        <p className='mr-2'>{cards.length} cards</p>
        </div>
        <p>{description}</p>
        <div className='d-flex justify-content-between'>
        <div>
        <Link className="btn btn-secondary mr-2 mb-2" to={`/decks/${id}`}><Eye/> View</Link>
        <Link className="btn btn-primary mr-2 mb-2" to={studyPagePath}><Book/> Study</Link>
        </div>
        <button onClick={handleDelete} className="btn btn-danger mb-2"><Trash/></button>
        </div>
        </div>
    )
}