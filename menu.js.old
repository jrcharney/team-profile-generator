/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file menu.js
 * @desc Defining the menu and options for this program
 * @todo BIG WISHLIST ITEM: Test all oif this. Inquirer.js has been such a thorn in my side.
 */
import inquirer from "inquirer";
import Engineer from "./lib/Engineer";
import Intern from "./lib/Intern";
import Manager from "./lib/Manager";
import Team from "./lib/Team";

/**
 * @todo move this instance to index.js?
 */
const myTeam = new Team();

/**
 * @method main
 * @desc The main method
 * @todo move this to index.js
 */
function main(){
    mainMenu();
}

/**
 * @method mainMenu
 * @desc Display the main menu. This is the first stop.
 */
function mainMenu() {
    // TODO: Clear screen?
    console.log("Team Profile Generator");
    console.log("----------------------");
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
            helpMenu("main");
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
            helpMenu("team");
        }
        else if(answers.task === "main"){
            return;     // return to mainMenu();
        }
    });
};

/**
 * @method getTeamName
 * @desc fetch the team name
 * @returns {string}
 */
function getTeamName(){
    return myTeam.getTeamName();
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
        myTeam.setTeamName(answers.team);   // TODO: There may need to be some catching
        return;     // return to the teamMenu()
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
                "name": "Show team members",
                "value": "read"
            },
            {
                "name": "Show a team member",
                "value": "readOne"
            },
            {
                "name": "Find a team member",
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
            addMember();
        }
        else if(answers.task === "read"){
            return listMembers();           // TODO: Write this
        }
        else if(answers.task === "update"){
            return updateMember();          // TODO: Write this
        }
        else if(answers.task === "delete"){
            return removeMember();          // TODO: Write this
        }
        else if(answers.task === "readOne"){
            return showMember();            // TODO: Write this
        }
        else if(answers.task === "find"){
            return findMembers();            // TODO: Write this
        }
        else if(answers.task === "help"){
            return helpMenu("members");
        }
        else if(answers.task === "main"){
            return mainMenu();
        }
    });
};

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
                new inquirer.Separator(),
                "Cancel"        // TODO: Back out of this prompt with this option
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
            // TODO: make this required
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
            // TODO: make this required
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
            // TODO: make this required
        },
        {
            "type": "input",
            "name": "email",
            "message": "Please enter the employee email",
            "validate": (email) => {
                // Borrowed this REGEXP from https://gist.github.com/Amitabh-K/ae073eea3d5207efaddffde19b1618e8
                let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
                if(!valid){
                    return "Please enter a valid email address.";
                }
                return true;
            }
        },
        {
            "type": "confirm",
            "name": "askAgain",
            "message": (answers) => {
                let msg = "{\n";
                msg += `\t"name": "${answers.employeeName}",`;
                msg += `\t"role": "${answers.employeeType}",`;
                msg += `\t"email": "${answers.email}",`;
                if(answers.employeeType === "manager"){
                    msg += `\t"office_number": "${answers.officeNumber}",`;
                }
                else if(answers.employeeType === "engineer"){
                    msg += `\t"github": "${answers.github}",`;
                }
                else if(answers.employeeType === "intern"){
                    msg += `\t"school": "${answers.school}",`;
                }
                msg += "}\n";
                msg += "Is this correct?";
                return msg;
            },
            "default": false
        }
    ]).then((answers) => {
        if(answers.employeeType === "cancel"){
            return membersMenu();
        }
        if(answers.askAgain){
            addMember();
        }
        if(answers.employeeType === "manager"){
            myTeam.addEmployee(new Manager(answers.employeeName,answers.email,answers.officeNumber));
        }
        else if(answers.employeeType === "engineer"){
            myTeam.addEmployee(new Engineer(answers.employeeName,answers.email,answers.github));
        }
        else if(answers.employeeType === "intern"){
            myTeam.addEmployee(new Intern(answers.employeeName,answers.email,answers.school));
        }
    }).catch((error) => {
        console.error(`An error occurred (addMember)`, error);
    }); // TODO: There may need to be some catching
}

/**
 * @method listMembers
 * @desc display the current team roster as a table
 * @note Trying out console.table. This should output the team roster as a table.
 */
