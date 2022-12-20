import Doc from "./Doc.js";

export default class CSSDoc extends Doc{
    #content;
    constructor(filePath,fileName){
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