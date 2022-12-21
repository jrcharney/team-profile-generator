/**
 * @file Intern.js
 * @class Intern
 */
import Employee from "./Employee.js";
import Section from "./Section.js";

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
    // TODO: getRoleIcon()
    /**
     * @override
     * @method getJSON
     * @returns {object}
     */
    getJSON(){
        return {
            /*
            "id"     : this.getId(),
            "name"   : this.getName(),
            "email"  : this.getEmail(),
            "role"   : this.getRole(),
            */
            ...super.getJSON(),
            "school" : this.getSchool()
        };
    }
    /**
     * @override
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
            <li><strong>School:</strong> ${this.getSchool()}</li>
        </ul></div>`;
        card.addContent(header);
        card.addContent(body);
        return card.write();
    }
}