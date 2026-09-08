import Todo from "./todo.js";
import {validateAndConvertDate} from './utilities/dateConversion.js';
import uiController from "./UI.js";

class TodoManager{
    
    #todos;

    constructor(){
        this.#todos = [];
    }

    addTodo(e){
        e.preventDefault();
        
        const rawData = uiController.getTodoFormData();
        
        uiController.clearError();
        
        try {

            console.log(rawData);

            const validDate = validateAndConvertDate(rawData.date);
        
            const newTodo = new Todo(rawData.title, validDate.toLocaleDateString('pl-PL'), rawData.info);

            this.#todos.push(newTodo);

            console.log(newTodo);

            uiController.createTodo(newTodo);
        
        } catch (error) {
            uiController.showError(error.message);
        }
                

    }

}   

export default TodoManager;