const cardTemplate = document.querySelector("#card-template").content;
import { openModal, closeModal } from "./modal.js";
import { sendDeleteRequest, toggleLike } from "./api.js";
const confirmDelete = document.querySelector(".popup_type_confirm-delete");

export function createCard(
  name,
  link,
  deleteItem,
  toggleLike,
  openImagePopup,
  likes,
  isOwner,
  cardId,
  userId
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const likeBtn = cardElement.querySelector(".card__like-button");
  const cardName = name;
  const cardImg = cardElement.querySelector(".card__image");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = cardName;
  cardImg.src = link;
  cardImg.alt = cardName;

  likeCounter.textContent = likes.length;

  likes.forEach((user) => {
    if (user._id == userId) {
      likeBtn.classList.add("card__like-button_is-active");
    }
  });

  likeBtn.addEventListener("click", (evt) => {
    const isAlreadyLiked = evt.target.classList.contains(
      "card__like-button_is-active"
    );

    evt.target.classList.toggle("card__like-button_is-active");

    toggleLike(cardId, isAlreadyLiked).then((data) => {
      likes = data.likes;
      likeCounter.textContent = likes.length;
    });
  });

  cardImg.addEventListener("click", openImagePopup);

  if (isOwner) {
    deleteBtn.addEventListener("click", () =>
      openConfirmDeletePopup(cardElement, cardId)
    );
  } else {
    deleteBtn.remove();
  }

  return cardElement;
}

export function deleteItem(event) {
  const deleteItem = event.target.closest(".places__item");
  deleteItem.remove();
}

export function openConfirmDeletePopup(card, cardId) {
  openModal(confirmDelete);
  const confirmDeletePopup = document.querySelector(
    ".popup_type_confirm-delete"
  );
  const confirmButton = confirmDeletePopup.querySelector(
    ".popup__button_confirm-delete"
  );
  const closeConfirmDelete = confirmDeletePopup.querySelector(".popup__close");

  closeConfirmDelete.addEventListener("click", () => closeModal(confirmDelete));

  confirmButton.addEventListener("click", () =>
    handleDeleteRequest(card, cardId)
  );
}

function handleDeleteRequest(card, cardId) {
  sendDeleteRequest(cardId)
    .then((response) => {
      response.json();
      console.log(response);
    })
    .then(() => {
      card.remove();
      closeModal(confirmDelete);
    });
}
