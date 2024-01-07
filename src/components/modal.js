export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  window.addEventListener("keydown", handleEscapePress);
  popup.addEventListener("click", handleOverlayClick);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  window.removeEventListener("keydown", handleEscapePress);
  popup.removeEventListener("click", handleOverlayClick);
  popup.classList.remove("popup_is-animated");
}

function handleEscapePress(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closeModal(openedPopup);
  }
}

function handleOverlayClick(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(openedPopup);
  }
}
