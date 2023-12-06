import React from 'react';
import {useContext} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onDeletePopup, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like ${isLiked && 'element__like_active'}` 
  );

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onDeletePopup(true);
    onCardDelete(card)
  };

  return (
    <>
      <img src={card.link} className="element__image" alt={card.name} onClick={handleClick} />
      <div className="element__container">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__likes">
          <button 
            className={cardLikeButtonClassName} 
            type="button" 
            aria-label="нравится" 
            onClick={handleLikeClick} 
            />
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && <button 
        className="element__delete" 
        type="button" 
        aria-label="удалить" 
        onClick={handleDeleteClick} />
      }
    </>
  );
};