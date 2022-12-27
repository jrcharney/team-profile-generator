/**
 * @file index.js
 * @author Jason Charney (jrcharney@gmail.com)
 * @desc Team Profile Generator
 */

import inquirer from "inquirer";
import Engineer from "./lib/Engineer.js";
import Intern from "./lib/Intern.js";
import Manager from "./lib/Manager.js";
import Team from "./lib/Team.js";

//inquirer.prompt([]).then((answers) => {}).catch((error) => {});

const myTeam = new Team();

function mainMenu(){
    inquirer.prompt([{
        "type": "list",
        "name": "task",
        "message": "What would you like to do?",
        "choices" : [
            {
                "name": "Set/Get Team Name",
                "value": "team"
            },
            {
                "name": "Assemble Team",
                "value": "members"
            },
            {
                "name": "Generate profiles and/or documents",
                "value": "generate"
            },
            new inquirer.Separator(),
            {
                "name": "Get Help",
                "value": "help"
            },
            {
                "name": "Quit this program",
                "value": "exit"
            }
        ]
    }]).then((answers) => {
        if(answers.task === "team"){
            teamMenu();
        }
        else if(answers.task === "members"){
            membersMenu();
        }
        else if(answers.task === "generate"){
            generateMenu();
        }
        else if(answers.task === "help"){
            helpMenu();
        }
        else if(answers.task === "exit"){
            exitProgram();
        }
    })
}

/**
 * @method teamMenu
 * @desc show the options for modifying a team
 */
 function teamMenu(){
    // TODO: clear screen?
    console.log("TPG > Team Menu");
    console.log("---------------");
    inquirer.prompt([{
        "type" : "list",
        "name" : "task",
        "message" : "What would you like to do?",
        "choices" : [
            {
                "name": "Get/Show team name",
                "value": "getTeamName"
            },
            {
                "name": "Set/Update team name",
                "value": "setTeamName"
            },
            new inquirer.Separator(),
            {
                "name": "Tell me more about the items on this list.",
                "value": "help"
            },
            {
                "name": "Return to the Main Menu",
                "value": "main"
            }
        ]
    }]).then((answers) => {
        if(answers.task === "getTeamName"){
            getTeamName();
        }
        else if(answers.task === "setTeamName"){
            setTeamName();
        }
        else if(answers.task === "help"){
            helpMenu();
        }
        else if(answers.task === "main"){
            return mainMenu();
        }
    });
};

/**
 * @method getTeamName
 * @desc fetch the team name
 * @returns {string}
 */
function getTeamName(){
    console.log(myTeam.getTeamName());
    return mainMenu();
}

/**
 * @method setTeamName
 * @desc ask to set the team name
 */
function setTeamName(){
    inquirer.prompt([{
        "type": "input",
        "name": "team",
        "message": "Enter the team name",
        "validate": (answer) => {
            if(!answer){
                return "Please enter the team name";
            }
            return true;
        }
        // TODO: Validate, no empty values!
    }]).then((answers) => {
        myTeam.setTeamName(answers.team);
        return mainMenu()
    }).catch((error) => console.error(`An error occurred (setTeamName)`, error));
}

/**
 * @method membersMenu
 * @desc Show the options for listing, adding, updating, and removing team members
 */
