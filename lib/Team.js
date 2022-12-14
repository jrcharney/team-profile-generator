/**
 * @file Team.js
 * @class Team
 * Note: This class is NOT part of the assignment.
 *       I felt it would be appropriate to have a class representing a collection of Employees.
 */
import Employee from "./Employee.js";
import Manager from "./Manager.js";
import Engineer from "./Engineer.js";
import Intern from "./Intern";

export default class Team {
    #employees = [];
    #name;
    constructor(name,...employees){
        this.#name = name;
        this.#employees = employees;
    }
    setTeamName(name){
        this.#name = name;
        return this;
    }
    getTeamName(){
        return this.#name;
    }
    setEmployees(...employees){     // You can set more than one!
        this.#employees = employees;
        return this;
    }
    getEmployees(){
        return this.#employees;
    }
    getRoster(){
        return this.#employees.map((employee) => {
            return {
                "id"   : `${employee.getId()}`,
                "name" : `${employee.getName()}`,
                "email" : `${employee.getEmail()}`,
                "role" : `${employee.getRole()}`
            };
        });
    }
    getManagers(){
        // TODO: Show the Managers' office numbers
        return this.getRoster().filter((employee) => employee.role === "Manager");
    }
    getEngineers(){
        // TODO: Show the Engineers' github accounts
        return this.getRoster().filter((employee) => employee.role === "Engineer");
    }
    getInterns(){
        // TODO: Show the Interns' schools
        return this.getRoster().filter((employee) => employee.role === "Intern");
    }
    findEmployees(key,value){
        // TODO: Do not use if key isn't "id", "name", or "role"
        // TODO: Multiple critera
        return this.getRoster().filter((employee) => employee[key] === value);
    }
    fndEmployeeById(id){
        return this.getRoster().filter((employee) => employee.getId() === id);
    }
    addEmployee(employee){
        this.#employees.push(employee);
        return this;
    }
    removeEmployee(id){
        const matches = this.findEmployeeById(id);
        if(matches.length === 1){
            const employee = matches[0];
            const index = this.#employees.indexOf(employee);
            this.#employees.splice(index,1);
        }
        // We can't remove someone who doesn't exist.
        // We can't remove multiple employees.
        return this;
    }
    showTeamProfile(){
        // TODO: This need something.
    }
}