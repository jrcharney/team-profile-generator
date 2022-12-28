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
        "data" : () => {
            console.log("TPG > Help > Data");
            console.log("-----------------");
        },
        "team" : () => {
            console.log("TPG > Help > Team");
            console.log("-----------------");
        },
        "members" : () => {
            console.log("TPG > Help > Members");
            console.log("--------------------");
        },
        "generate" : () => {
            console.log("TPG > Help > Generate");
            console.log("---------------------");
        }
    },
    "messages": {
        "about" : () => {
            console.log(`Team Profile Generator`);
            console.log(`Created by Jason Charney (@jrcharney)`);
            console.log(`for Washington University Full Stack Bootcamp`);
            console.log(`(c) 2022`);
        },
        "data" : () => {
            console.log("The Data menu was created to make inputing example data easier.");
            console.log("However, it's usefulness can be extended into loading/saving data in a JSON format");
            console.log("as a quick and easy way to read and write data for this program to use.")
            console.log("- \"Load JSON data into current data\" will load data from a JSON file into the current data.")
            console.log("- \"Save current data as a JSON file\" will save the data from the current data as a JSON file.");
            console.log("- \"View Data as JSON\" will show the current data as JSON. This could be long and hard to read.");
            console.log("- \"View Data as Table\" will use 'console.table' to make the JSON data be viewable as a table, sort of like in SQL. It is also much easier to read.");
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
            console.log("- \"Generate a JavaScript file\" will generate the JavaScript file for all documents");
            console.log("- \"Do Everything!\" will do everything: generate the team profile, generate the member profiles, generate the stylesheet.");
        }
    }
}