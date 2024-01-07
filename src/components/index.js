import { createCard, deleteItem, likeCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";

import '../index.css';

const OpenEditProfilePopup = document.querySelector(".profile__edit-button");
const editPopupElement = document.querySelector(".popup_type_edit");
const buttonCloseEditProfilePopup =
  editPopupElement.querySelector(".popup__close");

const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const addPopupElement = document.querySelector(".popup_type_new-card");
const buttonCloseAddCardPopup = addPopupElement.querySelector(".popup__close");

const imagePopupElement = document.querySelector(".popup_type_image");
const imageElement = document.querySelector(".popup__image");
const imageCaptionElement = document.querySelector(".popup__caption");

const buttonCloseImagePopup = imagePopupElement.querySelector(".popup__close");
const formEditProfile = editPopupElement.querySelector(".popup__form");
const formAddCard = addPopupElement.querySelector(".popup__form");

const cardList = document.querySelector(".places__list");

const nameInputField = document.querySelector(".popup__input_type_name");
const jobInputField = document.querySelector(".popup__input_type_description");
const profileNameElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const addCardNameInput = document.querySelector(".popup__input_type_card-name");
const addCardUrlInput = document.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");

buttonOpenAddCardPopup.addEventListener("click", () =>
  openModal(addPopupElement)
);
buttonCloseAddCardPopup.addEventListener("click", () =>
  closeModal(addPopupElement)
);
formEditProfile.addEventListener("submit", handleEditSubmit);
formAddCard.addEventListener("submit", handleAddSubmit);
buttonCloseImagePopup.addEventListener("click", () =>
  closeModal(imagePopupElement)
);

OpenEditProfilePopup.addEventListener("click", () => {
  openModal(editPopupElement);
  editProfileForm();
});

buttonCloseEditProfilePopup.addEventListener("click", () => {
  closeModal(editPopupElement);
});

function addCard(card) {
  cardList.append(card);
}

function openImagePopup(evt) {
  openModal(imagePopupElement);
  imageElement.src = evt.target.src;
  imageCaptionElement.textContent = evt.target
    .closest(".card")
    .querySelector(".card__title").textContent;
  imageElement.alt = evt.target
    .closest(".card")
    .querySelector(".card__title").textContent;
}

function editProfileForm() {
  nameInputField.value = profileNameElement.textContent;
  jobInputField.value = profileDescriptionElement.textContent;
}

function handleEditSubmit(evt) {
  evt.preventDefault();

  const name = nameInputField.value;
  const job = jobInputField.value;

  profileNameElement.textContent = name;
  profileDescriptionElement.textContent = job;

  closeModal(evt.target.closest(".popup"));
}

function handleAddSubmit(evt) {
  evt.preventDefault();

  const addInput = addCardNameInput.value;
  const urlInput = addCardUrlInput.value;

  const createdCard = createCard(
    addInput,
    urlInput,
    deleteItem,
    likeCard,
    openImagePopup
  );

  placesList.prepend(createdCard);

  closeModal(evt.target.closest(".popup"));

  formAddCard.reset();
}

initialCards.forEach((element) => {
  const newCard = createCard(
    element.name,
    element.link,
    deleteItem,
    likeCard,
    openImagePopup
  );
  addCard(newCard);
});
