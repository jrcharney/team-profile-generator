/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file HTMLDoc.js
 * @class HTMLDoc
 * @desc HTML file creation class using the Doc class.
 * @note There are a lot of notes in this file. They exist for a reason.
 */
import Doc from "./Doc.js";
/*
import { Link } from "./Link.js";
import { CDNLink } from "./CDNLink.js";
import { Script } from "./Script.js";
import { CDNScript } from "./CDNScript.js";
*/

export default class HTMLDoc extends Doc {
    //#stylesheet;    // TODO: Make this an array
    // TODO: Add an array variable to accept JavaScript files
    #stylesheets;   // TODO: This will need to be an array of objects if we are importing or adding attributes
    #javascripts;   // TODO: This will need to be an array of objects if we are importing or adding attributes
    #title;
    #content;
    constructor(filePath = "./dist", fileName = "index.html"){
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
    /**
     * @method setStylesheets
     * @param {...Link|CDNLink} stylesheets 
     * @returns 
     */
    setStylesheets(...stylesheets){
        this.#stylesheets = [...stylesheets];
        return this;
    }
    getStylesheets(){
        return this.#stylesheets;
    }
    addStylesheets(...stylesheets){
        for(const stylesheet of stylesheets){
            if(!this.#stylesheets.includes(stylesheet)){
                this.#stylesheets.push(stylesheet);
            }
        }
        return this;
    }
    getCSSLinks(){
        return this.#stylesheets.reduce((list,css) => {
            list.push(css.write());
        },[]).join("\n");
    }
    /**
     * @method setJavaScripts
     * @param  {...Script|CDNScript} javascripts 
     * @returns 
     */
    setJavaScripts(...javascripts){
        this.#javascripts = javascripts;
        return this;
    }
    getJavaScripts(){
        return this.#javascripts;
    }
    addJavaScripts(...javascripts){
        for(const javascript of javascripts){
            if(!this.#javascripts.includes(javascript)){
                this.#javascripts.push(javascript);
            }
        }
        return this;
    }
    getJSScripts(){
        return this.#javascripts.reduce((list,js) => {
            list.push(js.write());
        },[]).join("\n");
    }
    // TODO: writeMetaTags
    getHeader(){
        const head = `<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.getPageTitle()}</title>
    ${this.getCSSLinks()}
    ${this.getJSScripts()}`;
        return head;
    }
    writePage(){
        const template = `<!DOCTYPE html>
<html lang="en">
<head>
    ${this.getHeader()}
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
