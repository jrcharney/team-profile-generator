/**
 * @file Team.js
 * @class Team
 * Note: This class is NOT part of the assignment.
 *       I felt it would be appropriate to have a class representing a collection of Employees.
 */
import Employee from "./Employee.js";

export default class Team {
    #employees = [];
    #name;
    constructor(name,...employees){
        this.#name = name;
        // this.#employees = employees;
        for(const employee of employees){
            if(employee instanceof Employee){
                this.#employees.push(employee);
            }
        }
    }
    /**
     * @method setTeamName
     * @desc Set the team name
     * @param {string} name 
     * @returns 
     */
    setTeamName(name){
        this.#name = name;
        return this;
    }
    /**
     * @method getTeamName
     * @desc Get the team name
     * @returns {string}
     */
    getTeamName(){
        return this.#name;
    }
    /**
     * @method setEmployees
     * @desc set a list of employees
     * @param  {...Employee} employees 
     * @returns 
     */
    setEmployees(...employees){     // You can set more than one!
        //this.#employees = employees;
        for(const employee of employees){
            if(employee instanceof Employee){
                this.#employees.push(employee);
            }
        }
        return this;
    }
    /**
     * @method getEmployees
     * @desc return a list of employees
     * @returns {Array<Employee>}
     */
    getEmployees(){
        return this.#employees;
    }
    /**
     * @method getRoster
     * @desc Get the list of employees as a JSON Array of Objects
     * @returns {Array<object>}
     */
    getRoster(){
        return this.#employees.map((employee) => employee.getJSON());
    }
    /**
     * @method getManagers
     * @desc Using getRoster, get a filtered JSON Array of Objects
     * @returns {Array<object>}
     */
    getManagers(){
        // TODO: Show the Managers' office numbers
        return this.getRoster().filter((employee) => employee.role === "Manager");
    }
    /**
     * @method getManagers
     * @desc Using getRoster, get a filtered JSON Array of Objects
     * @returns {Array<object>}
     */
    getEngineers(){
        // TODO: Show the Engineers' github accounts
        return this.getRoster().filter((employee) => employee.role === "Engineer");
    }
    /**
     * @method getManagers
     * @desc Using getRoster, get a filtered JSON Array of Objects
     * @returns {Array<object>}
     */
    getInterns(){
        // TODO: Show the Interns' schools
        return this.getRoster().filter((employee) => employee.role === "Intern");
    }
    /**
     * @method findEmployees
     * @desc Using getRoster, get a filtered JSON Array of Objects by search criteria
     * @param {string} key 
     * @param {any} value 
     * @returns {Array<object>}
     */
    findEmployees(key,value){
        // TODO: Do not use if key isn't "id", "name", or "role"
        // TODO: Multiple critera
        return this.getRoster().filter((employee) => employee[key] === value);
    }
    /**
     * @method findEmployeeById
     * @desc Using getRoster, find an employee by their id number
     * @param {number} id 
     * @returns {Array<object>}
     */
    findEmployeeById(id){
        return this.getRoster().filter((employee) => employee["id"] === id);
    }
    /**
     * @method addEmployee
     * @desc Add an Employee to the list of employees on the team
     * @param {Employee} employee 
     * @returns 
     */
    addEmployee(employee){
        if(employee instanceof Employee){
            this.#employees.push(employee);
        }
        return this;
    }
    // TODO: addEmployees
    /**
     * @function removeEmployee
     * @desc Using an employee id number, remove an Employee from the list of employees on the team
     * @param {number} id 
     * @returns 
     */
    removeEmployee(id){
        const matches = this.findEmployeeById(id);
        if(matches.length === 1){
            const employee = matches[0];
            const index = this.#employees.indexOf(employee);
            this.#employees.splice(index,1);
            return this;
        }
        // We can't remove someone who doesn't exist.
        // We can't remove multiple employees.
        return this;
    }
    // TODO: removeEmployees
    /**
     * @method showTeamProfile
     * @desc return the team profile
     * @returns {string}
     */
    showTeamProfile(){
        // TODO: This need something.
        let team = `<div class="team">`;
        team += `<div class="team-header"><h2>${this.getTeamName()}</h2></div>`;
        team += `<div class="team-body">`;
        team += this.getEmployees().map((employee) => employee.getProfile()).join("");
        team += `</div>`;
        team += `</div>`;
        return team;
    }
}