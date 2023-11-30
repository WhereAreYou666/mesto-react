import React from 'react';
import api from '../utils/Api';
import Card from './Card';
import {useState, useEffect} from "react";

export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getAllInfo()
      .then(([user, cards]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(cards)
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <>
      <main className="main">
        <section className="profile">
          <button 
            className="profile__new-avatar" 
            type="button" 
            onClick={onEditAvatar}
             />
          <div 
            className="profile__avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
          />
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{userName}</h1>
              <button 
                className="profile__edit-button" 
                type="button" 
                aria-label="Edit Profile" 
                onClick={onEditProfile} />
            </div>
            <h2 className="profile__subtitle">{userDescription}</h2>
          </div>
          <button 
            className="profile__add-button" 
            type="button" 
            aria-label="Add Place" 
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
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}