/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file CSSDoc.js
 * @class CSSDoc
 * @extends Doc
 * @desc Using the Doc class, CSSDoc creates a CSS file.
 */
import Doc from "./Doc.js";

export default class CSSDoc extends Doc{
    #content;
    constructor(filePath = "./dist/assets/css",fileName="style.css"){
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