function membersMenu(){
    // TODO: clear screen?
    console.log("TPG > Member Menu");
    console.log("-----------------");
    inquirer.prompt([{
        "type" : "list",
        "name" : "task",
        "message" : "What would you like to do?",
        "choices" : [
            {
                "name": "List team members",
                "value": "read"
            },
            {
                "name": "Show a team member",
                "value": "readOne"
            },
            {
                "name": "Find team members",
                "value": "find"
            },
            {
                "name": "Add a team member",
                "value": "create"
            },
            {
                "name": "Modify a team member",
                "value": "update"
            },
            {
                "name": "Remove a team member",
                "value": "delete"
            },
            new inquirer.Separator(),
            {
                "name": "Tell me more about the items on this list.",
                "value": "help"
            },
            {
                "name": "Return to the Main Menu",
                "value": "main"
            }
        ],
        "default" : "read"
    }]).then((answers) => {
        // NOTE: All these options should return to the member menu
        if(answers.task === "create"){
            return addMember();
        }
        else if(answers.task === "read"){
            return listMembers();
        }
        else if(answers.task === "update"){
            return updateMember();
        }
        else if(answers.task === "delete"){
            return removeMember();
        }
        else if(answers.task === "readOne"){
            return showMember();
        }
        else if(answers.task === "find"){
            return findMembers();
        }
        else if(answers.task === "help"){
            return helpMenu();
        }
        else if(answers.task === "main"){
            return mainMenu();
        }
    });
};

/**
 * @method addMember
 * @desc Add a new member to the team
 */
function addMember(){
    inquirer.prompt([
        {
            "type": "list",
            "name": "employeeType",
            "message": "What type of employee would you like to add to your team?",
            "choices" : [
                "Manager",
                "Engineer",
                "Intern",
                // new inquirer.Separator(),
                // "Cancel"        // TODO: Back out of this prompt with this option
            ],
            "default": "engineer",
            "filter": (val) => val.toLowerCase()
        },
        {
            "type": "input",
            "name": "employeeName",
            "message": "What is the Employee's name?",
            "validate": (answer) => {
                if(!answer){
                    return "Name cannot be empty. Please enter a name."
                }
                return true;
            }
        },
        {
            "type": "input",
            "name": "email",
            "message": "Please enter the employee email",
            "validate": (email) => {
                // Borrowed this REGEXP from https://www.w3resource.com/javascript/form/email-validation.php
                let valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
                if(!valid){
                    return "Please enter a valid email address.";
                }
                return true;
            }
        },
        {
            "type": "number",
            "name": "officeNumber",
            "message": "What is the office ID number of the office they manage?",
            "when": (answers) => answers.employeeType === "manager",
            "validate": (num) => {
                if(isNaN(num)){
                    return "Please enter a valid office number";
                }
                return true;
            }
        },
        {
            "type": "input",
            "name": "github",
            "message": "What is this engineer's github username?",
            "when": (answer) => answer.employeeType === "engineer",
            "validate": (answer) => {
                if(!answer){
                    return "Please enter a valid github username."
                }
                return true;
            }
        },
        {
            "type": "input",
            "name": "school",
            "message": "Where did this intern go to school?",
            "when": (answer) => answer.employeeType === "intern",
            "validate": (answer) => {
                if(!answer){
                    return "Please enter a school name."
                }
                return true;
            }
        },
        // TODO: There doesn't seem to be away to stop a submission once it has started.
        /*
        {
            "type": "confirm",
            "name": "askAgain",
            "message": (answers) => {
                let msg = "{\n";
                msg += `\t"name": "${answers.employeeName}",\n`;
                msg += `\t"role": "${answers.employeeType}",\n`;
                msg += `\t"email": "${answers.email}",\n`;
                if(answers.employeeType === "manager"){
                    msg += `\t"office_number": "${answers.officeNumber}",\n`;
                }
                else if(answers.employeeType === "engineer"){
                    msg += `\t"github": "${answers.github}",\n`;
                }
                else if(answers.employeeType === "intern"){
                    msg += `\t"school": "${answers.school}",\n`;
                }
                msg += "}\n";
                msg += "Is this correct?";
                return msg;
            },
            "default": false
        }
        */
    ]).then((answers) => {

        //inquirer.prompt([{}]).then(() => {})
        /*
        if(answers.employeeType === "cancel"){
            return membersMenu();
        }
        */
        /*
        if(answers.askAgain){
            return addMember();
        }else{}
        */
        if(answers.employeeType === "manager"){
            myTeam.addEmployee(new Manager(answers.employeeName,answers.email,answers.officeNumber));
        }
        else if(answers.employeeType === "engineer"){
            myTeam.addEmployee(new Engineer(answers.employeeName,answers.email,answers.github));
        }
        else if(answers.employeeType === "intern"){
            myTeam.addEmployee(new Intern(answers.employeeName,answers.email,answers.school));
        }
        return mainMenu(); 
    }).catch((error) => {
        console.error(`An error occurred (addMember)`, error);
    });
}

