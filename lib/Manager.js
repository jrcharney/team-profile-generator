/**
 * @file Manager.js
 * @class Manager
 */
import Employee from "./Employee.js";
import Section from "./Section.js";

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
    // TODO: getRoleIcon()
    /**
     * @override
     * @method getJSON
     * @returns {object}
     */
    getJSON(){
        return {
            "id"           : this.getId(),
            "name"         : this.getName(),
            "email"        : this.getEmail(),
            "role"         : this.getRole(),
            "officeNumber" : this.getOfficeNumber()
        };
    }
    /**
     * @override
     * @method showProfile
     * @return {object}
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
            <li><strong>Office Number:</strong> ${this.getOfficeNumber()}</li>
        </ul></div>`;
        card.addContent(header);
        card.addContent(body);
        return card.write();
    }
}