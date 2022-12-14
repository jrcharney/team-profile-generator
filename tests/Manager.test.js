/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file test/Manager.test.js
 * @desc Unit testing for the Manager class
 */
import {describe, it, expect} from "@jest/globals";
import Manager from "../lib/Manager.js";

describe("Manager", () => {
    // This object will be used for all the test below.
    const manager = new Manager("Jason Charney","jrcharney@fakeemail.com",1);

    describe("getId", () => {
        it("should return an employee ID of 1.",() => {
            expect(manager.getId()).toBe(1);
        });
    })
    describe("getName", () => {
        it("should return the employee name.",() => {
            expect(manager.getName()).toBe("Jason Charney");
        })
    });
    describe("getEmail",() => {
        it("should return the employee email.", () => {
            expect(manager.getEmail()).toBe("jrcharney@fakeemail.com");
        });
    });
    describe("getRole", () => {
        it("should return the employee role.", () => {
            expect(manager.getRole()).toBe("Manager");
        });
    });
    describe("getOfficeNumber",() => {
        it("should return the manager office number.", () => {
            expect(manager.getOfficeNumber()).toBe(1);
        });
    });
    describe("getJSON", () => {
        it("should return the employee id, name, email, role, and office number as an object", () => {
            // Note: We need to use toStrictEqual to compare objects. toBe won't do it.
            expect(manager.getJSON()).toStrictEqual({
                "id"           : 1,
                "name"         : "Jason Charney",
                "email"        : "jrcharney@fakeemail.com",
                "role"         : "Manager",
                "office_number" : 1
            });
        });
    });
    describe("showProfile", () => {
        it("should return an Engineer profile", () => {
            const actual = `<section id="${manager.getId()}" class="card"><div class="card-header ${manager.getRole().toLowerCase()}">
            <h3>${manager.getName()}</h3>
            <h4>${manager.getRole()}</h4>
        </div><div class="card-body"><ul>
            <li><strong>ID:</strong> ${manager.getId()}</li>
            <li><strong>Email:</strong> <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
            <li><strong>Office Number:</strong> ${manager.getOfficeNumber()}</li>
        </ul></div></section>`;
            expect(manager.showProfile()).toBe(actual);
        });
    });
});