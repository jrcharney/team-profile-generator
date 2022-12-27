/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file test/Team.test.js
 * @desc Unit testing for the Team class
 * @note All the Employee types are used in this file because we can't simply import Employee and test Team functions abstractly.
 *       Also, due to the complexity of just testing the getProfile method in each of the Employee types, testing showTeamProfile will not be done here.
 */
import {describe, it, expect} from "@jest/globals";
import Engineer from "../lib/Engineer.js";
import Intern from "../lib/Intern";
import Manager from "../lib/Manager.js";
import Team from "../lib/Team.js";

describe("Team",() => {
    // "In 1972, a crack commando unit was sent to prison by a military court for a crime they didn't commit. 
    // These men promptly escaped from a maximum security stockade to the Los Angeles underground. 
    // Today, still wanted by the government, they survive as soldiers of fortune. 
    // If you have a problem, if no one else can help, and if you can find them, maybe you can hire... the A-Team."
    const teamName = "The A-Team";
    const teamMembers = [
        // They all have .onion emails because, well, they are supposed to be hard to find
        new Manager("John 'Hannibal' Smith","hannibal@a-team.onion",1),
        new Engineer("Templeton 'Faceman' Peck","faceman@a-team.onion","faceman"),
        new Engineer("Bosco Albert 'B.A.' Baracus","bosco@a-team.onion","babaracus"),
        new Intern("Henry M. 'Howling Mad' Murdock","hmmurdock@a-team.onion","Howling Mad University")
    ];
    const aTeam = new Team(teamName,...teamMembers);

    // TODO: test setTeamName
    describe("getTeamName",() => {
        it("should return the team name.",() => {
            expect(aTeam.getTeamName()).toBe("The A-Team");
        })
    });
    // TODO: test setEmployees
    describe("getEmployees",() => {
        it("should return a list of employees",() => {
            const actual = teamMembers;
            expect(aTeam.getEmployees()).toStrictEqual(actual);
        })
    });
    describe("getEmployeeById",() => {
        it("should return a specific employee",() => {
            // To check if our method works, we need to call a method from this object
            const actual = { "id": 4, "name": "Henry M. 'Howling Mad' Murdock", "email": "hmmurdock@a-team.onion", "role": "Intern",   "school": "Howling Mad University" };
            expect(aTeam.getEmployeeById(4).getJSON()).toStrictEqual(actual);
        });
    });
    describe('getRoster',() => {
        it("should return a generic JSON list of employees", () => {
            const actual = [
                { "id": 1, "name": "John 'Hannibal' Smith",          "email": "hannibal@a-team.onion",  "role": "Manager", "officeNumber": 1 },
                { "id": 2, "name": "Templeton 'Faceman' Peck",       "email": "faceman@a-team.onion",   "role": "Engineer", "github": "faceman" },
                { "id": 3, "name": "Bosco Albert 'B.A.' Baracus",    "email": "bosco@a-team.onion",     "role": "Engineer", "github": "babaracus" },
                { "id": 4, "name": "Henry M. 'Howling Mad' Murdock", "email": "hmmurdock@a-team.onion", "role": "Intern",   "school": "Howling Mad University" }
            ];
            expect(aTeam.getRoster()).toStrictEqual(actual);
        })
    });
    describe('getManagers',() => {
        it("should return a generic JSON list of employees who are Managers", () => {
            const actual = [
                { "id": 1, "name": "John 'Hannibal' Smith",          "email": "hannibal@a-team.onion",  "role": "Manager", "officeNumber": 1 }
            ];
            expect(aTeam.getManagers()).toStrictEqual(actual);
        })
    });
    describe('getEngineers',() => {
        it("should return a generic JSON list of employees who are Engineers", () => {
            const actual = [
                { "id": 2, "name": "Templeton 'Faceman' Peck",       "email": "faceman@a-team.onion",   "role": "Engineer", "github": "faceman" },
                { "id": 3, "name": "Bosco Albert 'B.A.' Baracus",    "email": "bosco@a-team.onion",     "role": "Engineer", "github": "babaracus" }
            ];
            expect(aTeam.getEngineers()).toStrictEqual(actual);
        })
    });
    describe('getInterns',() => {
        it("should return a generic JSON list of employees who are Interns", () => {
            const actual = [
                { "id": 4, "name": "Henry M. 'Howling Mad' Murdock", "email": "hmmurdock@a-team.onion", "role": "Intern",   "school": "Howling Mad University" }
            ];
            expect(aTeam.getInterns()).toStrictEqual(actual);
        })
    });
    describe('findEmployees',() => {
        // Note: An array is returned
        // Yes, I know I should only test things one at a time. But this was an exceptional case
        it("should find an employee by their id", () => {
            // Find B.A. Baracus
            const actual = [
                { "id": 3, "name": "Bosco Albert 'B.A.' Baracus",    "email": "bosco@a-team.onion",     "role": "Engineer", "github": "babaracus" }
            ];
            expect(aTeam.findEmployees("id",3)).toStrictEqual(actual);
        })
        it("should find an employee by their name", () => {
            // Find Faceman
            const actual = [
                { "id": 2, "name": "Templeton 'Faceman' Peck",       "email": "faceman@a-team.onion",   "role": "Engineer", "github": "faceman" }
            ];
            expect(aTeam.findEmployees("name","Templeton 'Faceman' Peck")).toStrictEqual(actual);
        })
        it("should find an employee by their email", () => {
            // Find Murdock
            const actual = [
                { "id": 4, "name": "Henry M. 'Howling Mad' Murdock", "email": "hmmurdock@a-team.onion", "role": "Intern",   "school": "Howling Mad University" }
            ];
            expect(aTeam.findEmployees("email","hmmurdock@a-team.onion")).toStrictEqual(actual);
        })
        it("should find an employee by their role", () => {
            // Find Hannibal
            const actual = [
                { "id": 1, "name": "John 'Hannibal' Smith",          "email": "hannibal@a-team.onion",  "role": "Manager", "officeNumber": 1 }
            ];
            expect(aTeam.findEmployees("role","Manager")).toStrictEqual(actual);
        })
    });
    describe('fineEmployeeById',() => {
        it("should find an employee by their id", () => {
            // find that foo' Murdock!
            const actual = [
                { "id": 4, "name": "Henry M. 'Howling Mad' Murdock", "email": "hmmurdock@a-team.onion", "role": "Intern",   "school": "Howling Mad University" }
            ];
            expect(aTeam.findEmployeeById(4)).toStrictEqual(actual);
        })
    });
    // TODO: test addEmployee
    // TODO: test removeEmployee
    // TODO: Eventually get this next test to work
    /*
    describe('showTeamProfile', () => {
        it("should show a list of team members with their profiles", () => {});
        let actual = `<div class="team"><div class="team-header"><h2>${aTeam.getTeamName()}</h2></div><div class="team-body">`;
        actual += teamMembers[0].showProfile();
        actual += teamMembers[1].showProfile();
        actual += teamMembers[2].showProfile();
        actual += teamMembers[3].showProfile();
        actual += `</div></div>`;
        expect(aTeam.showTeamProfile()).toStrictEqual(actual);
    });
    */
});