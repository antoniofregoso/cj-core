import { FunnelElement } from "./FunnelElement";

/**
 * Funnel Page Footer
 */
export class FunnelHeader extends FunnelElement {

    #default = {brandSrc:"https://bulma.io/images/bulma-logo.png"};

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`header-${Math.floor(Math.random() * 100)}`);
        this.setAttribute("i18n", this.state.context?.lang||'en');  
        
    } 

    handleEvent(event) {
        if (event.type === "click") {
            const selectLang = new CustomEvent("user:select-lang",{
            detail:{lang:event.target.id.slice(4)},
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(selectLang);
        }
    }

    static get observedAttributes() {
        return ["i18n"];
      }

      attributeChangedCallback(name, old, now) {
        if (now==='i18n'){
            this.state.context.lang = now

        }}

    #buttonLang(button){
        return button===this.getAttribute("i18n")?`button is-focused${this.state.selectedClass===undefined?``:` ${this.state.selectedClass}`}"`:'button'
    }
    

    #getButtons(){
        let lngButtons = ``;
        Object.entries(this.state.i18n).forEach(([key, value])=>{
            lngButtons += `<button id="btn-${key}" class="${this.#buttonLang(key)}">${value}</button>`
        
        });
        return lngButtons        
    }

    addEvents(){
        if (this.state.i18n!=undefined){
            Object.entries(this.state.i18n).forEach(([key, value])=>{  
                this.querySelector(`#btn-${key}`).addEventListener("click",this)
            });
        }
    }

    render(){
        this.innerHTML =  /* html */`
            <header>
            <nav ${this.getClasses(["navbar"], this.state.classList)} role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                <img class="navbar-item"  src="${this.state.brand?.src}" width="180" height="28">
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
                </div>
                <div class="navbar-menu">
                ${this.state.i18n===undefined?'':`
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons are-small">
                            ${this.#getButtons()}
                        </div>
                    </div>
                </div>
                `}
                </div>
            </nav>
        </header>
        `
        this.addEvents();
    }



}

customElements.define("funnel-header", FunnelHeader)