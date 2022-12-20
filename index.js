import inquirer from "inquirer";
import HTMLDoc from "./lib/HTMLDoc.js";
import CSSDoc from "./lib/CSSDoc.js";
import Team from "./lib/Team.js";

inquirer.prompt([
    // TODO: Questions!
]).then((answers) => {
    const cssDoc  = new CSSDoc(`${answers.filePath}/assets/css`,"styles.css");
    const htmlDoc = new HTMLDoc(answers.filePath,answers.fileName);
    const team    = new Team(answers.teamName,...answers.employees);
    htmlDoc.setStylesheet(`${cssDoc.getLink()}`);
    htmlDoc.setContent(team.showTeamProfile());
    cssDoc.writePage();     // In case we didn't do this.
    htmlDoc.writePage();
}).catch((error) => {
    console.error("Error: ", error);
});
