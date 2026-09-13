const todoForm = document.querySelector("#date_form");

const uiController = (() => {

    const formModal = document.querySelector("#todo_modal");
    const dateInput = document.querySelector("#date_input");
    const titleInput = document.querySelector("#title_input");
    const infoInput = document.querySelector("#info_input");

    const todoContainer = document.querySelector(".todo_container")


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

    const openModal = () => {
        formModal.showModal();
    };

    const closeModal = () => {
        formModal.close();
    };


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


    const getTodoFormData = () => {
        return{
            id: todoForm.dataset.editId || null,
            title: titleInput.value,
            info: infoInput.value,
            date: dateInput.value
        };
    };

    const fillFormForEdit = (todoObject) => {

        openModal();

        titleInput.value = todoObject.title;
        dateInput.value = todoObject.date; 
        infoInput.value = todoObject.info;
        todoForm.dataset.editId = todoObject.id;
    }


    const resetFormMode = () => {
        todoForm.reset();
        delete todoForm.dataset.editId;
        // submitButton.textContent = "Send"; 
    };

    const updateTodoElement = (todoObject) => {
        const todoItem = document.querySelector(`.todo_container_item[data-id="${todoObject.id}"]`);
        if (todoItem) {
            todoItem.querySelector(".todo_container_item_heading p").textContent = todoObject.title;
            todoItem.querySelector(".date").textContent = todoObject.date.toLocaleDateString("pl-PL");
            todoItem.querySelector(".todo_container_item_description p").textContent = todoObject.info;
        }
        
        closeModal();

    };

    const deleteTodoElement = (todoObject) => { 
        const todoItem = document.querySelector(`.todo_container_item[data-id="${todoObject.id}"]`);

        todoItem.remove();

    }

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

    return { createTodo, showError, getTodoFormData, clearError, updateTodoElement, resetFormMode, fillFormForEdit, deleteTodoElement, closeModal, openModal};

})();

export default uiController;