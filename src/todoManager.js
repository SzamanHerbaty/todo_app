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

    removeFromLocalStorage(id){
        localStorage.removeItem(id);
    }

    restoreFromLocalStorage(){
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const rawData = localStorage.getItem(key);

            try {
                const parsedData = JSON.parse(rawData);

                if (parsedData.id && parsedData.title) {
                    
                    const restoredTodo = new Todo(
                        parsedData.title, 
                        parsedData.date, 
                        parsedData.info,
                        parsedData.id,      
                        parsedData.status,
                        parsedData.priority
                    );

                    this.#todos.push(restoredTodo);

                    uiController.createTodo(restoredTodo);
                }
            } catch (error) {
                console.warn(`Pominięto błędny wpis w Local Storage dla klucza: ${key}`);
            }
        }
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
                    const newPriority = todoToEdit.autoSetPriority();
                    todoToEdit.priority = newPriority;


                }
                   
                
                uiController.updateTodoElement(todoToEdit);

                this.saveToLocalStorage(todoToEdit);

            }

            else{
                const newTodo = new Todo(rawData.title, validDate, rawData.info);

                this.#todos.push(newTodo);

                uiController.createTodo(newTodo);

                this.saveToLocalStorage(newTodo);
            }

            uiController.resetFormMode();
            
        } catch (error) {
            uiController.showError(error.message);
        }
                

    }


    deleteTodo(id){

        const todoToDelete = this.#todos.find(todo => todo.id === id);
        
        console.log(`This todo: ${todoToDelete.id} + ${todoToDelete.title} + ${todoToDelete.info} will be deleted`);

        const index = this.#todos.indexOf(todoToDelete);

        if (index > -1){
            this.#todos.splice(index, 1);
        }

        this.removeFromLocalStorage(todoToDelete.id);

        uiController.deleteTodoElement(todoToDelete);

    }

    triggerEdit(id) {
        const todoToFillForm = this.#todos.find(todo => todo.id === id);

        uiController.fillFormForEdit(todoToFillForm);
    }

}   

export default TodoManager;