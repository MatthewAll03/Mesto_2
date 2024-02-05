export const nameInputField = document.querySelector(".popup__input_type_name");
export const jobInputField = document.querySelector(
  ".popup__input_type_description"
);
export let profileNameElement = document.querySelector(".profile__title");
export let profileDescriptionElement = document.querySelector(
  ".profile__description"
);

import { closeModal } from "./modal.js";
import { editSubmitBtn } from "./index.js";
import { editServerValues } from "./api.js";

export function handleEditSubmit(evt) {
  evt.preventDefault();

  editSubmitBtn.textContent = "Сохранение...";

  const name = nameInputField.value;
  const job = jobInputField.value;
  profileNameElement.textContent = name;
  profileDescriptionElement.textContent = job;

  editServerValues(name, job);

  editSubmitBtn.textContent = "Сохранить";

  closeModal(evt.target.closest(".popup"));
}

export function editProfileForm() {
  nameInputField.value = profileNameElement.textContent;
  jobInputField.value = profileDescriptionElement.textContent;
}

function getErrorMessage(inputElement) {
  let errorMessage = "";
  if (inputElement.validity.valueMissing) {
    errorMessage = "Вы пропустили это поле.";
  } else if (inputElement.validity.typeMismatch) {
    errorMessage = "Введите адрес сайта.";
  } else if (inputElement.validity.patternMismatch) {
    errorMessage = inputElement.dataset.errorMessage;
  } else {
    errorMessage = inputElement.validationMessage;
  }
  return errorMessage;
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const showInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
  errorElement.textContent = getErrorMessage(inputElement);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

function setEventListener(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );

  const submitButton = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, submitButton, settings);
    });
  });
}

export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement, settings);
  });
}

export function clearValidation(profileForm, settings) {
  const errorElements = profileForm.querySelectorAll(`.${settings.errorClass}`);
  errorElements.forEach((errorElement) => {
    errorElement.textContent = "";
    errorElement.classList.remove(settings.errorClass);
  });

  const errorLine = profileForm.querySelectorAll(
    `.${settings.inputErrorClass}`
  );
  errorLine.forEach((line) => {
    line.classList.remove(settings.inputErrorClass);
  });

  const buttonsContainer = profileForm.querySelector(
    settings.submitButtonSelector
  );
  buttonsContainer.classList.add(settings.inactiveButtonClass);
}
