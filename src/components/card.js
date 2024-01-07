const cardTemplate = document.querySelector("#card-template").content;

export function createCard(name, link, deleteItem, likeCard, openImagePopup) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const likeBtn = cardElement.querySelector(".card__like-button");
  const cardName = name;
  const cardImg = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = cardName;
  cardImg.src = link;
  cardImg.alt = cardName;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteItem);

  likeBtn.addEventListener("click", likeCard);
  cardImg.addEventListener("click", openImagePopup);

  return cardElement;
}

export function deleteItem(event) {
  const deleteItem = event.target.closest(".places__item");
  deleteItem.remove();
}

export function likeCard(evt) {
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    evt.target.classList.add("card__like-button_is-active");
  } else {
    evt.target.classList.remove("card__like-button_is-active");
  }
}
