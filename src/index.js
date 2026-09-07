import './styles/style.css';
import {validateAndConvertDate} from './utilities/dateConversion.js';

const dateForm = document.querySelector("#date_form")

const uiController = (() => {

    const clearError = () => {
        const errorDisplay = document.querySelector("#error_message");
        errorDisplay.style.padding = "0";
        errorDisplay.textContent = "";
    };

    const showError = (message) => {
        const errorDisplay = document.querySelector("#error_message");
        errorDisplay.textContent = message;
        errorDisplay.style.color = "red";
        errorDisplay.style.padding = "10px 50px";

        setTimeout(clearError, 5000);

    };

    return { showError, clearError };

})();

function handleToSubmit(e) {
    e.preventDefault();
    const dateInput = document.querySelector("#date_input")

    uiController.clearError();

    try {
        const validDate = validateAndConvertDate(dateInput.value);

        console.log("Dodano zadanie z datą:", validDate);

    } catch (error) {
        uiController.showError(error.message);
    }

}

dateForm.addEventListener("submit", handleToSubmit);