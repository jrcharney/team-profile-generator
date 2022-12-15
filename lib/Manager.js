/**
 * @file Manager.js
 * @class Manager
 */
import Employee from "./Employee.js";

export default class Manager extends Employee {
    #office_number;
    constructor(name,email,office_number){
        super(name,email);
        this.#office_number = office_number;
    }
    /**
     * @method setOfficeNumber
     * @param {number} office_number 
     * @returns {this}
     */
    setOfficeNumber(office_number){
        this.#office_number = office_number;
        return this;
    }
    /**
     * @method getOfficeNumber
     * @returns {number}
     */
    getOfficeNumber(){
        return this.#office_number;
    }
    /**
     * @override
     * @method getRole
     * @returns {string}
     */
    getRole(){
        return "Manager";
    }
    /**
     * @override
     * @method getJSON
     * @returns {object}
     */
    getJSON(){
        return {
            "id"           : `${this.getId()}`,
            "name"         : `${this.getName()}`,
            "email"        : `${this.getEmail()}`,
            "role"         : `${this.getRole()}`,
            "officeNumber" : `${this.getOfficeNumber()}`
        };
    }
    /**
     * @override
     * @method showProfile
     */
    showProfile(){
        // TODO: Output data
    }
}