/**
 * @method listMembers
 * @desc display the current team roster as a table
 * @note Trying out console.table. This should output the team roster as a table.
 */
function listMembers(){
    if(myTeam.getEmployees().length < 1){
        console.log("There are no employees on this team.");
        return mainMenu();
    }
    console.table(myTeam.getRoster());
    return mainMenu();
}

/**
 * @method updateMember
 * @desc Modify a specific value in a specific employee record
 */
function updateMember(){
    inquirer.prompt([
        {
            "type" : "list",
            "name" : "who",
            "message": "Which member should I modify?",
            "choices": () => {
                let employees = myTeam.getEmployees().map((employee) => {
                    return {
                        "name": employee.getName(),
                        "value": employee.getId()
                    }
                });
                return [
                    ...employees,
                    {
                        "name": "Nobody",
                        "value": 0
                    }
                ];
            }
        },
        {
            "type": "list",
            "name": "what",
            "message": "What should I modify?",
            "choices": (answers) => {
                const employee = myTeam.getEmployeeById(answers.who);
                const role = employee.getRole();
                let special;
                if(role === "Manager"){
                    special = "Office Number";
                }
                else if(role === "Engineer"){
                    special = "Github Username";
                }
                else if(role === "Intern"){
                    special = "School";
                }
                return [
                    {
                        "name": "Name",
                        "value": 1,
                    },
                    {
                        "name": "Email",
                        "value": 2
                    },
                    {
                        "name": `${special}`,
                        "value": 3
                    },
                    {
                        "name": "Nothing",
                        "value": 0
                    }
                ];
            },
            "when": (answers) => answers.who !== 0      // or should this be answers.who.value?
        },
        {
            "type": "input",
            "name": "employeeName",
            "message": "What is the Employee's name?",
            "validate": (answer) => {
                if(!answer){
                    return "Name cannot be empty. Please enter a name."
                }
                return true;
            },
            "when": (answers) => answers.what === 1
        },
        {
            "type": "input",
            "name": "email",
            "message": "Please enter the employee email",
            "validate": (email) => {
                // Borrowed this REGEXP from https://www.w3resource.com/javascript/form/email-validation.php
                let valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
                if(!valid){
                    return "Please enter a valid email address.";
                }
                return true;
            },
            "when": (answers) => answers.what === 2
        },
        {
            "type": "number",
            "name": "officeNumber",
            "message": "What is the office ID number of the office they manage?",
            "when": (answers) => myTeam.getEmployeeById(answers.who).getRole() === "Manager" && answers.what === 3,
            "validate": (num) => {
                if(isNaN(num)){
                    return "Please enter a valid office number";
                }
                return true;
            }
        },
        {
            "type": "input",
            "name": "github",
            "message": "What is this engineer's github username?",
            "when": (answers) => myTeam.getEmployeeById(answers.who).getRole() === "Engineer" && answers.what === 3,
            "validate": (answer) => {
                if(!answer){
                    return "Please enter a valid github username."
                }
                return true;
            }
        },
        {
            "type": "input",
            "name": "school",
            "message": "Where did this intern go to school?",
            "when": (answers) => myTeam.getEmployeeById(answers.who).getRole() === "Intern" && answers.what === 3,
            "validate": (answer) => {
                if(!answer){
                    return "Please enter a school name."
                }
                return true;
            }
        }
    ]).then((answers) => {
        if(answers.who !== 0){
            //console.log(JSON.stringify(myTeam.findEmployeeById(answer.fire),null," "));
            const employee = myTeam.getEmployeeById(answers.who);
            if(answers.what === 1){
                const oldName = employee.getName();
                employee.setName(answers.employeeName);
                const newName = employee.getName();
                console.log(`${oldName} changed to ${newName}`);
            }
            else if(answers.what === 2){
                const name = employee.getName();
                const oldEmail = employee.getEmail();
                employee.setEmail(answers.email);
                const newEmail = employee.getEmail();
                console.log(`${name}'s email address changed from "${oldEmail}" to "${newEmail}".`);
            }
            else if(answers.what === 3){
                const name = employee.getName();
                const role = employee.getRole();
                if(role === "Manager"){
                    const oldOfficeNumber = employee.getOfficeNumber();
                    employee.setOfficeNumber(answers.officeNumber);
                    const newOfficeNumber = employee.getOfficeNumber();
                    console.log(`${name}'s office number changed from ${oldOfficeNumber} to ${newOfficeNumber}.`);
                }
                else if(role === "Engineer"){
                    const oldGithub = employee.getGithub();
                    employee.setGithub(answers.github);
                    const newGithub = employee.getGithub();
                    console.log(`${name}'s Github username changed from "@${oldGithub}" to "@${newGithub}".`);
    
                }
                else if(role === "Intern"){
                    const oldSchool = employee.getSchool();
                    employee.setSchool(answers.school);
                    const newSchool = employee.getSchool();
                    console.log(`${name}'s alta mater changed from "${oldSchool}" to "${newSchool}".`);
                }
            }
            else{   // answers.what === 0
                return mainMenu();
            }
        }
        return mainMenu();
    }).catch((error) => console.error(`An error occurred (updateMember)`, error));
}

