/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file JSDoc.js
 * @class JSDoc
 * @extends Doc
 * @desc Using the Doc class, JSDoc creates a JS file.
 * @note This file is not related to the JSDoc project. I just wanted to write this file before I finished writing.
 */
import Doc from "./Doc.js";

export default class JSDoc extends Doc{
    #content;
    constructor(filePath = "./dist/assets/js",fileName="script.js"){
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
    writePage(){
        super.setFileContent(this.getContent());
        super.writePage();
    }
}