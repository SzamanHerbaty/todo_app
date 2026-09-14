import { v4 as uuidv4 } from 'uuid';

/**
 * Reprezentuje pojedyncze zadanie w aplikacji (Todo).
 * @class
 */

class Todo {

    
    #id;
    #title;
    #date;
    #info;
    #status;
    #priority;
    
    /**
     * 
     * @param {string} title - Tytuł zadania
     * @param {string} date - Data zakończenia zadania w formacie tesktowym (tworzyony za pomocą obiektu Date z JavaScript)
     * @param {string} info - Opis zadania
     * @param {string} [id] - Unikalne ID zadania (genrowane automatycznie za pomocą pakietu uuid w przypadku nie podania ID)
     * @param {bool} [status] - Status zakończenia zadania
     * @param {string} [priority] - Priorytet zadania [Low, Medium, High] (genrowany automatycznie za pomocą metody autoSetPriority() w przypadku braku podania)
     */
    constructor(title, date, info, id = uuidv4(), status = false, priority){
        this.#title = title;
        this.#date = date;
        this.#info = info;
        this.#id = id;
        this.#status = status;
        this.#priority = priority || this.autoSetPriority();
    }

    /**
     * Automatycznie oblicza priorytet zadania na podstawie daty końcowej zadania
     * @returns {string} Zwaraca poziom priorytetu: "Low", "Medium", "High"
     */

    autoSetPriority(){
        
        const settedDate = new Date(this.#date);

        const today = new Date();
    
        today.setHours(0, 0, 0, 0);

        const daysBetweenDays = (settedDate - today) / (1000 * 60 * 60 * 24);

        if (daysBetweenDays >= 14){
            return "Low";
        }
        else if(daysBetweenDays >= 7){
            return "Medium";
        }
        else{
            return "High";
        }

    }

/* ----- GETTERS -----*/    
    get id(){
        return this.#id;
    }

    get title(){
        return this.#title;
    }

    get date(){
        return this.#date;
    }

    get info(){
        return this.#info;
    }

    get status(){
        return this.#status;
    }

    get priority(){
        return this.#priority;
    }

/* ----- SETTERS -----*/   

    set title(title){
        this.#title = title;
    }

    set date(date){
        this.#date = date;
    }

    set info(info){
        this.#info = info;
    }

    set priority(priority){
        this.#priority = priority;
    }

    /**
     * Zwraca obiekt JSON do serializacji
     * @returns {Object} Zwykły obiekt zawierający publicznie dostępne pola zadania
     */
    toJSON(){
        return{
            id: this.#id,
            title: this.#title,
            date: this.#date,
            info: this.#info,
            status: this.#status,
            priority: this.#priority
        }
    }

    /**
     * Zmienia status zadania na przeciwny
     */

    changeStatus(){
        if(this.#status === false){
            this.#status = true;
        } 
        else{
            this.#status = false;
        }
    }
    
    
}

export default Todo;