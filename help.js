/**
 * @file help.js
 * @author Jason Charney (jrcharney@gmail.com)
 * @desc An object that contains various help messages.
 */
export const help = {
    "headers": {
        "main" : () => {
            console.log("TPG > Help Menu");
            console.log("---------------");
        },
        "team" : () => {
            console.log("TPG > Help > Team Help");
            console.log("----------------------");        
        },
        "members" : () => {
            console.log("TPG > Help > Members Help");
            console.log("-------------------------");
        },
        "generate" : () => {
            console.log("TPG > Help > Generate Help");
            console.log("--------------------------");
        }
    },
    "messages": {
        "about" : () => {
            console.log(`Team Profile Generator`);
            console.log(`Created by Jason Charney (@jrcharney)`);
            console.log(`for Washington University Full Stack Bootcamp`);
            console.log(`(c) 2022`);
        },
        "team" : () => {
            console.log("The Team menu just has two options");
            console.log("- \"Get/Show team name\" will fetch the name of your team.");
            console.log("- \"Set/Update team name\" will ask you what to name or rename your team.");
        },
        "members" : () => {
            console.log("The Member Member Menu is used to assemble your team and has the following options");
            console.log("- \"Show team members\" will list all the team members in the team as well as their roles.");
            console.log("- \"Show a team member\" will show the profile of one team member. Depending on their role, it will also show specific information about their profile.");
            console.log("- \"Find a team member\" can be used to search for team members. You can use this function with \"Show a team member\".");
            console.log("- \"Add a team member\" will start the creation process for a new team member. Provide the name, the role, and a specific type of information depending on their role.");
            console.log("- \"Modify a team member\" will require you to look up what team member to modify first then the piece of information to modify.");
            console.log("- \"Remove a team member\" will require you to look up what team member to remove first then ask if you would like to remove them from the team. There is no undo.");
        },
        "generate" : () => {
            console.log("The Generate menu is used to generate documents and has the following options.")
            console.log("- \"Get file path\" show the file path where the files will be put.");
            console.log("- \"Set file path\" is used to set where the files will be put.");
            console.log("- \"Generate a team profile\" will create the index.html file.");
            console.log("- \"Generate a member profile\" will generate the user profile for a specific person. This should be in a folder called \"members\".");
            console.log("- \"Generate CSS Stylesheet\" will generate the CSS stylesheet for all documents");
            console.log("- \"Do Everything!\" will do everything: generate the team profile, generate the member profiles, generate the stylesheet.");
        }
    }
}