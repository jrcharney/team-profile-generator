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
import { questions } from "./questions.js";
import { menus } from "./menus.js";
import { help } from "./help.js";

//inquirer.prompt([]).then((answers) => {}).catch((error) => {});

// TODO: Have Team menu create and destroy team objects
const myTeam = new Team();

// TODO: find a way to use a Team object as an argument
// TODO: export this list into a separate file
/*
const choices = {
    "who": () => {
        const employees = myTeam.getEmployees().map((employee) => {
            return {
                "name"  : employee.getName(),
                "value" : employee.getId()
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
}
*/

/**
 * @method mainMenu
 * @desc the main menu of the function
 */
function mainMenu(){
    //menus.headers.main();
    inquirer.prompt([menus.content.main]).then((answers) => {
        const tasks = {
            "team"     : teamMenu,
            "members"  : membersMenu,
            "generate" : generateMenu,
            "help"     : helpMenu,
            "exit"     : exitProgram
        }
        return tasks[answers.task]();
    })
}

/**
 * @method teamMenu
 * @desc show the options for modifying a team
 */
 function teamMenu(){
    //menus.headers.team();
    inquirer.prompt([menus.content.team]).then((answers) => {
        const tasks = {
            "get"  : getTeamName,
            "set"  : setTeamName,
            "help" : teamHelpMenu,
            "main" : mainMenu
        };
        return tasks[answers.task]();
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
    inquirer.prompt([
        // questions.team
        {
            "type"     : "input",
            "name"     : "team",
            "message"  : "Enter the team name",
            "validate" : (answer) => {
                if(!answer){
                    return "Please enter the team name";
                }
                return true;
            }
        }
    ]).then((answers) => {
        myTeam.setTeamName(answers.team);
        return mainMenu()
    }).catch((error) => console.error(`An error occurred (setTeamName)`, error));
}

/**
 * @method membersMenu
 * @desc Show the options for listing, adding, updating, and removing team members
 */
function membersMenu(){
    //menus.headers.members();
    inquirer.prompt([menus.content.members]).then((answers) => {
        // NOTE: All these options should return to the member menu
        const tasks = {
            "create"  : addMember,
            "read"    : listMembers,
            "update"  : updateMember,
            "delete"  : removeMember,
            "readOne" : showMember,
            "find"    : findMembers,
            "help"    : membersHelpMenu,
            "main"    : mainMenu
        };
        return tasks[answers.task]();
    });
};

/**
 * @method addMember
 * @desc Add a new member to the team
 */
function addMember(){
    inquirer.prompt([
        questions.role,
        questions.name,        
        questions.email,
        questions.office_number,
        questions.github,
        questions.school,
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
        // TODO: Restructure this part 
        if(answers.role === "manager"){
            myTeam.addEmployee(new Manager(answers.name,answers.email,answers.office_number));
        }
        else if(answers.role === "engineer"){
            myTeam.addEmployee(new Engineer(answers.name,answers.email,answers.github));
        }
        else if(answers.role === "intern"){
            myTeam.addEmployee(new Intern(answers.name,answers.email,answers.school));
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
    if(!myTeam.hasEmployees()){
        console.log("There are no employees on this team.");
    }else{
        console.table(myTeam.getRoster());
    }
    return mainMenu();
}

/**
 * @method updateMember
 * @desc Modify a specific value in a specific employee record
 */
function updateMember(){
    if(!myTeam.hasEmployees()){
        console.log("There are no employees on this team.");
        return mainMenu();
    }
    inquirer.prompt([
        // questions.who (update)
        {
            "type" : "list",
            "name" : "who",
            "message": "Which member should I modify?",
            "choices": myTeam.getNameChoices() //choices.who()
        },
        // questions.what (update)
        {
            "type": "list",
            "name": "what",
            "message": "What should I modify?",
            "choices": (answers) => {
                const employee = myTeam.getEmployeeById(answers.who);
                const role = employee.getRole().toLowerCase();
                const special = {
                    "manager" : "Office Number",
                    "engineer" : "Github Username",
                    "intern"   : "School"
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
                        "name": `${special[role]}`,
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
            ...questions.name,
            "when": (answers) => answers.what === 1
        },
        {
            ...questions.email,
            "when": (answers) => answers.what === 2
        },
        {
            ...questions.office_number,
            "when": (answers) => myTeam.isManager(answers.who) && answers.what === 3
        },
        {
            ...questions.github,
            "when": (answers) => myTeam.isEngineer(answers.who) && answers.what === 3
        },
        {
            ...questions.school,
            "when": (answers) => myTeam.isIntern(answers.who) && answers.what === 3
        }
    ]).then((answers) => {
        if(answers.who !== 0){
            //console.log(JSON.stringify(myTeam.findEmployeeById(answer.who),null," "));
            const employee = myTeam.getEmployeeById(answers.who);
            const tasks = [
                () => {},       // Do nothing
                () => {         // change name
                    const oldName = employee.getName();
                    employee.setName(answers.name);
                    const newName = employee.getName();
                    console.log(`${oldName} changed to ${newName}`);
                },
                () => {         // change email
                    const name = employee.getName();
                    const oldEmail = employee.getEmail();
                    employee.setEmail(answers.email);
                    const newEmail = employee.getEmail();
                    console.log(`${name}'s email address changed from "${oldEmail}" to "${newEmail}".`);
                },
                () => {         // change special
                    const name = employee.getName();
                    const role = employee.getRole();
                    const subtask = {
                        "Manager"  : () => {
                            const oldOfficeNumber = employee.getOfficeNumber();
                            employee.setOfficeNumber(answers.office_number);
                            const newOfficeNumber = employee.getOfficeNumber();
                            console.log(`${name}'s office number changed from ${oldOfficeNumber} to ${newOfficeNumber}.`);
                        },
                        "Engineer" : () => {
                            const oldGithub = employee.getGithub();
                            employee.setGithub(answers.github);
                            const newGithub = employee.getGithub();
                            console.log(`${name}'s Github username changed from "@${oldGithub}" to "@${newGithub}".`);
                        },
                        "Intern"   : () => {
                            const oldSchool = employee.getSchool();
                            employee.setSchool(answers.school);
                            const newSchool = employee.getSchool();
                            console.log(`${name}'s alta mater changed from "${oldSchool}" to "${newSchool}".`);
                        }
                    }
                    subtask[role]();
                }
            ];
            tasks[answers.what]();
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
    if(!myTeam.hasEmployees()){
        console.log("There are no employees on this team.");
        return mainMenu();
    }
    //console.table(myTeam.getRoster());      // Let's show the list before asking
    inquirer.prompt([
        // question.who (remove)
        {
            "type"    : "list",
            "name"    : "who",
            "message" : "Which member should I remove?",
            "choices" : myTeam.getNameChoices() //choices.who()
        }
    ]).then((answer) => {
        if(answer.who !== 0){
            myTeam.removeEmployee(answer.who);
        }
        return mainMenu();
    }).catch((error) => console.error(`An error occurred (removeMember)`, error));
}

/**
 * @method showMember
 * @desc Display the data for one member.
 */
function showMember(){
    if(!myTeam.hasEmployees()){
        console.log("There are no employees on this team.");
        return mainMenu();
    }
    inquirer.prompt([
        // question.who (readOne)
        {
            "type"    : "list",
            "name"    : "who",
            "message" : "Which member should I display?",
            "choices" : myTeam.getNameChoices() //choices.who()
        }
    ]).then((answer) => {
        if(answer.who !== 0){
            console.log(JSON.stringify(myTeam.findEmployeeById(answer.who),null," "));
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
        // questions.how
        {
            "type": "list",
            "name": "how",          // Formerly queryType
            "message": "What type of search should I use?",
            // choices.how
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
            ...questions.id,
            "when": (answer) => answer.how === "id"
        },
        {
            ...questions.name,
            "when": (answer) => answer.how === "name"           
        },
        {
            ...questions.email,
            "when": (answer) => answer.how === "email"
        },
        {
            "type": "checkbox",
            "name": "roles",                // NOTE: plural!
            "message": "Select an role",
            "choices": [
                "Manager",
                "Engineer",
                "Intern"
            ],
            "filter": (answers) => {
                return answers.map((answer) => answer.toLowerCase());   // TODO: Remove the filter later?
            },
            "validate": (answer) => {
                if(answer.length < 1){
                    return "You must choose at least one role to loop up."
                }
                return true;
            },
            // ...question.roles,
            "when": (answer) => answer.how === "role"
        }
    ]).then((answers) => {
        // NOTE: The return type will be an array
        let results = [];   // Let's start with an empty array
        // TODO: Restructure this block
        if(answers.how === "id"){
            results = myTeam.findEmployees(answers.how,answers.id);
        }
        else if(answers.how === "name"){
            results = myTeam.findEmployees(answers.how,answers.name);
        }
        else if(answers.how === "email"){
            results = myTeam.findEmployees(answers.how,answers.email);
        }
        else if(answers.how === "role"){
            // NOTE: We need to consider multiple roles
            // TODO: Can we use a reduce here?
            for(const role of answers.roles){
                let result = myTeam.findEmployees(answers.how,role);
                if(result.length > 0){      // if the search return results
                    results.push(...result); // copy the contents of the array to the results array
                } 
            }
        }
        /*
        else{
            return [];  // return an empty array 
        }    // Do nothing, especially if answers.how === "cancel"
        */
        if(results.length < 0){
            console.log("Sorry, no results.");
        }else{
            // TODO: What if we get one result back?
            console.table(results);
        }
        return mainMenu();
    }).catch((error) => console.error(`An error occurred (findMembers)`, error));
}

// TODO: THE BIG FINALLY!
function generateMenu(){
    //menus.headers.generate();
    inquirer.prompt([menus.content.generate]).then((answers) => {
        // NOTE: All these options should return to the generate menu
        const tasks = {
            "generateTeam"    : generateTeamProfile,
            "generateMembers" : generateMemberProfiles,
            "generateCSS"     : generateStylesheet,
            "everything"      : generateAll,
            "help"            : generateHelpMenu,
            "main"            : mainMenu
        };
        return tasks[answers.task]();
    });
}

/**
 * @method generateTeamProfile
 * @desc Generate the team profile
 * @returns 
 */
function generateTeamProfile(){
    if(!myTeam.hasEmployees()){
        console.log("You need to build your team first.");
        return mainMenu();
    }
}

/**
 * @method generateMemberProfile
 * @desc Generate a profile for a specific team member
 */
function generateMemberProfile(){
    // TODO: Member profile pages needs a link to the team profile
}

/**
 * @method generateMemberProfiles
 * @desc Generate the profiles for each member
 * @returns 
 * @todo Generate individual profiles.
 */
function generateMemberProfiles(){
    if(!myTeam.hasEmployees()){
        console.log("You need to build your team first.");
        return mainMenu();
    }
    inquirer.prompt([
        {
            "type" : "list",
            "name" : "who",
            "choices" : () => {
                const list = myTeam.getNameChoices();
                return [
                    {
                        "name" : "Everybody",
                        "value": "all"
                    },
                    ...list
                ];
            },
            "default": "all"
        }
    ]).then((answers) => {
        if(answers.who === 0){
            return mainMenu();
        }
        if(answers.who === "all"){
            const employees = myTeam.getEmployees();
            for(const employee of employees){
                generateMemberProfile(employee);
            }
        }else{
            const employee = myTeam.getEmployeeById(answers.who);
            generateMemberProfile(employee);
        }
        return mainMenu();
    }).catch((error) => console.error(`An error occurred (generateMemberProfiles)`, error));

}

/**
 * @method generateStylesheet
 * @desc Generate the stylesheet used by the team profile and member profiles
 * @returns 
 */
function generateStylesheet(){
    if(!myTeam.hasEmployees()){
        console.log("You need to build your team first.");
        return mainMenu();
    }
    // TODO: Might use Bootstrap
}

/**
 * @method generateAll
 * @returns Generate the team profiles, member profiles for all the members, and stylesheet in one command
 */
function generateAll(){
    if(!myTeam.hasEmployees()){
        console.log("You need to build your team first.");
        return mainMenu();
    }
    console.log("Generate All will generate everything.");
    inquirer.prompt([
        {
            "type": "confirm",
            "name": "doit",
            "message": "Are you sure you want to do this?",
            "default": false
        }
    ]).then((answers) => {
        if(!answers.doit){
            return mainMenu();
        }
        // Generate Stylesheet
        // Generate Team Profile
        // Generate Member Profiles for everybody
        const employees = myTeam.getEmployees();
        for(const employee of employees){
            generateMemberProfile(employee);
        }
        // TODO: Add links to the team profile to each of the employee pages.
        return mainMenu();
    }).catch((error) => console.error(`An error occurred (generateAll)`, error));

}

/**
 * @method helpMenu
 * @desc Show the help menu
 * @param {string} previous previous location
 * @returns 
 */
 function helpMenu(){
    help.headers.main();
    inquirer.prompt([menus.help.main]).then((answers) => {
        const tasks = {
            "team" : teamHelpMenu,
            "members" : membersHelpMenu,
            "generate" : generateHelpMenu,
            "about" : () => {
                help.messages.about();
                return helpMenu();
            },
            "back"  : mainMenu
        };
        return tasks[answers.menu]();
    });
}

/**
 * @method teamHelpMenu
 * @desc Options for modifying a team
 */
function teamHelpMenu(){
    help.headers.team();
    help.messages.team();
    inquirer.prompt([menus.help.team]).then((answers) => {
        const tasks = {
            "back": teamMenu,
            "help": helpMenu
        };
        return tasks[answers.menu]();
    });
}

/**
 * @method membersHelpMenu
 * @desc Options for listing, adding, updating, and removing team members
 */
function membersHelpMenu(){
    help.headers.members();
    help.messages.members();
    inquirer.prompt([menus.help.members]).then((answers) => {
        const tasks = {
            "back": membersMenu,
            "help": helpMenu
        };
        return tasks[answers.menu]();
    });
}

/**
 * @method generateHelpMenu
 * @desc Options for generating documents
 */
function generateHelpMenu(){
    help.headers.generate();
    help.messages.generate();
    inquirer.prompt([menus.help.generate]).then((answers) => {
        const tasks = {
            "back": generateMenu,
            "help": helpMenu
        };
        return tasks[answers.menu]();
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