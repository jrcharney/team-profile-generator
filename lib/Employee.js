/**
 * @file Employee.js
 * @class Employee
 */
export default class Employee {
    static #id = 0;                 // Let's use a static variable to number our employees
    #name;
    #email;
    constructor(name,email){
        this.#name = name;
        this.#email = email;
        this.#id = ++this.#id;      // increment and set
    }
    /**
     * @method setName
     * @param {string} name 
     * @returns {this}
     */
    setName(name){
        this.#name = name;
        return this;
    }
    /**
     * @method setEmail
     * @param {string} email 
     * @returns {this}
     */
    setEmail(email){
        this.#email = email;
        return this;
    }
    // There is no setter for id because we want our id to be statically assigned, even if the assignment says can set it.
    /**
     * @method getName
     * @returns {string}
     */
    getName(){
        return this.#name;
    }
    /**
     * @method getEmail
     * @returns {string}
     */
    getEmail(){
        return this.#email;
    }
    /**
     * @method getId
     * @returns {number}
     */
    getId(){
        return this.#id;
    }
    // "virtual" methods
    /**
     * @method getRole
     * @returns {string}
     */
    getRole(){
        return "Employee";      // Typically do nothing, but since its an employee, try this out.
    }
    /**
     * @method showProfile
     */
    showProfile(){}     // Do nothing;
}