/**
 * @method removeMember
 * @desc Remove a member (by ID) from a team
 * @returns 
 */
function removeMember(){
    if(myTeam.getEmployees().length < 1){
        console.log("There are no employees on this team.");
        return mainMenu();
    }
    //console.table(myTeam.getRoster());      // Let's show the list before asking
    inquirer.prompt([{
        "type" : "list",
        "name" : "fire",
        "message": "Which member should I remove?",
        "choices": () => {
            let employees = myTeam.getEmployees().map((employee) => {
                return {
                    "name": employee.getName(),
                    "value": employee.getId()
                }
            });
            return [
                ...employees,
                {
                    "name": "Nobody",
                    "value": 0
                }
            ];
        },
    }]).then((answer) => {
        if(answer.fire !== 0){
            myTeam.removeEmployee(answer.fire);
        }
        return mainMenu();
    }).catch((error) => console.error(`An error occurred (removeMember)`, error));
}

/**
 * @method showMember
 * @desc Display the data for one member.
 */
function showMember(){
    inquirer.prompt([
        {
            "type" : "list",
            "name" : "show",
            "message": "Which member should I display?",
            "choices": () => {
                let employees = myTeam.getEmployees().map((employee) => {
                    return {
                        "name": employee.getName(),
                        "value": employee.getId()
                    }
                });
                return [
                    ...employees,
                    {
                        "name": "Nobody",
                        "value": 0
                    }
                ];
            },
        }
    ]).then((answer) => {
        if(answer.show !== 0){
            console.log(JSON.stringify(myTeam.findEmployeeById(answer.show),null," "));
        }
        return mainMenu();
    }).catch((error) => console.error(`An error occurred (showMember)`, error));
}

/**
 * @method findMembers
 * @desc Search for members by ID, Name, Email, or Role(s).
 */
