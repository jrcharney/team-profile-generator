/**
 * @file CDNScript.js
 * @author Jason Charney (jrcharney@gmail.com)
 * @class CDNScript
 * @extends Script
 * @description A better way to load scripts from CDNJS
 */
import { Script } from "./Script.js";

export class CDNScript extends Script {
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.min.js" integrity="sha512-eHx4nbBTkIr2i0m9SANm/cczPESd0DUEcfl84JpIuutE6oDxPhXvskMR08Wmvmfx5wUpVjlWdi82G5YLvqqJdA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    constructor(src,sri,crossorigin="anonymous",referrerpolicy="no-referrer"){
        super(src);
        super.setSRI(sri);
        super.setCORS(crossorigin);
        super.setReferrerPolicy(referrerpolicy);
    }
}