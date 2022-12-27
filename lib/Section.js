/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file Section.js
 * @class Section
 * @desc Create modular block components for HTML. Likely a base class for other classes.
 */
export default class Section {
    #objId;
    #content;
    #classes = [];
    constructor(objId,content){
        this.#objId = objId;    // Used in the id attribute, BTW
        this.#content = content;
    }
    /**
     * @method getId
     * @desc Get the string that will be used in the id attribute. The id MUST be unique.
     *       It also should not be changed, hence why there is no setId method.
     * @returns {string}
     */
    getId(){
        return this.#objId;
    }
    /**
     * @method hasClasses
     * @desc Return true if this section has classes.
     * @returns {boolean}
     */
    hasClasses(){
        return this.#classes.length > 0;
    }
    /**
     * @method hasClass
     * @desc Return true if a class contains a className
     * @param {string} className 
     * @returns {boolean}
     */
    hasClass(className){
        return this.#classes.includes(className);
    }
    /**
     * @method setClasses
     * @desc Apply a list of classes to this object
     * @param  {...string} classes 
     * @returns 
     */
    setClasses(...classes){
        // TODO: Check for duplicates!   
        //this.#classes = [classes];
        this.#classes = [];     // purge all the classes first!
        for(const className of classes){
            if(!this.hasClass(className)){
                this.#classes.push(className);
            }
        }
        return this;
    };
    /**
     * @method getClasses
     * @desc retrieve a list of classes used in this object
     * @returns {Array<string>}
     */
    getClasses(){
        return this.#classes;
    };
    /**
     * @method addClasses
     * @desc add additional classes to this object. Avoids adding duplicates. So enter them in the order of which they should be processed.
     * @param  {...string} classes a list of classes
     * @returns 
     * @note "Why don't we use Set?" Set sorts items! This can be problematic if one class needs to be processed before another.
     */
    addClasses(...classes){
        // NOTE: The classes are not purged before added
        // Prevent classes from being used twice
        for(const className of classes){
            if(!this.hasClass(className)){
                this.#classes.push(className);
            }
        }
        return this;
    };
    /**
     * @method removeClasses
     * @desc remove select classes if they are in the class array
     * @param  {...string} classes 
     */
    removeClasses(...classes){
        for(const className of classes){
            if(this.hasClass(className)){
                let idx = this.#classes.findIndex((item) => item === className);
                this.#classes.splice(idx,1);
            }
        }
    };
    // TODO: The order of the classes might matter with earlier classes being used first
    // TODO: promoteClass(es)
    // TODO: demoteClass(es)
    // TODO: What lese does classList have in HTML DOM? (wish list)
    // TODO: toggleClass(es)? (wish list)
    // TODO: replaceClass(es)? (wish list)
    /**
     * @method setContent
     * @desc set the contents of this section.
     * @param {string} content 
     * @returns 
     * @note we can't simply enter this using HTML DOM. It needs to be done as strings.
     */
    setContent(content){
        this.#content = content;
        return this;
    };
    /**
     * @method getContent
     * @desc get the contents of this section.
     * @returns {string}
     */
    getContent(){
        return this.#content;
    };
    /**
     * @method addContent
     * @desc Append more content to this section.
     * @param {string} content 
     * @returns 
     */
    addContent(content){
        this.#content += content;
        return this;
    };
    /**
     * @method getIdAttribute
     * @desc returns the id, but as an attribute that would be used in HTML element
     * @returns {string}
     */
    getIdAttribute(){
        return ` id="${this.getId()}"`;
    }
    /**
     * @method getClassAttribute
     * @desc returns the list of classes but as an attribute that would be used in an HTML element
     * @returns {string}
     */
    getClassAttribute(){
        if(this.hasClasses()){
            return ` class="${this.getClasses().join(" ")}"`;
        }else{
            return "";      // If there are no classes, add nothing
        }
    }
    // TODO: style attributes?
    // TODO: event attributes?
    /**
     * @method write
     * @desc Write the Section object as an HTML element using strings.
     * @returns {string}
     */
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
