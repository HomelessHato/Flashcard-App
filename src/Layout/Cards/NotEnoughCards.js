import React from 'react';
import { Link } from 'react-router-dom'
export default function NotEnoughCards({ cards }) {
    return (
        <div>
            <h2>Not Enough Cards.</h2>
            <p>You need at least 3 cards to study. There are {cards.length} in this deck.</p>
            <Link to='' className="btn btn-primary">
                + Add Cards
            </Link>
        </div>
    )

}