function findMembers(){
    inquirer.prompt([
        {
            "type": "list",
            "name": "queryType",
            "message": "What type of search should I use?",
            "choices": [
                {
                    "name": "By ID",
                    "value": "id"
                },
                {
                    "name": "By Name",
                    "value": "name"
                },
                {
                    "name": "By Email",
                    "value": "email"
                },
                {
                    "name": "By role",
                    "value": "role"
                },
                /*
                new inquirer.Separator(),
                {
                    "name": "Cancel",
                    "value": "cancel"
                }                   // TODO: Back out of this prompt with this option
                */
            ],
            "default": "name"
        },
        {
            "type": "number",
            "name": "idValue",
            "message": "Enter an employee ID number",
            "when": (answer) => answer.queryType === "id",
            "validate" : (answer) => {
                if(isNaN(answer)){
                    return "Please enter a valid ID number."
                }
                return true;
            }
        },
        {
            "type": "input",
            "name": "nameValue",
            "message": "Enter an employee name",
            "when": (answer) => answer.queryType === "name",
            "validate" : (answer) => {
                if(!answer){
                    return "Please enter a valid employee name."
                }
                return true;
            }
        },
        {
            "type": "input",
            "name": "emailValue",
            "message": "Please enter the employee email",
            "when": (answer) => answer.queryType === "email",
            "validate": (email) => {
                // Borrowed this REGEXP from https://www.w3resource.com/javascript/form/email-validation.php
                let valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
                if(!valid){
                    return "Please enter a valid email address.";
                }
                return true;
            },
        },
        {
            "type": "checkbox",
            "name": "roleValues",
            "message": "Select an role",
            "choices": [
                "Manager",
                "Engineer",
                "Intern"
            ],
            "filter": (answers) => {
                return answers.map((answer) => answer.toLowerCase());
            },
            "when": (answer) => answer.queryType === "role",
            "validate": (answer) => {
                if(answer.length < 1){
                    return "You must choose at least one role to loop up."
                }
                return true;
            }
        }
    ]).then((answers) => {
        // NOTE: The return type will be an array
        let results = [];   // Let's start with an empty array
        if(answers.queryType === "id"){
            results = myTeam.findEmployees(answers.queryType,answers.idValue);
        }
        else if(answers.queryType === "name"){
            results = myTeam.findEmployees(answers.queryType,answers.nameValue);
        }
        else if(answers.queryType === "email"){
            results = myTeam.findEmployees(answers.queryType,answers.emailValue);
        }
        else if(answers.queryType === "role"){
            // NOTE: We need to consider multiple roles
            for(const roleValue of answers.roleValues){
                let result = myTeam.findEmployees(answers.queryType,roleValue);
                if(result.length > 0){      // if the search return results
                    results.push(...result); // copy the contents of the array to the results array
                } 
            }
        }
        /*
        else{
            return [];  // return an empty array 
        }    // Do nothing, especially if answers.queryType === "cancel"
        */
        if(results.length < 0){
            console.log("Sorry, no results.");
            return mainMenu();
        }
        // TODO: What if we get one result back?
        console.table(results);
        return mainMenu();
    }).catch((error) => console.error(`An error occurred (findMembers)`, error));
}

// TODO: THE BIG FINALLY!
function generateMenu(){
    console.log("generate menu");
    return mainMenu();
}

/**
 * @method helpMenu
 * @desc Show the help menu
 * @param {string} previous previous location
 * @returns 
 */
 function helpMenu(){
    console.log("TPG > Help Menu");
    console.log("---------------");
    inquirer.prompt([{
        "type" : "list",
        "name" : "task",
        "message": "What would you like help with?",
        "choices": [
            {
                "name": "How to I get or set a team name?",
                "value": "team",
            },
            {
                "name": "How do I show/add/remove/update my team?",
                "value": "members"
            },
            {
                "name": "How do I generate profiles and/or documents?",
                "value": "generate"
            },
            new inquirer.Separator(),
            {
                "name": "About this program",
                "value": "about"
            },
            {
                "name": "Return to the main menu",
                "value": "back"
            }
        ],
    }]).then((answers) => {
        if(answers.task === "team"){
            return teamHelpMenu();
        }
        else if(answers.task === "members"){
            return membersHelpMenu();
        }
        else if(answers.task === "generate"){
            return generateHelpMenu();
        }
        else if(answers.task === "about"){
            console.log(`Team Profile Generate`);
            console.log(`Created by Jason Charney (@jrcharney)`);
            console.log(`for Washington University Full Stack Bootcamp`);
            console.log(`(c) 2022`);
            // TODO: add a pause here
            return helpMenu();
        }else{
            return mainMenu();
        }
    });
}

