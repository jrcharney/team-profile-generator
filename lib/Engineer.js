/**
 * @file Engineer.js
 * @class Engineer
 */
import Employee from "./Employee.js";
import Section from "./Section.js";

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
            "github" : this.getGithub()
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
            <li><strong>Github:</strong> <a href="https://github.com/${this.getGithub()}">@${this.getGithub()}</a></li>
        </ul></div>`;
        card.addContent(header);
        card.addContent(body);
        return card.write();
    }
}