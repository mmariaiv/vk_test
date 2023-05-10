import { Form } from "../components/Form.js";

export class FormSecond extends Form {
	constructor(
		{ callback, callbackReset, callbackPrevious },
		formSelector,
		nextSelector,
		resetSelector,
		previousSelector
	) {
		super({ callbackReset }, formSelector, resetSelector);
		this._callback = callback;
		this._callbackPrevious = callbackPrevious;
		this._nextButton = this._form.querySelector(nextSelector);
		this._chooseRoomList = this._form.querySelector("#choose_room");
		this._inputDate = this._form.querySelector("#booking-date");
		this._previousButtonSelector = this._form.querySelector(previousSelector);
	}

	generateOptions() {
		for (let i = 1; i <= 10; i++) {
			const newOption = document.createElement("option");
			newOption.textContent = `Комната ${i}`;
			newOption.value = `${i}-room`;
			this._chooseRoomList.appendChild(newOption);
		}
	}

	setMinValidDate() {
		const currentDate = new Date();

		this._inputDate.setAttribute("min", currentDate.toJSON().slice(0, 10));
	}

	setEventListeners() {
		super.setEventListeners();

		this._nextButton.addEventListener("click", () => {
			this._form.classList.remove("form-field_on");
			this._callback();
		});

		this._previousButtonSelector.addEventListener("click", () => {
			this._form.classList.remove("form-field_on");
			this._callbackPrevious();
		});
	}
}
