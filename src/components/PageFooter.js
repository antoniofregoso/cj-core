import { AppElement } from "./AppElement";

/**
 * Funnel Page Footer
 */
export class PageFooter extends AppElement {

    #default = {
        brand:{
            name:"CustumerJourney.js",
            url:"https://customerjourney.ninja/"
        }
    }

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);   
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);   
    } 

    render(){
        this.innerHTML =  /* html */`
        <footer ${this.getClasses(["footer"], this.state.classList)} >
            <div class="content has-text-centered">
                    <img  src="${this.state.context?.theme==='light'?this.state.brand?.src:this.state.brand?.srcDark===undefined?this.state.brand?.src:this.state.brand?.srcDark}" style="max-width:200px">
                <p>${ this.state.content?.text[this.state.context.lang] }</p>
                <p><a href="${ this.state.privacyPolicy?.url }">${ this.state.privacyPolicy?.text===undefined?'':this.state.privacyPolicy?.text[this.state.context.lang] }</a></p>
            </div>
            <div class="has-text-left" >
                <h4>Powered by <a href="${this.state.brand?.url}">${this.state.brand.name}</a></h4>
            </div>
        </footer>
        `;
    }
}


customElements.define("page-footer", PageFooter)