function listMembers(){
    console.table(myTeam.getRoster());
}
function updateMember(){
    // TODO: Run findMember first
    let members = findMembers();
    if(members.length < 1){
        return "Sorry, we cannot find anyone matching that criteria";
    }
    if(members.length > 1){
        console.log(`We found ${members.length} members matching that search.`);
        console.table(members);
        inquirer.prompt([
            {
                "type": "number",
                "name": "idValue",
                "message": "Select the id of the match you wish to modify",
                "validate": (answer) => {
                    if(isNaN(answer)){
                        return "Please enter a valid ID number."
                    }
                    return true;
                }
            },
            {
                "type": "checkbox",
                "name": "fields",
                "message": "What would you like to change?",
                "choices": (answer) => {
                    let choices = [
                        {
                            "name": "Name",
                            "value": "name"
                        },
                        {
                            "name": "Email",
                            "value": "email"
                        }
                    ];
                    const member = myTeam.findEmployeeById(answer.idValue);
                    const role = member.role.toLowerCase();
                    if(role === "manager"){
                        choices.push(
                            {
                                "name": "Office Number",
                                "value": "officeNumber"
                            }
                        );
                    }
                    else if(role === "engineer"){
                        choices.push(
                            {
                                "name": "Github Username",
                                "value": "github"
                            }
                        );
                    }
                    else if(role === "intern"){
                        choices.push(
                            {
                                "name": "Alta Mater",
                                "value": "school"
                            }
                        );
                    }
                    return choices;
                },
                "validate": (answer) => {
                    if(answer.length < 1){
                        return "You must choose at least one field you want to modify in this record";
                    }
                    return true;
                }
            },
            {
                "type": "input",
                "name": "name",
                "message": "Please enter a new name",
                "when": (answer) => answer.fields.includes("name")
            },
            {
                "type": "input",
                "name": "email",
                "message": "Please enter a new name",
                "when": (answer) => answer.fields.includes("email")
            },
            {
                "type": "number",
                "name": "officeNumber",
                "message": "Enter a new office number",
                "when": (answer) => answer.fields.includes("officeNumber"),
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
                "message": "Enter a new github username",
                "when": (answer) => answer.fields.includes("github"),
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
                "message": "Enter a new school",
                "when": (answer) => answer.fields.includes("school"),
                "validate": (answer) => {
                    if(!answer){
                        return "Please enter a school name."
                    }
                    return true;
                }
            },
            {
                "type": "confirm",
                "name": "askAgain",
                "message": (answers) => {
                    const member = myTeam.findEmployeeById(answers.idValue);
                    const role = member.role.toLowerCase();
                    let msg = "{\n";
                    msg += `\t"name": "${member.name}",`;
                    msg += `\t"role": "${member.role}",`;
                    msg += `\t"email": "${member.email}",`;
                    if(role === "manager"){
                        msg += `\t"officeNumber": "${member.officeNumber}",`;
                    }
                    else if(role === "engineer"){
                        msg += `\t"github": "${member.github}",`;
                    }
                    else if(role === "intern"){
                        msg += `\t"school": "${member.school}",`;
                    }
                    msg += "}\n";
                    msg += "Is this correct?";
                    return msg;
                },
                "default": false
            }
        ]).then((answers) => {
            const member = myTeam.findEmployeeById(answers.idValue);
            const role = member.role.toLowerCase();
            
        }).catch((error) => console.error(`An error occurred (updateMember)`, error));
    }


}
function removeMember(){}
function showMember(){}
/**
 * @method findMembers
 * @desc Ask how to find members and return an array of matching results
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
                new inquirer.Separator(),
                {
                    "name": "Cancel",
                    "value": "cancel"
                }                   // TODO: Back out of this prompt with this option
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
            "message": "Enter an employee email",
            "when": (answer) => answer.queryType === "email",
            "validate" : (email) => {
                // Borrowed this REGEXP from https://gist.github.com/Amitabh-K/ae073eea3d5207efaddffde19b1618e8
                let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
                if(!valid){
                    return "Please enter a valid employee name."
                }
                return true;
            }
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
        if(answers.queryType === "id"){
            return myTeam.findEmployees(answers.queryType,answers.idValue);
        }
        else if(answers.queryType === "name"){
            return myTeam.findEmployees(answers.queryType,answers.nameValue);
        }
        else if(answers.queryType === "role"){
            // NOTE: We need to consider multiple roles
            let results = [];   // start with an empty array
            for(const roleValue of answers.roleValues){
                let result = myTeam.findEmployees(answers.queryType,roleValue);
                if(result.length > 0){      // if the search return results
                    results.push(...result); // copy the contents of the array to the results array
                } 
            }
            return results;
        }
        else{
            return [];  // return an empty array 
        }    // Do nothing, especially if answers.queryType === "cancel"
    }).catch((error) => console.error(`An error occurred (findMembers)`, error));
}

/**
 * @method generateMenu
 * @desc Options for generating documents
 */
