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
            ]
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
            "default" : "read"
        },
        "generate" : {
            "type"    : "list",
            "name"    : "task",
            "message" : "What would you like to do?",
            "choices" : [
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
            "default": "everything"
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
            ]
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
        }
    }
}