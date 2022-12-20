export default class Section {
    #objId;
    #content;
    #classes = [];
    constructor(objId,content){
        this.#objId = objId;    // Used in the id attribute, BTW
        this.#content = content;
    }
    getId(){
        return this.#objId;
    }
    hasClasses(){
        return this.#classes.length > 0;
    }
    hasClass(className){
        return this.#classes.includes(className);
    }
    setClasses(...classes){   
        this.#classes = [classes];
        return this;
    };
    getClasses(){
        return this.#classes;
    };
    addClasses(...classes){
        // Prevent classes from being used twice
        for(const className of classes){
            if(!this.hasClass(className)){
                this.#classes.push(className);
            }
        }
        return this;
    };
    removeClasses(...classes){
        for(const className of classes){
            if(this.hasClass(className)){
                let idx = this.#classes.findIndex((item) => item === className);
                this.#classes.splice(idx,1);
            }
        }
    };
    // TODO: The order of the classes might matter with earlier classes being used first
    setContent(content){
        this.#content = content;
        return this;
    };
    getContent(){
        return this.#content;
    };
    addContent(content){
        this.#content += content;
        return this;
    };
    getIdAttribute(){
        return ` id="${this.getId()}"`;
    }
    getClassAttribute(){
        if(this.hasClasses()){
            return ` class="${this.getClasses().join(" ")}"`;
        }else{
            return "";      // If there are no classes, add nothing
        }
    }
    // TODO: style attributes?
    // TODO: event attributes?
    write(){
        /*
        let section = document.createElement("section");
        section.id        = this.getId();
        section.classList = this.getClasses();
        section.innerHTML = this.getContent();
        */
        let section = `<section`;
        section += this.getIdAttribute();
        section += this.getClassAttribute();
        section +=`>${this.getContent()}</section>`;
        return section;
    }
}