function generateMenu(){
    console.log("TPG > Generate Menu");
    console.log("-------------------");
    inquirer.prompt([{
        "type" : "list",
        "name" : "task",
        "message" : "What would you like to do?",
        "choices" : [
            {
                "name": "Generate team profile",
                "value": "generateTeam"
            },
            {
                "name": "Generate member profile",
                "value": "generateMember"
            },
            {
                "name": "Generate CSS Stylesheet",
                "value": "generateCSS"
            },
            {
                "name": "Do everything",
                "value": "doEverything"
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
        "default": "doEverything"
    }]).then((answers) => {
        if(answers.task === "generateTeam"){
            generateTeamProfile();              // TODO: Write this
        }
        else if(answers.task === "generateMember"){
            generateMemberProfile();            // TODO: Write this
        }
        else if(answers.task === "generateCSS"){
            generateCSS();                      // TODO: Write this
        }
        else if(answers.task === "doEverything"){
            doEverything();                     // TODO: Write this
        }
        else if(answers.task === "help"){
            return helpMenu("generate");
        }
        else if(answers.task === "main"){
            return mainMenu();
        }
    });
};

/**
 * @method helpMenu
 * @desc Show the help menu
 * @param {string} previous previous location
 * @returns 
 */
function helpMenu(previous){
    if(previous === "main"){
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
                    "name": "Return to the previous menu",
                    "value": "back"
                }
            ],
        }]).then((answers) => {
            if(answers.task === "team"){
                return teamHelpMenu(previous);
            }
            else if(answers.task === "members"){
                return membersHelpMenu(previous);
            }
            else if(answers.task === "generate"){
                return generateHelpMenu(previous);
            }
            else if(answers.task === "about"){
                console.log(`Team Profile Generate`);
                console.log(`Created by Jason Charney (@jrcharney)`);
                console.log(`for Washington University Full Stack Bootcamp`);
                console.log(`(c) 2022`);
                // TODO: add a pause here
                return helpMenu(previous);
            }
            else if(answers.task === "back"){
                if(previous === "team"){
                    return teamMenu();
                }
                else if(previous === "members"){
                    return membersMenu();
                }
                else if(previous === "generate"){
                    return generateMenu();
                }
            }
        });
    }
    else if(previous === "team"){
        return teamHelpMenu(previous);
    }
    else if(previous === "members"){
        return membersHelpMenu(previous);
    }
    else if(previous === "generate"){
        return generateHelpMenu(previous);
    }
}

/**
 * @method teamHelpMenu
 * @desc Options for modifying a team
 * @param {string} previous previous location 
 */
function teamHelpMenu(previous){
    console.log("TPG > Help > Team Help");
    console.log("----------------------");
    inquirer.prompt([{
        "type" : "list",
        "name" : "topic",
        "message" : "What do you need help with?",
        "choices" : [
            {
                "name": "Get/Show team name",
                "value": "getTeamName"
            },
            {
                "name": "Set/Update team name",
                "value": "setTeamName"
            },
            {
                "name": "Everything.",
                "value": "everything"
            },
            new inquirer.Separator(),
            {
                "name": "Return to the main Help Menu",
                "value": "help"
            }
        ]
    }]).then((answers) => {
        if(answers.topic === "getTeamName"){
            console.log("\"Get/Show team name\" will fetch the name of your team.");
            return teamHelpMenu("team");
        }
        else if(answers.topic === "setTeamName"){
            console.log("\"Set/Update team name\" will ask you what to name or rename your team.");
            return teamHelpMenu("team");
        }
        else if(answers.topic === "everything"){
            console.log("The Team member just has two options");
            return teamHelpMenu("team");
        }
        else if(answers.topic === "help"){
            return helpMenu("team");
        }
    });
}

/**
 * @method membersHelpMenu
 * @desc Options for listing, adding, updating, and removing team members
 * @param {string} previous previous location 
 */
