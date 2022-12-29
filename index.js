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
import HTMLDoc from "./lib/HTMLDoc.js";
import CSSDoc from "./lib/CSSDoc.js";
import JSDoc from "./lib/JSDoc.js";
import { CDNLink } from "./lib/CDNLink.js";
import { CDNScript } from "./lib/CDNScript.js";
import { Link } from "./lib/Link.js";
import JSONDoc from "./lib/JSONDoc.js";

//inquirer.prompt([]).then((answers) => {}).catch((error) => {});

// TODO: Have Team menu create and destroy team objects
const myTeam = new Team();

let filepath = "./dist";

/**
 * @method mainMenu
 * @desc the main menu of the function
 * @todo Reorganize the menu options to be less convoluted.
 */
function mainMenu(){
    //menus.headers.main();
    inquirer.prompt([menus.content.main]).then((answers) => {
        const tasks = {
            "data"     : dataMenu,
            "team"     : teamMenu,
            "members"  : membersMenu,
            "generate" : generateMenu,
            "help"     : helpMenu,
            "exit"     : exitProgram
        }
        return tasks[answers.task]();
    })
}

/* ## Data Menu Methods --------------- */

/**
 * @method dataMenu
 * @desc Instead of going through all the tedious prompts, use a JSON file to load or save data
 * @todo Should I rename this the File Menu?
 * @todo header
 * @todo help
 * @todo questions
 */
function dataMenu(){
    // menus.headers.data();
    inquirer.prompt([menus.content.data]).then((answers) => {
        const tasks = {
            "loadData"  : loadJSONData,
            "saveData"  : saveJSONData,
            "viewData"  : viewJSONData,
            "viewTable" : viewJSONTable,
            "help"      : dataHelpMenu,
            "main"      : mainMenu
        };
        return tasks[answers.task]();
    });
}

/**
 * @method loadJSONData
 * @desc Use a JSON file to load data instead of tediously going through all the prompts to load data.
 * @returns 
 * @status iffy. For some reason, it executes without asking.
 */
function loadJSONData(){
    inquirer.prompt([
        {
            "type": "input",
            "name": "read_file",
            "message": "Enter the location of the JSON file to read",
            "validate" : (answer) => {
                if(!answer){
                    return "file cannot be empty. Please enter a file name with path."
                }
                return true;
            },
            "default": "./dist/data.json"
        }
    ]).then((answers) => {
        // TODO: check to make sure the file being read is a JSON file (has .json extenstion)
        // Some geek wrote this code. :D https://dev.to/codefinity/split-path-string-15fb
        let filestring = answers.read_file.split('/');
        const fn = filestring.pop();        // file name
        const fp = filestring.join("/");    // file path
        const file = new JSONDoc(fp,fn);    // TODO: should I delete this later?
        const data = file.readPage();
        // TODO: What if multiple teams are found?
        myTeam.readJSON(data);
        console.log(`Data from ${answers.file} loaded into Team ${myTeam.getTeamName()}`);
    }).catch((error) => console.error(`An error occurred (loadJSONData)`, error));
    return dataMenu();
}

/**
 * @method saveJSONData
 * @desc Save the entered data so far into a JSON file. Ideal if you need to demo a lot of data.
 * @returns 
 * @note THIS WORKS! (happy dance!)
 */
function saveJSONData(){
    inquirer.prompt([
        {
            "type": "input",
            "name": "file",
            "message": "Enter where to save the JSON file",
            "validate" : (answer) => {
                if(!answer){
                    return "file cannot be empty. Please enter a file name with path."
                }
                return true;
            },
            "default": "./dist/data.json"
        }
        // TODO: if file exists, ask if you would like to overwrite it first.
    ]).then((answers) => {
        // TODO: check to make sure the file being saved is a JSON file (has .json extenstion)
        let filestring = answers.file.split('/');
        const fn = filestring.pop();        // file name
        const fp = filestring.join("/");    // file path
        const file = new JSONDoc(fp,fn);    // TODO: should I delete this later?
        const data = myTeam.writeJSON();
        file.setContent(data);
        file.writePage();
    }).catch((error) => console.error(`An error occurred (saveJSONData)`, error));
    return dataMenu();
}

function viewJSONData(){
    if(!myTeam.hasEmployees()){
        console.log("Sorry, but this team doesn't have any members yet.");
    }else{
        console.log(myTeam.writeJSON());
    }
    return dataMenu();
}

