const todoForm = document.querySelector("#date_form");

/**
 * Moduł odpowiedzialny wyłącznie za manipulację drzewem DOM i renderowanie widoku.
 * @namespace uiController
 */

const uiController = (() => {

    const formModal = document.querySelector("#todo_modal");
    const dateInput = document.querySelector("#date_input");
    const titleInput = document.querySelector("#title_input");
    const infoInput = document.querySelector("#info_input");

    const todoContainer = document.querySelector(".todo_container")

    /**
     * Przypisuje klasę odpowiadająca za kolor tła w zależności od priorytetu 
     @memberof uiController
    */

    const priorityCheck = (priority) =>{
        switch (priority){
            case "Low":
                return "green_bg";
            case "Medium":
                return "orange_bg";
            case "High":
                return "red_bg";    
        }
    }

    /**
     * Otwiera formularz
     @memberof uiController
    */

    const openModal = () => {
        formModal.showModal();
    };

    /**
     * Zamyka Formularz
     @memberof uiController
    */

    const closeModal = () => {
        formModal.close();
    };

    /**
     * Tworzy strukture HTML dla nowego zadania i dodaje ją do głównego kontenera.
     @memberof uiController
    * @param {Object} todoObject - Pełna instancja obiektu reprezentującego zadanie.
     */

    const createTodo = (todoObject) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo_container_item");
        todoItem.dataset.id = todoObject.id;

        const todoMain = document.createElement("div");
        todoMain.classList.add("todo_container_item_main");

        const todoHeading = document.createElement("div");
        todoHeading.classList.add("todo_container_item_heading");

        const statusInput = document.createElement("input");
        statusInput.type = "checkbox";
        statusInput.classList.add("status_input");
        statusInput.checked = todoObject.status;

        const title = document.createElement("p");
        title.textContent = todoObject.title;

        todoHeading.append(statusInput, title);

        const todoButtons = document.createElement("div");
        todoButtons.classList.add("todo_container_item_buttons");

        const todoDate = document.createElement("div");
        todoDate.classList.add("todo_date");
        todoDate.append("Due date: ");

        const date = document.createElement("span");
        date.classList.add("date");
        const dateObj = new Date(todoObject.date);
        date.textContent = dateObj.toLocaleDateString("pl-PL");
        todoDate.append(date);

        const priority = document.createElement("div");
        priority.classList.add("todo_priority");
        priority.classList.add(priorityCheck(todoObject.priority)); 
        priority.textContent = `Priority: ${todoObject.priority}`;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete_btn");
        deleteButton.textContent = "Delete";

        const editButton = document.createElement("button");
        editButton.classList.add("edit_btn");
        editButton.textContent = "Edit Todo";

        todoButtons.append(todoDate, priority, deleteButton, editButton);
        todoMain.append(todoHeading, todoButtons);

        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("todo_container_item_description");

        const description = document.createElement("p");
        description.textContent = todoObject.info;
        descriptionContainer.append(description);

        todoItem.append(todoMain, descriptionContainer);

        todoContainer.append(todoItem);

        closeModal();

    }

    /**
     * Wysyłą obiekt z danymi podane w formularzu (tytuł, opis, date).
     @memberof uiController
    * @returns {Object} Obiekt zawierający klucze: id, title, info oraz date.
     */

    const getTodoFormData = () => {
        return{
            id: todoForm.dataset.editId || null,
            title: titleInput.value,
            info: infoInput.value,
            date: dateInput.value
        };
    };

    /**
     * Wypełnia formularz danymi zadania które chcemy zedytować.
     @memberof uiController
    * @param {Object} todoObject - Obiekt który chcemy zedytować.
     */

    const fillFormForEdit = (todoObject) => {

        openModal();

        titleInput.value = todoObject.title;
        dateInput.value = todoObject.date; 
        infoInput.value = todoObject.info;
        todoForm.dataset.editId = todoObject.id;
    }

    /**
     * Resetuje formularz i usuwa mu editId aby wysłanie formularza nie było potraktowane jako edycja 
     @memberof uiController
    */

    const resetFormMode = () => {
        todoForm.reset();
        delete todoForm.dataset.editId;
        // submitButton.textContent = "Send"; 
    };
    
    /**
     * Aktualizuje inforamacje o zadaniu danymi podanymi w formularzu
     @memberof uiController
    * @param {Object} todoObject - zadanie które zostało zaktualizowane
     */

    const updateTodoElement = (todoObject) => {
        const todoItem = document.querySelector(`.todo_container_item[data-id="${todoObject.id}"]`);
        if (todoItem) {
            todoItem.querySelector(".todo_container_item_heading p").textContent = todoObject.title;
            todoItem.querySelector(".date").textContent = todoObject.date.toLocaleDateString("pl-PL");
            todoItem.querySelector(".todo_container_item_description p").textContent = todoObject.info;
        }
        
        closeModal();

    };

    /**
     * Ususwa zadania z UI
     @memberof uiController
    * @param {Object} todoObject - zadanie do usunięcia
     */

    const deleteTodoElement = (todoObject) => { 
        const todoItem = document.querySelector(`.todo_container_item[data-id="${todoObject.id}"]`);

        todoItem.remove();

    }

    /**
     * Usuwa inforamcje o błędach
     @memberof uiController
    */

    const clearError = () => {
        const errorDisplay = document.querySelector("#error_message");
        errorDisplay.style.padding = "0";
        errorDisplay.textContent = "";
    };

    /**
     * Pokazuje błąd
     @memberof uiController
    */

    const showError = (message) => {
        const errorDisplay = document.querySelector("#error_message");
        errorDisplay.textContent = message;
        errorDisplay.style.color = "red";
        errorDisplay.style.padding = "10px 50px";

        setTimeout(clearError, 5000);

    };

    return { createTodo, showError, getTodoFormData, clearError, updateTodoElement, resetFormMode, fillFormForEdit, deleteTodoElement, closeModal, openModal};

})();

export default uiController;