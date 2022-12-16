/**
 * @file test/Intern.test.js
 * @desc Unit testing for the Intern class
 */

import {describe, it, expect} from "@jest/globals";
import Intern from "../lib/Intern.js";

describe("Intern",() => {
    // This object will be used for all the test below.
    const intern = new Intern("Jason Charney","jrcharney@fakeuniversity.edu","Fake University");

    describe("getId", () => {
        it("should return an employee ID of 1.",() => {
            expect(intern.getId()).toBe(1);
        });
    })
    describe("getName", () => {
        it("should return the employee name.",() => {
            expect(intern.getName()).toBe("Jason Charney");
        })
    });
    describe("getEmail",() => {
        it("should return the employee email.", () => {
            expect(intern.getEmail()).toBe("jrcharney@fakeuniversity.edu");
        });
    });
    describe("getRole", () => {
        it("should return the employee role.", () => {
            expect(intern.getRole()).toBe("Intern");
        });
    });
    describe("getSchool",() => {
        it("should return the intern school.", () => {
            expect(intern.getSchool()).toBe("Fake University");
        });
    });
    describe("getJSON", () => {
        it("should return the employee id, name, email, role, and school as an object", () => {
            // Note: We need to use toStrictEqual to compare objects. toBe won't do it.
            expect(intern.getJSON()).toStrictEqual({
                "id"     : 1,
                "name"   : "Jason Charney",
                "email"  : "jrcharney@fakeuniversity.edu",
                "role"   : "Intern",
                "school" : "Fake University"
            });
        });
    });
    /*
    describe("showProfile", () => {
        it("should output nothing for Employee", () => {
            expect(employee.showProfile()).toBe();
        });
    });
    */
});
