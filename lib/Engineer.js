/**
 * @file Engineer.js
 * @class Engineer
 */
import Employee from "./Employee.js";

export default class Engineer extends Employee {
    #github;
    constructor(name,email,github){
        super(name,email);
        this.#github = github;
    }
    /**
     * @method setGithub
     * @param {string} github 
     * @returns {this}
     */
    setGithub(github){
        this.#github = github;
        return this;
    }
    /**
     * @method getGithub
     * @returns {string}
     */
    getGithub(){
        return this.#github;
    }
    /**
     * @override
     * @method getRole
     * @returns {string}
     */
    getRole(){
        return "Engineer";
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
            "github" : this.getGithub()
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