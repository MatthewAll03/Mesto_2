import { createCard, deleteItem } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import {
  handleEditSubmit,
  editProfileForm,
  enableValidation,
  clearValidation,
} from "./validation.js";

import { updateServerCards, toggleLike, updateAvatar } from "./api.js";

//import '../index.css';

const OpenEditProfilePopup = document.querySelector(".profile__edit-button");
export const editPopupElement = document.querySelector(".popup_type_edit");
const buttonCloseEditProfilePopup =
  editPopupElement.querySelector(".popup__close");

const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const addPopupElement = document.querySelector(".popup_type_new-card");
const buttonCloseAddCardPopup = addPopupElement.querySelector(".popup__close");

const imagePopupElement = document.querySelector(".popup_type_image");
const imageElement = document.querySelector(".popup__image");
const imageCaptionElement = document.querySelector(".popup__caption");

const buttonCloseImagePopup = imagePopupElement.querySelector(".popup__close");
export const formEditProfile = editPopupElement.querySelector(".popup__form");
export const formAddCard = addPopupElement.querySelector(".popup__form");

const cardList = document.querySelector(".places__list");

const addCardNameInput = document.querySelector(".popup__input_type_card-name");
const addCardUrlInput = document.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");

const avatarOverlay = document.querySelector(".avatar__overlay");
const changeAvatarPopup = document.querySelector(".popup_type_change_avatar");
const closeAvaratEditButton = changeAvatarPopup.querySelector(".popup__close");
const changeAvatarPopupInput = changeAvatarPopup.querySelector(
  ".popup__input_avatar"
);
const changeAvatarForm = changeAvatarPopup.querySelector(".popup__form");

export const addSubmitBtn = addPopupElement.querySelector(".button");
export const editSubmitBtn = editPopupElement.querySelector(".button");
export const changeAvatarSubmitBtn = changeAvatarForm.querySelector(".button");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

buttonOpenAddCardPopup.addEventListener("click", () => {
  formAddCard.reset();
  clearValidation(formAddCard, validationConfig);
  openModal(addPopupElement);
});

buttonCloseAddCardPopup.addEventListener("click", () => {
  closeModal(addPopupElement);
});

avatarOverlay.addEventListener("click", () => openModal(changeAvatarPopup));
closeAvaratEditButton.addEventListener("click", () =>
  closeModal(changeAvatarPopup)
);

changeAvatarForm.addEventListener("submit", (evt) => changeAvarar(evt));

function changeAvarar(evt) {
  evt.preventDefault();

  changeAvatarSubmitBtn.textContent = "Сохранение...";

  const avatarUrl = changeAvatarPopupInput.value;
  console.log(avatarUrl);

  updateAvatar(avatarUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector(
        ".profile__image"
      ).style.backgroundImage = `url('${data.avatar}')`;

      closeModal(changeAvatarPopup);
    });
}

changeAvatarSubmitBtn.textContent = "Да";

formEditProfile.addEventListener("submit", handleEditSubmit);
formAddCard.addEventListener("submit", handleAddSubmit);
buttonCloseImagePopup.addEventListener("click", () =>
  closeModal(imagePopupElement)
);

OpenEditProfilePopup.addEventListener("click", () => {
  clearValidation(formEditProfile, validationConfig);
  openModal(editPopupElement);
  editProfileForm();
});

buttonCloseEditProfilePopup.addEventListener("click", () => {
  closeModal(editPopupElement);
});

export function addCard(card) {
  cardList.append(card);
}

export function openImagePopup(evt) {
  openModal(imagePopupElement);
  imageElement.src = evt.target.src;
  imageCaptionElement.textContent = evt.target
    .closest(".card")
    .querySelector(".card__title").textContent;
  imageElement.alt = evt.target
    .closest(".card")
    .querySelector(".card__title").textContent;
}

function handleAddSubmit(evt) {
  evt.preventDefault();

  addSubmitBtn.textContent = "Сохранение..";

  const addInput = addCardNameInput.value;
  const urlInput = addCardUrlInput.value;

  updateServerCards(addInput, urlInput).then((newCardData) => {
    const createdCard = createCard(
      addInput,
      urlInput,
      deleteItem,
      toggleLike,
      openImagePopup,
      [],
      true,
      newCardData._id,
      newCardData.owner._id
    );
    placesList.prepend(createdCard);
    console.log(newCardData._id);
  });

  addSubmitBtn.textContent = "Сохранить";

  formAddCard.reset();
  closeModal(evt.target.closest(".popup"));

  formAddCard.reset();
}

enableValidation(validationConfig);