function membersHelpMenu(previous){
    console.log("TPG > Help > Members Help");
    console.log("-------------------------");
    inquirer.prompt([{
        "type" : "list",
        "name" : "topic",
        "message" : "What do you need help with?",
        "choices" : [
            {
                "name": "Show team members",
                "value": "read"
            },
            {
                "name": "Show a team member",
                "value": "readOne"
            },
            {
                "name": "Find a team member",
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
            {
                "name": "Everything",
                "value": "everything"
            },
            new inquirer.Separator(),
            {
                "name": "Tell me more about the items on this list.",
                "value": "help"
            },
        ]
    }]).then((answer) => {
        if(answers.topic === "read"){
            console.log("\"Show team members\" will list all the team members in the team as well as their roles.");
            return membersHelpMenu("members");
        }
        else if(answers.topic === "readOne"){
            console.log("\"Show a team member\" will show the profile of one team member. Depending on their role, it will also show specific information about their profile.");
            return membersHelpMenu("members");
        }
        else if(answers.topic === "find"){
            console.log("\"Find a team member\" can be used to search for team members. You can use this function with \"Show a team member\".");
            return membersHelpMenu("members");
        }
        else if(answers.topic === "create"){
            console.log("\"Add a team member\" will start the creation process for a new team member. Provide the name, the role, and a specific type of information depending on their role.");
            return membersHelpMenu("members");
        }
        else if(answers.topic === "update"){
            console.log("\"Modify a team member\" will require you to look up what team member to modify first then the piece of information to modify.");
            return membersHelpMenu("members");
        }
        else if(answers.topic === "delete"){
            console.log("\"Remove a team member\" will require you to look up what team member to remove first then ask if you would like to remove them from the team. There is no undo.");
            return membersHelpMenu("members");
        }
        else if(answers.topic === "everything"){
            console.log("The Team Member Menu has the following options");
            console.log("* \"Show team members\" will list all the team members in the team as well as their roles.");
            console.log("* \"Show a team member\" will show the profile of one team member. Depending on their role, it will also show specific information about their profile.");
            console.log("* \"Find a team member\" can be used to search for team members. You can use this function with \"Show a team member\".");
            console.log("* \"Add a team member\" will start the creation process for a new team member. Provide the name, the role, and a specific type of information depending on their role.");
            console.log("* \"Modify a team member\" will require you to look up what team member to modify first then the piece of information to modify.");
            console.log("* \"Remove a team member\" will require you to look up what team member to remove first then ask if you would like to remove them from the team. There is no undo.");
            // TODO: Pause beofore returning to the main menu
            return membersHelpMenu("members");
        }
        else if(answers.topic === "help"){
            return helpMenu("members");
        }
    });
}

/**
 * @method generateHelpMenu
 * @desc Options for generating documents
 * @param {string} previous previous location 
 */
function generateHelpMenu(previous){
    console.log("TPG > Help > Generate Help");
    console.log("--------------------------");
    inquirer.prompt([{
        "type": "list", 
        "name": "topic",
        "message":"What do you need help with?",
        "choices": [
            {
                "name": "Generate a team profile",
                "value": "generateTeam"
            },
            {
                "name": "Generate a member profile",
                "value": "generateMember"
            },
            {
                "name": "Generate CSS stylesheet",
                "value": "generateCSS"
            },
            {
                "name": "Do Everything",
                "value": "Do Everything"
            },
            {
                "name": "Everything",
                "value": "everything"
            },
            new inquirer.Separator(),
            {
                "name": "Return to the main help menu",
                "value": "help"
            }
        ]
    }]).then((answers) => {
        if(answers.topic === "generateTeam"){
            console.log("\"Generate a team profile\" will create the index.html file.");
            return generateHelpMenu("generate");
        }
        else if(answers.topic === "generateMember"){
            console.log("\"Generate a member profile\" will generate the user profile for a specific person. This should be in a folder called \"members\".");
            return generateHelpMenu("generate");
        }
        else if(answers.topic === "generateCSS"){
            console.log("\"Generate CSS Stylesheet\" will generate the CSS stylsheet for all documents");
            return generateHelpMenu("generate");
        }
        else if(answers.topic === "doEverything"){
            console.log("\"Do Everything\" will do everything: generate the team profile, generate the member profiles, generate the stylesheet.");
            return generateHelpMenu("generate");
        }
        else if(answers.topic === "everything"){
            console.log("The document generation menu has the following options.")
            console.log("* \"Generate a team profile\" will create the index.html file.");
            console.log("* \"Generate a member profile\" will generate the user profile for a specific person. This should be in a folder called \"members\".");
            console.log("* \"Generate CSS Stylesheet\" will generate the CSS stylsheet for all documents");
            console.log("* \"Do Everything\" will do everything: generate the team profile, generate the member profiles, generate the stylesheet.");
            // TODO: Pause then return to help menu
            return generateHelpMenu("generate");
        }
        else if(answers.topic === "help"){
            return helpMenu("generate");
        }
    });

}

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