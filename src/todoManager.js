import Todo from "./todo.js";
import {validateAndConvertDate} from './utilities/dateConversion.js';
import uiController from "./UI.js";

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

            const validDate = validateAndConvertDate(rawData.date);

            if (rawData.id){

                const todoToEdit = this.#todos.find(todo => todo.id === rawData.id);

                if (todoToEdit) {
                    todoToEdit.title = rawData.title;
                    todoToEdit.date = validDate;
                    todoToEdit.info = rawData.info;
                }
                   
                
                uiController.updateTodoElement(todoToEdit);

                this.saveToLocalStorage(todoToEdit);

            }


            else{
                const newTodo = new Todo(rawData.title, validDate.toLocaleDateString("pl-PL"), rawData.info);

                this.#todos.push(newTodo);

                uiController.createTodo(newTodo);

                this.saveToLocalStorage(newTodo);
            }
            
        } catch (error) {
            uiController.showError(error.message);
        }
                

    }

}   

export default TodoManager;