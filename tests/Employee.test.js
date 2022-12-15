import {describe, it, expect} from "@jest/globals";
import Employee from "../lib/Employee.js";

describe("Employee",() => {
    // This object will be used for all the test below.
    const employee = new Employee("Jason Charney","jrcharney@fakeemail.com");

    describe("getId", () => {
        it("should return an employee ID of 1.",() => {
            expect(employee.getId()).toBe(1);
        });
    })
    describe("getName", () => {
        it("should return the employee name.",() => {
            expect(employee.getName()).toBe("Jason Charney");
        })
    });
    describe("getEmail",() => {
        it("should return the employee email.", () => {
            expect(employee.getEmail()).toBe("jrcharney@fakeemail.com");
        });
    });
    describe("getRole", () => {
        it("should return the employee role.", () => {
            expect(employee.getRole()).toBe("Employee")
        });
    });
    describe("getJSON", () => {
        it("should return the employee id, name, email, and role as an object", () => {
            // Note: We need to use toStrictEqual to compare objects. toBe won't do it.
            expect(employee.getJSON()).toStrictEqual({
                "id"    : 1,
                "name"  : "Jason Charney",
                "email" : "jrcharney@fakeemail.com",
                "role"  : "Employee"
            });
        })
    });
    /*
    describe("showProfile", () => {
        it("should output nothing for Employee", () => {
            expect(employee.showProfile()).toBe();
        });
    });
    */
})