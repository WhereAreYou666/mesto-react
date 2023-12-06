import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';

export default function DeleteCardPopup({ isOpen, onClose, onLoading, card, onCardDelete, onClickOverlay }) {

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  };
  
  return(
    <PopupWithForm
      name="delete" 
      title="Вы уверены?" 
      button={onLoading ? `Удаление...` : `Да`} 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      onClickOverlay={onClickOverlay} 
    />
  );
};