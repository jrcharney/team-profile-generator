import * as fs from "fs";

export default class HTMLDoc {
    #filePath;
    #fileName;
    #stylesheet
    #title;
    #content;
    constructor(filePath = "./dest", fileName = "index.html", stylesheet="./assets/style/style.css"){
        this.#filePath = filePath;
        this.#fileName = fileName;
        this.#stylesheet = stylesheet;
    }
    setFilePath(filePath){
        this.#filePath = filePath;
        return this;
    }
    getFilePath(){
        return this.#filePath;
    }
    setFileName(fileName){
        this.#fileName = fileName;
        return this;
    }
    getFileName(){
        return this.#fileName;
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
    setStylesheet(stylesheet){
        this.#stylesheet = stylesheet;
        return this;
    }
    getStylesheet(){
        return this.#stylesheet;
    }
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
        if(!fs.existsSync(this.getFilePath())){
            fs.mkdirSync(this.getFilePath(), {recursive : true});
            // NOTE: If the path wasn't created, then the stylesheet likely doesn't exist.
            // TODO: Create the stylehseet with CSSDoc
        }
        const file = `${this.filePath()}/${this.fileName()}`;
        fs.writeFileSync(file,template, (err) => err ? console.error(`Error creating ${file}:`,err) : console.log(`Success! ${file} created.`));
    };
}