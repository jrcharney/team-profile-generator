/**
 * @file Manager.js
 * @class Manager
 */
import Employee from "./Employee.js";

export default class Intern extends Employee {
    #school;
    constructor(name,email,school){
        super(name,email);
        this.#school = school;
    }
    /**
     * @method setSchool
     * @param {string} school 
     * @returns {this}
     */
    setSchool(school){
        this.#school = school;
        return this;
    }
    /**
     * @method getSchool
     * @returns {string}
     */
    getSchool(){
        return this.#school;
    }
    /**
     * @override
     * @method getRole
     * @returns {string}
     */
    getRole(){
        return "Intern";
    }
    /**
     * @override
     * @method getJSON
     * @returns {object}
     */
    getJSON(){
        return {
            "id"     : this.getId(),
            "name"   : this.getName(),
            "email"  : this.getEmail(),
            "role"   : this.getRole(),
            "school" : this.getSchool()
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