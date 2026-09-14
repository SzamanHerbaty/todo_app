import Todo from "./todo.js";
import {validateAndConvertDate} from './utilities/dateConversion.js';
import uiController from "./UI.js";

/**
 * Główny kontroler zarządzający logiką biznesową i stanem tablicy zadań.
 * @class
 */
class TodoManager{
    
    #todos;

    /**
     * Tworzy instancje klasy TodoManager która zawiera tablie z wszystkimi zadaniami
     */

    constructor(){
        this.#todos = [];
    }
    
    /**
     * Zapisuje zadanie do lokalnej pamięci
     * @param {Object} todoObject - Zadanie do zapisania
     */

    saveToLocalStorage(todoObject){
        
        const key = todoObject.id;
        
        localStorage.setItem(key, JSON.stringify(todoObject));

        console.log(localStorage);

    }
    /**
     * Usuwa zadanie z lokalnej pamięci
     * @param {string} id - ID obiektu który ma zostać usunięty
     */
    removeFromLocalStorage(id){
        localStorage.removeItem(id);
    }

    /**
     * Przywraca wszytkie zdania z lokalnej pamięci oraz wysyła żądnie do storzenia ich w UI
     */

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

    /**
     * Obsługuje wysłanie formularza, decydując o dodaniu nowego zadania lub edycji istniejącego.
     * @param {Event} e - Obiekt zdarzenia (SubmitEvent) przekazany przez nasłuchiwacz.
     */

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

    /**
     * Usuwa zadanie z pamięci RAM, Local Storage oraz z interfejsu.
     * @param {string} id - Unikalny identyfikator zadania pobrany z atrybutu dataset.id elementu HTML.
     */

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

    /**
     * Wypełnia formularz danymi zadania które chcemy zedytować
     * @param {string} id - ID zadnia które chcemy zedytować
     */

    triggerEdit(id) {
        const todoToFillForm = this.#todos.find(todo => todo.id === id);

        uiController.fillFormForEdit(todoToFillForm);
    }

    /**
     * Zamienia status zadania na przeciwny 
     * @param {string} id - ID zadania które ma zmienić status
     */

    triggerStatusChange(id) {
        const todoToChangeStatus = this.#todos.find(todo => todo.id === id);

        const index = this.#todos.indexOf(todoToChangeStatus);

        this.#todos[index].changeStatus();

        this.saveToLocalStorage(this.#todos[index]);

    }
}   

export default TodoManager;