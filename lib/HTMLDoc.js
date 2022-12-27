/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file HTMLDoc.js
 * @class HTMLDoc
 * @desc HTML file creation class using the Doc class.
 * @note There are a lot of notes in this file. They exist for a reason.
 */
import Doc from "./Doc.js";

export default class HTMLDoc extends Doc {
    #stylesheet;    // TODO: Make this an array
    // TODO: Add an array variable to accept JavaScript files
    #title;
    #content;
    constructor(filePath = "./dest", fileName = "index.html"){
        //stylesheet="./assets/style/style.css"
        super(filePath,fileName);     
        //this.#stylesheet = stylesheet;
    }
    setPageTitle(title){
        this.#title = title;
        return this;
    }
    getPageTitle(){
        return this.#title;
    }
    setContent(content){
        this.#content = content;
        return this;
    }
    addContent(content){
        this.#content += content;
        return this;
    }
    getContent(){
        return this.#content;
    }
    // TODO: CSSDoc for stylesheet info including filePath and fileName
    // TODO: Have this read an array
    setStylesheet(stylesheet){
        this.#stylesheet = stylesheet;
        return this;
    }
    // TODO: addStylesheet
    // TODO: Change this to return an array
    getStylesheet(){
        return this.#stylesheet;
    }
    // TODO: writeStylesheet
    // TODO: setJavaScript
    // TODO: getJavaScript
    // TODO: addJavaScript
    // TODO: writeJavaScript
    writePage(){
        const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="${this.getStylesheet()}">
    <title>${this.getPageTitle()}</title>
</head>
<body>
    ${this.getContent()}
</body>
</html>`;
        super.setFileContent(template);
        super.writePage();
        /*
        if(!fs.existsSync(this.getFilePath())){
            fs.mkdirSync(this.getFilePath(), {recursive : true});
            // NOTE: If the path wasn't created, then the stylesheet likely doesn't exist.
            // TODO: Create the stylehseet with CSSDoc
        }
        const file = `${this.filePath()}/${this.fileName()}`;
        fs.writeFileSync(file,template, (err) => err ? console.error(`Error creating ${file}:`,err) : console.log(`Success! ${file} created.`));
        */
    }
};
