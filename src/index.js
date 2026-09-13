import './styles/style.css';
import TodoManager from './todoManager.js';
import uiController from "./UI.js";

const todoManager = new TodoManager();

const todoForm = document.querySelector("#date_form");
const closeBtn = document.querySelector(".close_modal_button");
const addTodoBtn = document.querySelector(".add_todo_btn");

todoManager.restoreFromLocalStorage();


todoForm.addEventListener("submit", (e) => todoManager.addTodo(e));

const todoContainer = document.querySelector(".todo_container");

todoContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("edit_btn")) {

        const todoItem = e.target.closest(".todo_container_item");
        const id = todoItem.dataset.id;

        todoManager.triggerEdit(id); 
    }

    if (e.target.classList.contains("delete_btn")) {

        const todoItem = e.target.closest(".todo_container_item");

        console.log(todoItem);


        todoManager.deleteTodo(todoItem.dataset.id);

    }
});

closeBtn.addEventListener("click", () => {
    uiController.closeModal();
    console.log("Przycisk zamykania został kliknięty!");
    
    uiController.resetFormMode(); 
});

addTodoBtn.addEventListener("click", () => {
    uiController.openModal();
});


