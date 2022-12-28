/**
 * @file CDNScript.js
 * @author Jason Charney (jrcharney@gmail.com)
 * @class CDNScript
 * @extends Script
 * @description A better way to load stylesheets from CDNJS
 */
import { Link } from "./Link.js";

export class CDNLink extends Link {
    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/css/bootstrap.min.css" integrity="sha512-SbiR/eusphKoMVVXysTKG/7VseWii+Y3FdHrt0EpKgpToZeemhqHeZeLWLhJutz/2ut2Vw1uQEj2MbRF+TVBUA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    constructor(href,sri,crossorigin="anonymous",referrerpolicy="no-referrer"){
        super(href)
        super.setSRI(sri);
        super.setCORS(crossorigin);
        super.setReferrerPolicy(referrerpolicy);
    }
}