function viewJSONTable(){
    if(!myTeam.hasEmployees()){
        console.log("Sorry, but this team doesn't have any members yet.");
    }else{
        console.table(myTeam.writeJSON());
    }
    return dataMenu();
}

/* ## Team Menu Methods ------------------- */

/**
 * @method teamMenu
 * @desc show the options for modifying a team
 * @todo Create team objects
 * @todo List team objects
 * @todo Select the team object we want to manipulate
 * @todo Delete a team object
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

/* ## Member Menu Methods --------------- */

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
            "choices": myTeam.getNameChoices(), //choices.who()
            "loop": false
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
            "loop": false,
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
            "choices" : myTeam.getNameChoices(), //choices.who()
            "loop": false
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
            "choices" : myTeam.getNameChoices(), //choices.who()
            "loop": false
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
            "default": "name",
            "loop": false
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

/* ## Generate Menu Methods ------------- */

/**
 * @method generateMenu
 * @desc The menu for the generating methods
 */
function generateMenu(){
    //menus.headers.generate();
    inquirer.prompt([menus.content.generate]).then((answers) => {
        // NOTE: All these options should return to the generate menu
        const tasks = {
            "getFilePath"     : getFilePath,
            "setFilePath"     : setFilePath,
            "generateTeam"    : generateTeamProfile,
            "generateMembers" : generateMemberProfiles,
            "generateCSS"     : generateStylesheet,
            "generateJS"      : generateJavaScript,
            "everything"      : generateAll,
            "help"            : generateHelpMenu,
            "main"            : mainMenu
        };
        return tasks[answers.task]();
    });
}

function getFilePath(){
    console.log(`Files are stored at ${filepath}`);
    return generateMenu();
}

function setFilePath(){
    inquirer.prompt([{
        // TODO: What is the current working directory?
        "type"     : "input",
        "name"     : "filepath",
        "message"  : "Where should I put the files?",
        "validate" : (answer) => {
            if(!answer){
                return "Filepath cannot be empty. Please enter a filepath."
            }
            return true;
        },
        "default" : "./dist"
    }]).then((answers) => {
        filepath = answers.filepath;
        console.log(`Filepath is now set to ${filepath}`);
    }).catch((error) => console.error(`An error occurred (setFilePath)`, error))
    return generateMenu();
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
    // TODO: Fill in this part
    // TODO: in a future version, use the team name as the file name, but have index.html link to each of the teams.
    const teamProfile = new HTMLDoc(filepath,"index.html");
    teamProfile.setPageTitle(`${myTeam.getTeamName()}`);
    teamProfile.addStylesheets(new CDNLink("https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/css/bootstrap.min.css","sha512-SbiR/eusphKoMVVXysTKG/7VseWii+Y3FdHrt0EpKgpToZeemhqHeZeLWLhJutz/2ut2Vw1uQEj2MbRF+TVBUA=="));
    teamProfile.addJavaScripts(new CDNScript("https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.min.js","sha512-1/RvZTcCDEUjY/CypiMz+iqqtaoQfAITmNSJY17Myp4Ms5mdxPS5UV7iOfdZoxcGhzFbOm6sntTKJppjvuhg4g=="));
    teamProfile.addStylesheets(new Link(`${filepath}/assets/css/styles.css`));
    const teamHeader = `<h1>${myTeam.getTeamName()}</h1>`;
    const items = myTeam.getEmployees().map((employee) => {
        const filename = employee.getName().replace(/[^a-z]/gi,'') + ".html";
        const url = `${filepath}/members/${filename}`;
        const name = employee.getName();
        const role = employee.getRole();
        const link = `<li><strong>${role}</strong>: <a href="${url}">${name}</a></li>\n`;
        return link;
    });
    const teamMembers = `<ul>\n${items}<ul>\n`;
    // TODO: styling
    teamProfile.addContent(teamHeader,teamMembers);
    teamProfile.writePage();
}

/**
 * @method generateMemberProfile
 * @desc Generate a profile for a specific team member
 */
