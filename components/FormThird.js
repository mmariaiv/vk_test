import { Form } from "../components/Form.js";

export class FormThird extends Form {
	constructor(
		{ callback, callbackReset, callbackPrevious },
		formSelector,
		submitSelector,
		resetSelector,
		previousSelector
	) {
		super({ callbackReset }, formSelector, resetSelector);
		this._callback = callback;
		this._callbackPrevious = callbackPrevious;
		this._submitSelector = this._form.querySelector(submitSelector);
		this._previousButtonSelector = this._form.querySelector(previousSelector);
	}

	setEventListeners() {
		super.setEventListeners();

		this._submitSelector.addEventListener("click", (evt) => {
			this._form.classList.remove("form-field_on");
			this._callback(evt);
		});

		this._previousButtonSelector.addEventListener("click", (evt) => {
			this._form.classList.remove("form-field_on");
			this._callbackPrevious(evt);
		});
	}
}
