import { v4 as uuidv4 } from 'uuid';

class Todo {

    #id;
    #title;
    #date;
    #info;
    #status;
    
    constructor(title, date, info){
        this.#title = title;
        this.#date = date;
        this.#info = info;
        this.#id = uuidv4();
        this.#status = false;
    }

    toJSON(){
        return{
            id: this.#id,
            title: this.#title,
            date: this.#date,
            info: this.#info,
            status: this.#status
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

