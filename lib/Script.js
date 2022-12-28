/**
 * @file: Script.js
 * @author: Jason Charney (jrcharney@gmail.com)
 * @class Script
 * @desc External JavaScript files have way too main attributes
 * @todo Add JSON stuff later
 * 
 * @desc Designed to work with sites like CDNJS, add another imported JavaScript file
 * @param {string} url The URL of the external script.
 * @param {string} sri Allows the browser to check the integrity of the fetch script
 * @param {string} crossorigin Set the mode of the HTTP CORS Request
 * @param {string} referrerpolicy specifies which referrer information to send when fetching a script. Typically used with crossorigin. 
 * @todo module setting 'type="module"' to declare this script a module. If applied, you can use a ".js" file instead of a ".mjs" file. If you are using this, you don't need to use defer. I highly recommend this, especially if you are working on a Node.js project that uses an HTML front-end.
 * @todo defer setting "defer" to prevent this javascript file from loading until all the HTML loads. I personally recommend it if you aren't using module or async
 * @todo async setting "async" use this to download in paralllel to parsing the page. I recommend not using this unless it is necessary.

 */
export class Script {
    #src;
    #integrity;
    #crossorigin;
    #referrerpolicy;
    #async;
    #defer;
    #module;
    constructor(src){
        this.#src = src;
        this.#integrity = "";
        this.#crossorigin = "";
        this.#referrerpolicy = "";
        this.#async = false;
        this.#defer = false;
        this.#module = false;
    }
    setURL(src){
        this.#src = src;
        return this;
    }
    getURL(){
        return this.#src;
    }
    setSRI(integrity){
        this.#integrity = integrity;
        return this;
    }
    getSRI(){
        return this.#integrity;
    }
    setCORS(crossorigin){
        this.#crossorigin = crossorigin;
    }
    getCORS(){
        return this.#crossorigin;
    }
    setReferrerPolicy(referrerpolicy){
        this.#referrerpolicy = referrerpolicy;
        return this;
    }
    getReferrerPolicy(){
        return this.#referrerpolicy;
    }
    setRP(referrerpolicy){
        this.#referrerpolicy = referrerpolicy;
        return this;
    }
    getRP(){
        return this.#referrerpolicy;
    }
    setAsync(asyncBoolean){
        this.#async = asyncBoolean;
    }
    getAsync(){
        return this.#async;
    }
    setDefer(deferBoolean){
        this.#defer = deferBoolean;
        return this;
    }
    getDefer(){
        return this.#defer;
    }
    setModule(moduleBoolean){
        this.#module = moduleBoolean;
        return this;
    }
    getModule(){
        return this.#module;
    }
    write(){
        let attributes = [];
        attributes.push(`src="${this.#src}"`);
        if(this.#integrity !== ""){
            attributes.push(`integrity="${this.#integrity}"`);
        }
        if(this.#crossorigin !== ""){
            attributes.push(`crossorigin="${this.#crossorigin}"`)
        }
        if(this.#referrerpolicy !== ""){
            attributes.push(`referrerpolicy="${this.#referrerpolicy}"`);
        }
        if(this.#async){
            attributes.push(`async`);
        }
        if(this.#defer){
            attributes.push(`defer`);
        }
        if(this.#module){
            attributes.push(`type="module"`);
        }
        return `<script ${attributes.join(" ")}></script>`;
    }
};
