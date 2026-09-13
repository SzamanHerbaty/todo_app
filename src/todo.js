import { v4 as uuidv4 } from 'uuid';

class Todo {

    #id;
    #title;
    #date;
    #info;
    #status;
    #priority;
    
    
    constructor(title, date, info, id = uuidv4(), status = false, priority){
        this.#title = title;
        this.#date = date;
        this.#info = info;
        this.#id = id;
        this.#status = status;
        this.#priority = priority || this.autoSetPriority();
    }

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