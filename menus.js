/**
 * @file menus.js
 * @author Jason Charney (jrcharney@gmail.com)
 * @desc Menu questions for the main and help parts of the programs
 */
import inquirer from "inquirer";

export const menus = {
    "headers" : {
        "main" : () => {
            // TODO: clear screen?
            console.log("Team Profile Generator");
            console.log("----------------------");
        },
        "data" : () => {
            // TODO: clear screen?
            console.log("TPG > Data Menu");
            console.log("---------------");
        },
        "team" : () => {
            // TODO: clear screen?
            console.log("TPG > Team Menu");
            console.log("---------------");
        },
        "members" : () => {
            // TODO: clear screen?
            console.log("TPG > Member Menu");
            console.log("-----------------");
        },
        "generate" : () => {
            // TODO: clear screen?
            console.log("TPG > Generate Menu");
            console.log("-------------------");
        }
    },
    "content" : {
        "main": {
            "type": "list",
            "name": "task",
            "message": "What would you like to do?",
            "choices" : [
                {
                    "name": "Load/Save JSON data",
                    "value": "data"
                },
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
            ],
            "loop": false
        },
        "data": {
            "type" : "list",
            "name" : "task",
            "message" : "What would you like to do?",
            "choices" : [
                {
                    "name": "Load JSON data into current data",
                    "value": "loadData"
                },
                {
                    "name": "Save current data as a JSON file",
                    "value": "saveData"
                },
                {
                    "name": "View Data as JSON (long and sloppy!)",
                    "value": "viewData"
                },
                {
                    "name": "View Data as Table (neater, cleaner, SQL-like)",
                    "value": "viewTable"
                },
                new inquirer.Separator(),
                {
                    "name": "Tell me more about the items on this list.",
                    "value": "help"
                },
                {
                    "name": "Quit this program",
                    "value": "exit"
                }
            ],
            "loop": false
        },
        "team": {
            "type" : "list",
            "name" : "task",
            "message" : "What would you like to do?",
            "choices" : [
                {
                    "name": "Get/Show team name",
                    "value": "get"
                },
                {
                    "name": "Set/Update team name",
                    "value": "set"
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
            "loop": false
        },
        "members" : {
            "type"    : "list",
            "name"    : "task",
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
            "default" : "read",
            "loop": false
        },
        "generate" : {
            "type"    : "list",
            "name"    : "task",
            "message" : "What would you like to do?",
            "choices" : [
                {
                    "name"  : "Show file path",
                    "value" : "getFilePath"
                },
                {
                    "name"  : "Set the file path",
                    "value" : "setFilePath"
                },
                {
                    "name"  : "Generate a team profile",
                    "value" : "generateTeam"
                },
                {
                    "name"  : "Generate a member profile",
                    "value" : "generateMembers"
                },
                {
                    "name"  : "Generate a CSS Stylesheet",
                    "value" : "generateCSS"
                },
                {
                    "name"  : "Generate a JavaScript file",
                    "value" : "generateJS"
                },
                {
                    "name": "Do Everything!",
                    "value": "everything"
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
            "default": "everything",
            "loop": false
        },
        // TODO: Add menus for Generate methods here
    },
    "help": {
        "main"     : {
            "type" : "list",
            "name" : "menu",
            "message": "What would you like help with?",
            "choices": [
                {
                    "name": "How to I load/save/view data as JSON?",
                    "value": "data",
                },
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
            "loop": false
        },
        "data"     : {
            "type": "list",
            "name": "menu",
            "message": "Return",
            "choices": [
                {
                    "name": "Data Menu",
                    "value": "back"
                },
                {
                    "name": "Help Menu",
                    "value": "help"
                }
            ],
            "loop": false
        },
        "team"     : {
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
            "loop": false
        },
        "members" : {
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
            "loop": false
        },
        "generate" : {
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
            "loop": false
        }
    }
}