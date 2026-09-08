import './styles/style.css';
import TodoManager from './todoManager.js';


const todoManager = new TodoManager();

const todoForm = document.querySelector("#date_form");


todoForm.addEventListener("submit", (e) => todoManager.addTodo(e));