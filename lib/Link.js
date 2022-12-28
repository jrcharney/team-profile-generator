/**
 * @file Link.js
 * @class Link
 * @desc This class is for creating the <link/> element needed to import CSS files.
 */
export class Link {
    #rel;
    #href;
    #integrity;
    #crossorigin;
    #referrerpolicy;
    constructor(href){
        this.#rel = "stylesheet";
        this.#href = href;
        this.#integrity = "";
        this.#crossorigin = "";
        this.#referrerpolicy = "";
    }
    setRel(rel){
        this.#rel = rel;
        return this;
    }
    getRel(){
        return this.#rel;
    }
    setURL(href){
        this.#href = href;
        return this;
    }
    getURL(){
        return this.#href;
    }
    setSRI(integrity){
        this.#integrity = integrity;
    }
    getSRI(){
        return this.#integrity;
    }
    setCORS(crossorigin){
        this.#crossorigin = crossorigin;
        return this;
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
    write(){
        let attribute = [];
        attribute.push(`rel="${this.#rel}"`);
        attribute.push(`href="${this.#href}"`);
        if(this.#integrity !== ""){
            attribute.push(`integrity="${this.#integrity}"`)
        }
        if(this.#crossorigin !== ""){
            attribute.push(`crossorigin="${this.#crossorigin}"`);
        }
        if(this.referrerpolicy !== ""){
            attribute.push(`referrerpolicy="${this.#referrerpolicy}"`);
        }
        return `<link ${attribute.join(" ")} />`;
    }
}