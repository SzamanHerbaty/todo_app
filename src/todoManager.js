import Todo from "./todo.js";
import {validateAndConvertDate} from './utilities/dateConversion.js';


class TodoManager{
    
    #todos;

    constructor(){
        this.#todos = [];
    }

    saveToLocalStorage(todoObject){
        
        const key = todoObject.id;
        
        localStorage.setItem(key, JSON.stringify(todoObject));

        console.log(localStorage);

    }

    addTodo(e){
        e.preventDefault();
        
        const rawData = uiController.getTodoFormData();
        
        uiController.clearError();

        try {

            console.log(rawData);

            const validDate = validateAndConvertDate(rawData.date);
        
            const newTodo = new Todo(rawData.title, rawData.date, rawData.info);

            this.#todos.push(newTodo);

            this.saveToLocalStorage(newTodo);

            console.log(newTodo);

           uiController.createTodo(newTodo);
        
        } catch (error) {
            uiController.showError(error.message);
        }
                

    }

}   

export default TodoManager;