function generateMemberProfile(employee){
    // TODO: Member profile pages needs a link to the team profile
    // TODO: Members need to be put in a child folder called members
    // In the file name, all non-alphabetic characters will be removed
    const filename = employee.getName().replace(/[^a-z]/gi,'') + ".html";
    const memberProfile = new HTMLDoc(`${filepath}/members`,filename);
    memberProfile.setPageTitle(`${myTeam.getTeamName()} - ${employee.getName()}`);
    memberProfile.addStylesheets(new CDNLink("https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/css/bootstrap.min.css","sha512-SbiR/eusphKoMVVXysTKG/7VseWii+Y3FdHrt0EpKgpToZeemhqHeZeLWLhJutz/2ut2Vw1uQEj2MbRF+TVBUA=="));
    memberProfile.addJavaScripts(new CDNScript("https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.min.js","sha512-1/RvZTcCDEUjY/CypiMz+iqqtaoQfAITmNSJY17Myp4Ms5mdxPS5UV7iOfdZoxcGhzFbOm6sntTKJppjvuhg4g=="));
    memberProfile.addStylesheets(new Link(`${filepath}/assets/css/styles.css`));
    // TODO: What if the file already exists?
    const nameHeader = `<h1>${employee.getName()}</h1>`;
    const roleHeader = `<h2>${employee.getRole()}</h2>`;
    const idNumber  = `<strong>ID:</strong> ${employee.getId()}`;
    const emailLink = `<strong>Email:</strong> <a href="mailto:${employee.getEmail()}" title="Click here to send and email to ${employee.getName()}"  target="_blank">Email</a>`;
    const specials = {
        "Manager"  : () => `<strong>Office Number: </strong> ${employee.getOfficeNumber()}`,
        "Engineer" : () => `<strong>Github: </strong> <a href="https://github.com/${employee.getGithub()}" title="Click here to go to ${employee.getName()}'s Github Profile" target="_blank">@${employee.getGithub()}</a>`,
        "Intern"   : () => `<strong>School:</strong> ${employee.getSchool()}`
    }
    const special = specials[employee.getRole()]();
    const teamHeader = `<div><h1>${myTeam.getTeamName()}</h1></div>`;
    const cardHeader = `<div class="card-header">\n${nameHeader}\n${roleHeader}\n</div>\n`;
    const items = [idNumber,emailLink,special].map((item) => `<li>${item}</li>\n`);
    const list  = `<ul>${items}</ul>`;
    const cardBody = `<div class="card-body">${list}</div>\n`;
    const card = `<div class="card">${cardHeader}${cardBody}</div>`;
    const footer = `<hr>\n<a href="./index.html">Return to Team Profile</a>`;
    memberProfile.addContent(teamHeader,card,footer);
    memberProfile.writePage();
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
            "default": "all",
            "loop": false
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
    // TODO: Put the stylesheet in the ${filepath}/assets/css directory
    const stylesheet = new CSSDoc(`${filepath}/assets/css`,`styles.css`);
    stylesheet.writePage();
    // TODO: need to add content to the file!
}

function generateJavaScript(){
    if(!myTeam.hasEmployees()){
        console.log("You need to build your team first.");
        return mainMenu();
    }
    // TODO: Might use Bootstrap
    // TODO: Put the stylesheet in the ${filepath}/assets/css directory
    const javascript = new JSDoc(`${filepath}/assets/css`,`script.js`);
    javascript.writePage();
    // TODO: need to add content to the file!
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

/* ## Help Menus ------------- */

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
            "data" : dataHelpMenu,
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
 * @method dataHelpMenu
 * @desc Options for quickly loading and saving data as JSON before processing it as HTML
 */
function dataHelpMenu(){
    help.headers.team();
    help.messages.team();
    inquirer.prompt([menus.help.data]).then((answers) => {
        const tasks = {
            "back": dataMenu,
            "help": helpMenu
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

/* ## Exit Command ------------ */

/**
 * @method exitProgram
 * @desc Ask the user if they would like to still use the program
 */
function exitProgram(){
    inquirer.prompt([{
        "type": "confirm",
        "name": "exit",
        "message": "Are you sure you want to quit this program?",
        "default" : false,
        "loop": false
    }]).then((answers) => {
        if(answers.exit){
            console.log("Goodbye.");
            return 0;
        }else{
            return mainMenu();
        }
    });
}

/* ## Main Method ------------- */

/**
 * @method main
 * @description the main method. This program has grown way too large. It probably should have a central function
 */
 function main(){
    mainMenu();
}

// mainMenu();
main();