/**
 * @method teamHelpMenu
 * @desc Options for modifying a team
 */
function teamHelpMenu(){
    console.log("TPG > Help > Team Help");
    console.log("----------------------");
    console.log("The Team menu just has two options");
    console.log("- \"Get/Show team name\" will fetch the name of your team.");
    console.log("- \"Set/Update team name\" will ask you what to name or rename your team.");
    inquirer.prompt([{
        "type": "list",
        "name": "menu",
        "message": "Return",
        "choices": [
            {
                "name": "Team Menu",
                "value": "back"
            },
            {
                "name": "Help Menu",
                "value": "help"
            }
        ],
    }]).then((answer) => {
        if(answer.menu === "back"){
            return teamMenu();
        }else{
            return helpMenu();
        }
    });
}

/**
 * @method membersHelpMenu
 * @desc Options for listing, adding, updating, and removing team members
 */
function membersHelpMenu(){
    console.log("TPG > Help > Members Help");
    console.log("-------------------------");
    console.log("The Member Member Menu is used to assemble your team and has the following options");
    console.log("- \"Show team members\" will list all the team members in the team as well as their roles.");
    console.log("- \"Show a team member\" will show the profile of one team member. Depending on their role, it will also show specific information about their profile.");
    console.log("- \"Find a team member\" can be used to search for team members. You can use this function with \"Show a team member\".");
    console.log("- \"Add a team member\" will start the creation process for a new team member. Provide the name, the role, and a specific type of information depending on their role.");
    console.log("- \"Modify a team member\" will require you to look up what team member to modify first then the piece of information to modify.");
    console.log("- \"Remove a team member\" will require you to look up what team member to remove first then ask if you would like to remove them from the team. There is no undo.");
    inquirer.prompt([{
        "type": "list",
        "name": "menu",
        "message": "Return",
        "choices": [
            {
                "name": "Members Menu",
                "value": "back"
            },
            {
                "name": "Help Menu",
                "value": "help"
            }
        ],
    }]).then((answer) => {
        if(answer.menu === "back"){
            return membersMenu();
        }else{
            return helpMenu();
        }
    });
}

/**
 * @method generateHelpMenu
 * @desc Options for generating documents
 */
function generateHelpMenu(){
    console.log("TPG > Help > Generate Help");
    console.log("--------------------------");
    console.log("The Generate menu is used to generate documents and has the following options.")
    console.log("- \"Generate a team profile\" will create the index.html file.");
    console.log("- \"Generate a member profile\" will generate the user profile for a specific person. This should be in a folder called \"members\".");
    console.log("- \"Generate CSS Stylesheet\" will generate the CSS stylesheet for all documents");
    console.log("- \"Do Everything\" will do everything: generate the team profile, generate the member profiles, generate the stylesheet.");
    inquirer.prompt([{
        "type": "list",
        "name": "menu",
        "message": "Return",
        "choices": [
            {
                "name": "Generate Menu",
                "value": "back"
            },
            {
                "name": "Help Menu",
                "value": "help"
            }
        ],
    }]).then((answer) => {
        if(answer.menu === "back"){
            return generateMenu();
        }else{
            return helpMenu();
        }
    });
}

/**
 * @method exitProgram
 * @desc Ask the user if they would like to still use the program
 */
function exitProgram(){
    inquirer.prompt([{
        "type": "confirm",
        "name": "exit",
        "message": "Are you sure you want to quit this program?",
        "default" : false
    }]).then((answers) => {
        if(answers.exit){
            console.log("Goodbye.");
            return 0;
        }else{
            return mainMenu();
        }
    });
}

mainMenu();