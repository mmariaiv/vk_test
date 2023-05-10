import { Form } from "../components/Form.js";

export class FormFirst extends Form {
	constructor(
		{ callback, callbackReset },
		formSelector,
		nextSelector,
		resetSelector
	) {
		super({ callbackReset }, formSelector, resetSelector);
		this._callback = callback;
		this._nextButton = this._form.querySelector(nextSelector);
		this._chooseFloorList = this._form.querySelector("#choose_floor");
	}

	generateOptions() {
		for (let i = 3; i <= 27; i++) {
			const newOption = document.createElement("option");
			newOption.textContent = `${i} Этаж`;
			newOption.value = `${i}-floor`;
			this._chooseFloorList.appendChild(newOption);
		}
	}

	setEventListeners() {
		super.setEventListeners();

		this._nextButton.addEventListener("click", (e) => {
			this._form.classList.remove("form-field_on");
			this._callback(e);
		});
	}
}
