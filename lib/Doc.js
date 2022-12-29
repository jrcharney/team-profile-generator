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
    #file_path;
    #file_name;
    #file_content;
    // TODO: Rewrite the first two arguments combined (wish list)
    constructor(file_path,file_name,file_content = ""){
        this.#file_path    = file_path;
        this.#file_name    = file_name;
        this.#file_content = file_content;
    }
    // TODO: setFile (wish list)
    // TODO: getFile (wish list)
    // TODO: setFileExtension (wish list) (might be important if multiple dots)
    // TODO: getFileExtension (wish list) (TODO: What if there are multple dots?) (Something to think about in the next project)
    /**
     * @method setFilePath
     * @desc Set the file path
     * @param {string} file_path 
     * @returns 
     */
    setFilePath(file_path){
        this.#file_path = file_path;
        return this;
    }
    /**
     * @method getFilePath
     * @desc Get the file path
     * @returns {string}
     */
    getFilePath(){
        return this.#file_path;
    }
    /**
     * @method setFileName
     * @desc set the file name, this should exclude the path.
     * @param {string} file_name 
     * @returns 
     * TODO: What if it includes part of a file name? (wish list item for future Jason to worry about)
     */
    setFileName(file_name){
        this.#file_name = file_name;
        return this;
    }
    /**
     * @method getFileName
     * @desc get the file name, this should exclude the path and include the file extension
     * @returns {string}
     */
    getFileName(){
        return this.#file_name;
    }
    /**
     * @method setFileContent
     * @desc set the file contents
     * @param {string} file_content 
     * @returns 
     */
    setFileContent(file_content){
        this.#file_content = file_content;
        return this;
    }
    /**
     * @method addFileContent
     * @desc Append more content to the file content.
     * @param {string} fileContent 
     * @returns 
     * TODO: What is the max limit of characters a string variable can hold in JavaScript?
     */
    addFileContent(file_content){
        this.#file_content += file_content;
        return this;
    }
    /**
     * @method getFileContent
     * @desc get the file content. Might be big!
     * @returns {string}
     */
    getFileContent(){
        return this.#file_content;
    }
    // TODO: findFileContent (wish list)
    // TODO: findAllFileContent (wish list)
    // TODO: replaceFileContent (wish list)
    // TODO: replaceAllFileContent (wish list)
    // TODO: deleteFileContent (wish list, dangerous!)
    
    /**
     * @method readPage
     * @desc read data from a file and store it in this.#file_content
     */
    readPage(){
        const file = `${this.#file_path}/${this.#file_name}`;
        if(!fs.existsSync(file)){
            console.log(`Sorry, "${file}" does not exist.`);
            return this.#file_content;
        }
        this.#file_content = fs.readFileSync(file, {"encoding": "utf-8"});
        return this.#file_content;
    }

    /**
     * @method writePage
     * @desc write the data from this.#file_content to a file
     */
    writePage(){
        if(!fs.existsSync(this.#file_path)){
            fs.mkdirSync(this.#file_path, {recursive : true});
        }
        // TODO: If file exists, should we ask if we want to overwrite it?
        const file = `${this.#file_path}/${this.#file_name}`;
        const data = this.#file_content;
        fs.writeFileSync(file,data);     // , (err) => err ? console.error(`Error creating ${file}:`,err) : console.info(`Success! ${file} created.`));
        return this;
    }
}