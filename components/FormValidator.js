export class FormValidator {
	constructor(setting, formElement) {
		this._formSelector = setting.formSelector;
		this._fieldSetSelector = setting.fieldSetSelector;
		this._inputSelector = setting.inputSelector;
		this._nextButtonSelector = setting.nextButtonSelector;
		this._inactiveButtonClass = setting.inactiveButtonClass;
		this._inputErrorClass = setting.inputErrorClass;
		this._errorClass = setting.errorClass;
		this._formElement = formElement;
	}

	enableValidation() {
		this._setEventListeners();
	}

	resetValidation(formFieldNumber) {
		Array.from(
			this._formElement.querySelectorAll(this._fieldSetSelector)
		).forEach((fieldSet, key) => {
			if (key != formFieldNumber) {
				return;
			}

			Array.from(fieldSet.querySelectorAll(this._inputSelector)).forEach(
				(inputElement) => {
					inputElement.value = "";
				}
			);

			this._toggleButtonState(fieldSet);
		});
	}

	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	}

	_showInputError(inputElement, errorMessage) {
		const errorElement = this._formElement.querySelector(
			`.${inputElement.id}-error`
		);
		if (errorElement) {
			errorElement.textContent = errorMessage;
			errorElement.classList.add(this._errorClass);
		}

		inputElement.classList.add(this._inputErrorClass);
	}

	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(
			`.${inputElement.id}-error`
		);
		if (errorElement) {
			errorElement.classList.remove(this._errorClass);
			errorElement.textContent = "";
		}

		inputElement.classList.remove(this._inputErrorClass);
	}

	_setEventListeners() {
		Array.from(
			this._formElement.querySelectorAll(this._fieldSetSelector)
		).forEach((fieldSet) => {
			Array.from(fieldSet.querySelectorAll(this._inputSelector)).forEach(
				(inputElement) => {
					inputElement.addEventListener("input", () => {
						this._checkInputValidity(inputElement);
						this._toggleButtonState(fieldSet);
					});
				}
			);
		});
	}

	_hasInvalidInput(fieldSet) {
		return Array.from(fieldSet.querySelectorAll(this._inputSelector)).some(
			(inputElement) => {
				return !inputElement.validity.valid;
			}
		);
	}

	_toggleButtonState(fieldSet) {
		const button = fieldSet.querySelector(this._nextButtonSelector);
		if (this._hasInvalidInput(fieldSet)) {
			button.classList.add(this._inactiveButtonClass);
			button.setAttribute("disabled", "disabled");
		} else {
			button.classList.remove(this._inactiveButtonClass);
			button.removeAttribute("disabled", "disabled");
		}
	}
}
