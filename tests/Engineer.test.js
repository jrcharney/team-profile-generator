/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file test/Engineer.test.js
 * @desc Unit testing for the Engineer class
 */

import {describe, it, expect} from "@jest/globals";
import Engineer from "../lib/Engineer.js";

describe("Engineer", () => {
    // This object will be used for all the test below.
    const engineer = new Engineer("Jason Charney","jrcharney@fakeemail.com","jrcharney");

    describe("getId", () => {
        it("should return an employee ID of 1.",() => {
            expect(engineer.getId()).toBe(1);
        });
    })
    describe("getName", () => {
        it("should return the employee name.",() => {
            expect(engineer.getName()).toBe("Jason Charney");
        })
    });
    describe("getEmail",() => {
        it("should return the employee email.", () => {
            expect(engineer.getEmail()).toBe("jrcharney@fakeemail.com");
        });
    });
    describe("getRole", () => {
        it("should return the employee role.", () => {
            expect(engineer.getRole()).toBe("Engineer");
        });
    });
    describe("getGithub",() => {
        it("should return the engineer github.", () => {
            expect(engineer.getGithub()).toBe("jrcharney");
        });
    });
    describe("getJSON", () => {
        it("should return the employee id, name, email, role, and github as an object", () => {
            // Note: We need to use toStrictEqual to compare objects. toBe won't do it.
            expect(engineer.getJSON()).toStrictEqual({
                "id"     : 1,
                "name"   : "Jason Charney",
                "email"  : "jrcharney@fakeemail.com",
                "role"   : "Engineer",
                "github" : "jrcharney"
            });
        });
    });
    describe("showProfile", () => {
        it("should return an Engineer profile", () => {
            const actual = `<section id="${engineer.getId()}" class="card"><div class="card-header ${engineer.getRole().toLowerCase()}">
            <h3>${engineer.getName()}</h3>
            <h4>${engineer.getRole()}</h4>
        </div><div class="card-body"><ul>
            <li><strong>ID:</strong> ${engineer.getId()}</li>
            <li><strong>Email:</strong> <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
            <li><strong>Github:</strong> <a href="https://github.com/${engineer.getGithub()}">@${engineer.getGithub()}</a></li>
        </ul></div></section>`;
            expect(engineer.showProfile()).toBe(actual);
        });
    });
});