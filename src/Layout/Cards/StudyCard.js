import React from 'react';

export default function StudyCard({front, back, cardIndex, totalCards, side, handleNext, flipHandler}){
    return (
        <div className='border'>
        <div className='mr-2'>
        <h5> Card {cardIndex + 1} of {totalCards}</h5>
        <p>{side ? back : front }</p>
        </div>
        <button className='btn btn-secondary mr-2 ml-2 mb-2' onClick={flipHandler}>Flip</button>
        {side ? <button className='btn btn-primary mr-2 ml-2 mb-2' onClick={handleNext}>Next</button> : null}
        </div>
        
    )
}