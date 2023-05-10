export class Form {
	constructor({ callbackReset }, formSelector, resetSelector) {
		this._callbackReset = callbackReset;
		this._form = document.querySelector(formSelector);
		this._resetButton = this._form.querySelector(resetSelector);
	}

	setEventListeners() {
		this._resetButton.addEventListener("click", (e) => {
			this._callbackReset(e);
		});
	}
}
