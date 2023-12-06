import React from 'react';
import {useRef} from 'react';
import PopupWithForm from './PopupWithForm.jsx';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading, onClickOverlay }) {
  const avatarInputRef = useRef();

  function handleSumbit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  };

  React.useEffect(() => {
    avatarInputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="new-avatar" 
      title="Обновить аватар" 
      button={onLoading ? `Обновление...` : `Обновить`} 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSumbit} 
      onClickOverlay={onClickOverlay} 
    >
      <input 
        className="popup__input popup__input_type_avatar" 
        id="avatar" 
        type="url" 
        name="avatar" 
        placeholder="Ссылка на аватар" 
        required 
        ref={avatarInputRef || ""} 
      />
      <span className="popup__error popup__error_visible" id="avatar-error" />
    </PopupWithForm>
  );
};