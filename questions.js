/**
 * @file questions.js
 * @author Jason Charney (jrcharney@gmail.com)
 * @desc An object that contains a list of frequent questions.
 */
export const questions = {
    "id" : {
        "type": "number",
        "name": "id",
        "message": "Enter an employee ID number",
        "validate" : (answer) => {
            if(isNaN(answer)){
                return "Please enter a valid ID number."
            }
            return true;
        }
    },
    "role" : {
        "type": "list",
        "name": "role",
        "message" : "What type of employee would you like to add to your team?",
        "choices" : [
            "Manager",
            "Engineer",
            "Intern"
        ],
        "default" : "engineer",
        "filter"  : (val) => val.toLowerCase()  // TODO: Probably should remove the filter
    },
    "name" : {
        "type"     : "input",
        "name"     : "name",
        "message"  : "What is the employee's name?",
        "validate" : (answer) => {
            if(!answer){
                return "Name cannot be empty. Please enter a name."
            }
            return true;
        }
    },
    "email" : {
        "type"     : "input",
        "name"     : "email",
        "message"  : "What is the employee's email?",
        "validate" : (email) => {
            // Borrowed this REGEXP from https://www.w3resource.com/javascript/form/email-validation.php
            let valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
            if(!valid){
                return "Please enter a valid email address.";
            }
            return true;
        }
    },
    "office_number" : {
        "type"     : "number",
        "name"     : "office_number",
        "message"  : "What is the office ID number of the office they manage?",
        "when"     : (answers) => answers.role === "manager",
        "validate" : (num) => {
            if(isNaN(num)){
                return "Please enter a valid office number";
            }
            return true;
        }
    },
    "github" : {
        "type"     : "input",
        "name"     : "github",
        "message"  : "What is this engineer's github username?",
        "when": (answers) => answers.role === "engineer",
        "validate" : (answer) => {
            if(!answer){
                return "Please enter a valid github username."
            }
            return true;
        }
    },
    "school" : {
        "type": "input",
        "name": "school",
        "message": "Where did this intern go to school?",
        "when": (answers) => answers.role === "intern",
        "validate": (answer) => {
            if(!answer){
                return "Please enter a school name."
            }
            return true;
        }
    }
}