/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file JSONDoc.js
 * @class JSONDoc
 * @extends Doc
 * @desc Using the Doc class, JSONDoc creates a JSON file.
 * @note this file was created because I didn't want to keep entering in the same example data.
 */
import Doc from "./Doc.js";

export default class JSONDoc extends Doc{
    #content;
    constructor(filePath = "./dist/assets/js",fileName="data.json"){
        super(filePath,fileName);
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
    getLink(){
        return `${this.getFilePath()}/${this.getFileName()}`;
    };
    readPage(){
        this.#content = JSON.parse(super.readPage());
        return this;
    }
    writePage(){
        const data = JSON.stringify(this.#content,null,"\t");
        super.setFileContent(data);
        super.writePage();
        return this;
    }
}