import Section from "./Section";

/**
 * @file Employee.js
 * @class Employee
 */
export default class Employee {
    static #nextId = 1;                 // Let's use a static variable to number our employees
    #id;
    #name;
    #email;
    constructor(name,email){
        this.#id    = Employee.#nextId++;   // Static variables MUST use the class name, not `this`.
        this.#name  = name;
        this.#email = email;
    }
    /**
     * @method getId
     * @returns {number}
     */
    getId(){
        return this.#id;
    }
    // There is no setter for id because we want our id to be statically assigned, even if the assignment says can set it.
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
    // "virtual" methods
    /**
     * @method getRole
     * @returns {string}
     */
    getRole(){
        return "Employee";      // Typically do nothing, but since its an employee, try this out.
    }
    // TODO: getRoleIcon()
    /**
     * @method getJSON
     * @returns {object}
     */
    getJSON(){
        return {
            "id"    : this.getId(),
            "name"  : this.getName(),
            "email" : this.getEmail(),
            "role"  : this.getRole()
        };
    }
    /**
     * @method showProfile
     */
    showProfile(){
        // TODO: getRoleIcon()
        const card = new Section(this.getId(),"");
        card.addClasses("card");
        const header = `<div class="card-header ${this.getRole().toLowerCase()}">
            <h3>${this.getName()}</h3>
            <h4>${this.getRole()}</h4>
        </div>`;
        const body   = `<div class="card-body"><ul>
            <li><strong>ID:</strong> ${this.getId()}</li>
            <li><strong>Email:</strong> <a href="mailto:${this.getEmail()}">${this.getEmail()}</a></li>
            <li><strong>Key:</strong> Value</li>
        </ul></div>`;
        card.addContent(header);
        card.addContent(body);
        return card.write();
    }     // Do nothing;
}
