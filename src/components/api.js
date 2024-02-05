import {
  profileDescriptionElement,
  profileNameElement,
  nameInputField,
  jobInputField,
} from "./validation.js";
import { createCard, deleteItem } from "./card.js";
import { openImagePopup, addCard } from "./index.js";

const profileLogo = document.querySelector(".profile__image");

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-5",
  headers: {
    authorization: "edb16b97-6be0-4f78-a95a-c2433202f688",
    "Content-Type": "application/json",
  },
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: `${config.headers.authorization}`,
    },
  }).then((res) => res.json());
};

const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: `${config.headers.authorization}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((res) => res.json());
};

Promise.all([getUser(), getInitialCards()]).then(([userData, cardsData]) => {
  profileNameElement.textContent = userData.name;
  profileDescriptionElement.textContent = userData.about;
  profileLogo.style.backgroundImage = `url('${userData.avatar}')`;
  const myId = userData._id;

  cardsData.forEach((card) => {
    const isOwner = card.owner._id === myId;
    const newCard = createCard(
      card.name,
      card.link,
      deleteItem,
      toggleLike,
      openImagePopup,
      card.likes,
      isOwner,
      card._id,
      card.owner._id
    );
    addCard(newCard);
  });
});

export const editServerValues = (name, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `${config.headers.authorization}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  }).catch((err) => {
    console.log(err);
  });
};

export const updateServerCards = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: `${config.headers.authorization}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export function sendDeleteRequest(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `${config.headers.authorization}`,
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    console.log(err);
  });
}

export function toggleLike(cardId, isLiked) {
  const type = isLiked ? "DELETE" : "PUT";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: type,
    headers: {
      Authorization: `${config.headers.authorization}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function updateAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      Authorization: `${config.headers.authorization}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).catch((err) => {
    console.log(err);
  });
}
