/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file Team.js
 * @class Team
 * @desc A class that is used to collect and use all our our Employee objects.
 *      This class uses polymorphism because the abstract methods declared in the Employee class.
 * @note This class is NOT part of the assignment.
 *       I felt it would be appropriate to have a class representing a collection of Employees.
 */
import Employee from "./Employee.js";
import Manager from "./Manager.js";
import Engineer from "./Engineer.js";
import Intern from "./Intern.js";

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
     * @method countEmployees
     * @desc Show how many employees are on this team.
     * @returns {number}
     * @todo create another function that counts by type
     */
    countEmployees(){
        return this.#employees.length;
    }
    /**
     * @method hasEmployees
     * @desc Report if a team has employees
     * @returns {boolean}
     * @todo create other functions that state if a team has a manager, has at least one intern, has engineers
     */
    hasEmployees(){
        return this.#employees.length > 0;
    }
    /**
     * @method getNameChoices
     * @desc used with the inquirer library, create a list of names and id to be used as names and values in a list of objects used in the inquirer choices option for a list type.
     * @returns {Array<object>}
     */
    getNameChoices(){
        const list = this.#employees.map((employee) => {
            return {
                "name" : employee.getName(),
                "value": employee.getId()
            }
        });
        return [
            ...list,
            {
                "name"  : "Nobody",
                "value" : 0
            }   // We need to add one more item to our list that will allow us to not choose anybody.
        ];
    }

    /**
     * @method getEmployeeById
     * @desc find the first matching employee object that matches an employee ID number
     * @param {number} id 
     * @returns {Employee|undefined}
     */
    getEmployeeById(id){
        return this.#employees.find((employee) => employee.getId() === id);
    }

    /**
     * @method isManager
     * @desc Using an employee ID, return true if an employee is a Manager
     * @param {number} id 
     * @returns {boolean}
     */
    isManager(id){
        return this.getEmployeeById(id).getRole() === "Manager";
    }
    /**
     * @method isEngineer
     * @desc Using an employee ID, return true if an employee is an Engineer
     * @param {number} id 
     * @returns {boolean}
     */
    isEngineer(id){
        return this.getEmployeeById(id).getRole() === "Engineer";
    }
    /**
     * @method isIntern
     * @desc Using an employee ID, return true if an employee is an Intern
     * @param {number} id 
     * @returns {boolean}
     */
    isIntern(id){
        return this.getEmployeeById(id).getRole() === "Intern";
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
        // TODO: What if we could filter out bad keys or deny this from working if bad keys are used?
        // TODO: Multiple criteria
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
     * @todo check for duplicates before adding
     * @note an easy way to add an employee is to use something like `aTeam.addEmployee(new EmployeeType(...))` and fill in the Employee type parameters
     */
    addEmployee(employee){
        if(employee instanceof Employee){
            this.#employees.push(employee);
        }
        return this;
    }
    /**
     * @method addEmployees
     * @desc Add multiple employees
     * @param  {...Employee} employees 
     * @returns 
     * @todo I just added this one. This method will need testing later.
     */
    addEmployees(...employees){
        for(const employee of employees){
            this.addEmployee(employee);
        }
        return this;
    }
    /**
     * @function removeEmployee
     * @desc Using an employee id number, remove an Employee from the list of employees on the team
     * @param {number} id 
     * @returns 
     * @ATTENTION this method was modified! I needs to fix a problem where the wrong index us chosen!
     */
    removeEmployee(id){
        // Note: changed from this.findEmployeeById() to this.getEmployeeById()
        const matches = this.getEmployeeById(id);
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
    /**
     * @method removeEmployees
     * @desc Remove multiple employees by their id number.
     * @param  {...numbers} ids 
     * @returns 
     * @todo I just added this one. This method will need testing later.
     */
    removeEmployees(...ids){
        for(const id of ids){
            this.removeEmployee(id);
        }
        return this;
    }
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

    /**
     * @method writeJSON
     * @desc create a JSON object that will be written
     * @returns {object}
     * @note We shouldn't need to use 'JSON.stringify()' here.
     * @todo write a test for this method
     */
    writeJSON(){
        const team_name = this.getTeamName();
        const roster = this.getRoster();        // this should return an array
        const json = {
            "team_name" : team_name,
            "roster"    : roster
        };
        return json;
    }

    /**
     * @method readJSON
     * @desc Load JSON data into our team
     * @param {object} json 
     * @note The JSON data should already be parsed with 'JSON.parse()`
     */
    readJSON(json){
        // TODO: try-catch block
        try{
            this.setTeamName(json.team_name);
            for(const employee of json.roster){
                const role = employee.role.toLowerCase();
                // Note: employee.id values might change when loaded.
                //       To fix this, I added a setId method in Employee.
                if(role === "manager"){
                    this.addEmployee(new Manager(employee.name,employee.email,employee.office_number).setId(employee.id));
                }
                else if(role === "engineer"){
                    this.addEmployee(new Engineer(employee.name,employee.email,employee.github).setId(employee.id));
                }
                else if(role === "intern"){
                    this.addEmployee(new Intern(employee.name,employee.email,employee.school).setId(employee.id));
                }else{
                    throw `Invalid role ${role}`;
                }
            }
        }catch(error){
            console.error(error)
        };
        // TODO: finally?
        return this;
    }
}