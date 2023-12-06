import React from 'react';
import {useContext} from "react";
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Card from './Card';

export default function Main({ 
  onEditAvatar, 
  onEditProfile, 
  onAddPlace, 
  cards, 
  onCardClick, 
  onCardLike, 
  onDeletePopup, 
  onDeletedCard 
}) {
  
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <>
      <main className="main">
        <section className="profile">
          <button 
            className="profile__new-avatar" 
            type="button" 
            onClick={onEditAvatar}
             />
          <img  
            className="profile__avatar"
            src={currentUser?.avatar}
            alt='Фото профиля'
          />
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{currentUser?.name}</h1>
              <button 
                className="profile__edit-button" 
                type="button" 
                aria-label="Редактировать профиль" 
                onClick={onEditProfile} />
            </div>
            <h2 className="profile__subtitle">{currentUser?.about}</h2>
          </div>
          <button 
            className="profile__add-button" 
            type="button" 
            aria-label="Добавить фото" 
            onClick={onAddPlace} 
          />
        </section>
        <section className="elements">
          <ul className="elements__list">
            {cards.map((card) => (
              <li className="element" key={card._id}>
                <Card
                  card={card} 
                  onCardClick={onCardClick} 
                  onCardLike={onCardLike} 
                  onDeletePopup={onDeletePopup} 
                  onCardDelete={onDeletedCard} 
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};