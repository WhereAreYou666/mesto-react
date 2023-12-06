import React from 'react';
import {useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import CurrentUserContext from '../contexts/CurrentUserContext.js';


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading, onClickOverlay }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value)
  };
  
  function handleChangeDescription(e) {
    setDescription(e.target.value)
  };

  function handleSumbitEditProfile(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSumbitEditProfile} 
      button={onLoading ? `Сохранение...` : `Сохранить`} 
      onClickOverlay={onClickOverlay} 
    >
      <input 
        className="popup__input popup__input_type_name" 
        id="username" 
        type="text" 
        name="username" 
        placeholder="Ваше имя" 
        minLength={2} 
        maxLength={40} 
        required 
        value={name || ""}
        onChange={handleChangeName} />
      <span className="popup__error popup__error_visible" id="username-error" />
      <input 
        className="popup__input popup__input_type_info" 
        id="userinfo" 
        type="text" 
        name="userinfo" 
        placeholder="О себе" 
        minLength={2} 
        maxLength={200} 
        required 
        value={description || ""}         
        onChange={handleChangeDescription} 
        />
      <span className="popup__error popup__error_visible" id="userinfo-error" />
    </PopupWithForm>
  );
};