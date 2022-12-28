/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file Employee.js
 * @class Employee
 * @desc Base class for the three employee types.
 */
import Section from "./Section.js";

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
     * @method setId
     * @desc set the ID of an Employee. This should ONLY be used if you are loading data from a JSON file.
     * @param {number} id 
     * @returns 
     */
    setId(id){
        this.#id = id;
        return this;
    }
    /**
     * @method getId
     * @desc Fetch the Employee ID number.
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
     * @method getName
     * @returns {string}
     */
    getName(){
        return this.#name;
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
     * @method getEmail
     * @returns {string}
     */
    getEmail(){
        return this.#email;
    }
    // "virtual" (abstract) methods
    /**
     * @method getRole
     * @returns {string}
     * @abstract
     */
    getRole(){
        return "Employee";      // Typically do nothing, but since its an employee, try this out.
    }
    // TODO: getRoleIcon()
    /**
     * @method getJSON
     * @returns {object}
     * @abstract
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
     * @abstract
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
