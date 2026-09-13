import './styles/style.css';
import TodoManager from './todoManager.js';


const todoManager = new TodoManager();




todoForm.addEventListener("submit", (e) => todoManager.addTodo(e));