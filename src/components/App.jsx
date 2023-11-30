import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);  
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({})
  

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }
  
  return (
    <div className="page">
      <Header />
      <Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />          
      <Footer />
      
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        button="Сохранить"
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
      >
        <input className="popup__input popup__input_type_name" id="username" type="text" name="username" placeholder="Ваше имя" minLength={2} maxLength={40} required />
        <span className="popup__error popup__error_visible" id="username-error" />
        <input className="popup__input popup__input_type_info" id="userinfo" type="text" name="userinfo" placeholder="О себе" minLength={2} maxLength={200} required />
        <span className="popup__error popup__error_visible" id="userinfo-error" />
      </PopupWithForm>

      <PopupWithForm
        name="add-place"
        title="Новое место"
        button="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input className="popup__input popup__input_type_placename" id="placename" type="text" name="placename" placeholder="Название" minLength={2} maxLength={30} required />
        <span className="popup__error popup__error_visible" id="placename-error" />
        <input className="popup__input popup__input_type_placelink" id="placelink" type="url" name="placelink" placeholder="Ссылка на картинку" required />
        <span className="popup__error popup__error_visible" id="placelink-error" />
      </PopupWithForm>

      <PopupWithForm
        name="new-avatar"
        title="Обновить аватар"
        button="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input className="popup__input popup__input_type_avatar" id="avatar" type="url" name="avatar" placeholder="Ссылка на аватар" required />
        <span className="popup__error popup__error_visible" id="avatar-error" />
      </PopupWithForm>

      <PopupWithForm
        name="delete" 
        title="Вы уверены?" 
        button="Да"
        onClose={closeAllPopups}
      />
      <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  )
}