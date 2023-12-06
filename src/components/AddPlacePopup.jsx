import React from 'react';
import {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm.jsx';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading, onClickOverlay }) {
  const [nameNewCard, setNameNewCard] = useState("");
  const [linkNewCard, setLinkNewCard] = useState("");

  useEffect(() => {
    setNameNewCard("")
    setLinkNewCard("")
  }, [isOpen])
    
  function handleNewCardNameChange(e) {
    setNameNewCard(e.target.value);
  };

  function handleNewCardLinkChange(e) {
    setLinkNewCard(e.target.value);
  };

  function handleAddNewCardSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameNewCard, 
      link: linkNewCard
    });
  };

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      button={onLoading ? `Создание...` : `Создать`}
      isOpen={isOpen}
      onClose={onClose} 
      onSubmit={handleAddNewCardSubmit} 
      onClickOverlay={onClickOverlay} 
    >
      <input 
        className="popup__input popup__input_type_placename" 
        id="placename" 
        type="text" 
        name="placename" 
        placeholder="Название" 
        minLength={2} 
        maxLength={30} 
        required 
        value={nameNewCard || ""} 
        onChange={handleNewCardNameChange} 
      />
      <span className="popup__error popup__error_visible" id="placename-error" />
      <input 
        className="popup__input popup__input_type_placelink" 
        id="placelink" 
        type="url" 
        name="placelink" 
        placeholder="Ссылка на картинку" 
        required 
        value={linkNewCard || ""} 
        onChange={handleNewCardLinkChange} 
      />
      <span className="popup__error popup__error_visible" id="placelink-error" />
    </PopupWithForm>
  );
};

export default AddPlacePopup;