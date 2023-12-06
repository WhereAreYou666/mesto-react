import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import DeleteCardPopup from './DeleteCardPopup.jsx';

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getAllInfo()
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards)
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  };

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
  };

  const isOpenPopup = 
    isEditAvatarPopupOpen || 
    isEditProfilePopupOpen || 
    isAddPlacePopupOpen || 
    isDeleteCardPopupOpen || 
    selectedCard;

  const closePopupByEscape = useCallback(function (e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  },[]);

  useEffect(() => {
    if (isOpenPopup) {
      document.addEventListener('keydown', closePopupByEscape);
    } else {
      document.removeEventListener('keydown', closePopupByEscape)
    }
  }, [isOpenPopup]);

  function closePopupByOverley(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    };
  };
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleCardDelete(card) {
    setIsLoading(true);
    api.removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api.editUserAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api.addNewCardPlace(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onDeletePopup={handleDeleteCardClick}
          onDeletedCard={setDeletedCard}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
          onClickOverlay={closePopupByOverley}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
          onClickOverlay={closePopupByOverley}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
          onClickOverlay={closePopupByOverley}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onLoading={isLoading}
          card={deletedCard}
          onCardDelete={handleCardDelete}
          onClose={closeAllPopups}
          onClickOverlay={closePopupByOverley}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onClickOverlay={closePopupByOverley}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};