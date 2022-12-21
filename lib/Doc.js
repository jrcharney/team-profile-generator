/**
 * @file Doc.js
 * @class Doc
 */
import * as fs from "fs";

export default class Doc {
    #filePath;
    #fileName;
    #fileContent;
    constructor(filePath,fileName,fileContent = ""){
        this.#filePath    = filePath;
        this.#fileName    = fileName;
        this.#fileContent = fileContent;
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
    setFileContent(fileContent){
        this.#fileContent = fileContent;
        return this;
    }
    addFileContent(fileContent){
        this.#fileContent = fileContent;
        return this;
    }
    getFileContent(){
        return this.#fileContent;
    }
    writePage(){
        if(!fs.existsSync(this.getFilePath())){
            fs.mkdirSync(this.getFilePath(), {recursive : true});
        }
        // TODO: If file exists, should we ask if we want to overwrite it?
        const file = `${this.filePath()}/${this.fileName()}`;
        fs.writeFile(file,this.getFileContent(), (err) => err ? console.error(`Error creating ${file}:`,err) : console.info(`Success! ${file} created.`));
    }
}