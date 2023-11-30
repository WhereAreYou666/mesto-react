import React from 'react';

export default function Card({ card, onCardClick }) {

  function handleClick() {
    onCardClick(card);
  }
  return (
    <>
      <img src={card.link} className="element__image" alt={card.name} onClick={handleClick} />
      <div className="element__container">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__likes">
          <button className="element__like" type="button" aria-label="like" />
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
      <button
        className="element__delete" 
        type="button" 
        aria-label="delete"
      />
    </>
  )
}