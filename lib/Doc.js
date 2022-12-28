/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file Doc.js
 * @class Doc
 * @desc Base document creation class. All classes that create documents will use this class.
 * @note There's a bunch of notes I added here. Don't assume I plan on doing them.
 *       Also, don't assume that they will consume most of my time.
 */
import * as fs from "fs";

export default class Doc {
    #filePath;
    #fileName;
    #fileContent;
    // TODO: Rewrite the first two arguments combined (wish list)
    constructor(filePath,fileName,fileContent = ""){
        this.#filePath    = filePath;
        this.#fileName    = fileName;
        this.#fileContent = fileContent;
    }
    // TODO: setFile (wish list)
    // TODO: getFile (wish list)
    // TODO: setFileExtension (wish list) (might be important if multiple dots)
    // TODO: getFileExtension (wish list) (TODO: What if there are multple dots?) (Something to think about in the next project)
    /**
     * @method setFilePath
     * @desc Set the file path
     * @param {string} filePath 
     * @returns 
     */
    setFilePath(filePath){
        this.#filePath = filePath;
        return this;
    }
    /**
     * @method getFilePath
     * @desc Get the file path
     * @returns {string}
     */
    getFilePath(){
        return this.#filePath;
    }
    /**
     * @method setFileName
     * @desc set the file name, this should exclude the path.
     * @param {string} fileName 
     * @returns 
     * TODO: What if it includes part of a file name? (wish list item for future Jason to worry about)
     */
    setFileName(fileName){
        this.#fileName = fileName;
        return this;
    }
    /**
     * @method getFileName
     * @desc get the file name, this should exclude the path and include the file extension
     * @returns {string}
     */
    getFileName(){
        return this.#fileName;
    }
    /**
     * @method setFileContent
     * @desc set the file contents
     * @param {string} fileContent 
     * @returns 
     */
    setFileContent(fileContent){
        this.#fileContent = fileContent;
        return this;
    }
    /**
     * @method addFileContent
     * @desc Append more content to the file content.
     * @param {string} fileContent 
     * @returns 
     * TODO: What is the max limit of characters a string variable can hold in JavaScript?
     */
    addFileContent(fileContent){
        this.#fileContent += fileContent;
        return this;
    }
    /**
     * @method getFileContent
     * @desc get the file content. Might be big!
     * @returns {string}
     */
    getFileContent(){
        return this.#fileContent;
    }
    // TODO: findFileContent (wish list)
    // TODO: findAllFileContent (wish list)
    // TODO: replaceFileContent (wish list)
    // TODO: replaceAllFileContent (wish list)
    // TODO: deleteFileContent (wish list, dangerous!)
    writePage(){
        if(!fs.existsSync(this.getFilePath())){
            fs.mkdirSync(this.getFilePath(), {recursive : true});
        }
        // TODO: If file exists, should we ask if we want to overwrite it?
        const file = `${this.filePath()}/${this.fileName()}`;
        fs.writeFile(file,this.getFileContent(), (err) => err ? console.error(`Error creating ${file}:`,err) : console.info(`Success! ${file} created.`));
    }
    readPage(){
        const file = `${this.#filePath}/${this.#fileName}`;
        fs.readFile(file,"utf-8",(err,data) => {
            if(err){
                console.error(`ERROR: ${file} does not exist.`);
                console.error(err);
                return;
            }
            this.#fileContent = data;
        });
    }
}