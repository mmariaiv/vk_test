import { FormFirst } from "../components/FormFirst.js";
import { FormSecond } from "../components/FormSecond.js";
import { FormThird } from "../components/FormThird.js";
import { FormValidator } from "../components/FormValidator.js";
import {
	form,
	formValidationSetting,
	formFieldsetFirstSelector,
	formFieldsetSecondSelector,
	nextButton,
	resetButton,
	previousButton,
	formFieldsetThirdSelector,
	formFieldInputs,
	lastPage,
	resetAllFormButton,
} from "../utils/constants.js";

const validation = new FormValidator(
	formValidationSetting,
	document.querySelector(form)
);
validation.enableValidation();

const firstForm = new FormFirst(
	{
		callback: (evt) => {
			evt.preventDefault();
			document
				.querySelector(".form-field_choose-room")
				.classList.add("form-field_on");
		},
		callbackReset: (evt) => {
			evt.preventDefault();
			validation.resetValidation(0);
		},
	},
	formFieldsetFirstSelector,
	nextButton,
	resetButton
);

const middleForm = new FormSecond(
	{
		callback: () => {
			document
				.querySelector(".form-field_final")
				.classList.add("form-field_on");
		},

		callbackReset: (evt) => {
			evt.preventDefault();
			validation.resetValidation(1);
		},

		callbackPrevious: () => {
			document
				.querySelector(".form-field_choose-tower-section")
				.classList.add("form-field_on");
		},
	},
	formFieldsetSecondSelector,
	nextButton,
	resetButton,
	previousButton
);

const lastForm = new FormThird(
	{
		callback: (evt) => {
			evt.preventDefault();
			let data = {};

			Array.from(document.querySelectorAll(formFieldInputs)).forEach(
				(inputValue) => {
					data[inputValue.id] = inputValue.value;
				}
			);

			console.log(JSON.stringify(data));
			resetAll();
		},

		callbackReset: (evt) => {
			evt.preventDefault();
			validation.resetValidation(2);
		},

		callbackPrevious: () => {
			document
				.querySelector(".form-field_choose-room")
				.classList.add("form-field_on");
		},
	},
	formFieldsetThirdSelector,
	nextButton,
	resetButton,
	previousButton
);

firstForm.generateOptions();
firstForm.setEventListeners();

middleForm.generateOptions();
middleForm.setMinValidDate();
middleForm.setEventListeners();

lastForm.setEventListeners();

function resetAll() {
	lastPage.classList.remove("final-message_off");
	resetAllFormButton.addEventListener("click", () => {
		document.querySelector(form).reset();
		lastPage.classList.add("final-message_off");
		document
			.querySelector(formFieldsetFirstSelector)
			.classList.add("form-field_on");
	});
}
