import { AppElement } from "./AppElement";

/**
 * Funnel Page Footer
 */
export class PageHeader extends AppElement {

    #default = {brandSrc:"https://bulma.io/images/bulma-logo.png"};

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`header-${Math.floor(Math.random() * 100)}`);
        this.setAttribute("i18n", this.state.context?.lang);
        this.setAttribute("theme", this.state.context?.theme)
        
    } 

    handleEvent(event) {
        if (event.type === "click") {
            if (event.target.id==="btn-theme"){ 
                const selectTheme = new CustomEvent("user:select-theme",{
                detail:this.#setTheme(),
                bubbles: true,
                composed: true
                });
                this.dispatchEvent(selectTheme);               

            }else {
                const selectLang = new CustomEvent("user:select-lang",{
                detail:event.target.id.slice(4),
                bubbles: true,
                composed: true
                });
                this.dispatchEvent(selectLang);                
            }
        }
    }

    static get observedAttributes() {
        return ["i18n", "theme"];
      }

      attributeChangedCallback(name, old, now) {
        }
        

    
    #getButtons(){
        let lngButtons = ``;
        Object.entries(this.state.i18n.lang).forEach(([key, value])=>{
            let focus = ['button'];
            if (key === this.state.context.lang ){focus.push('is-focused')}
            lngButtons += `<button id="btn-${key}" ${this.getClasses(focus, this.state.i18n?.classList)}">${value}</button>`
        });
        return lngButtons        
    }

    addEvents(){
    	this.querySelector("#btn-theme").addEventListener("click",this)
        if (this.state.i18n?.lang!=undefined){
            Object.entries(this.state.i18n.lang).forEach(([key, value])=>{  
                this.querySelector(`#btn-${key}`).addEventListener("click",this)
            });            
        }
    }


    #setTheme(){
        if (this.state.context.theme=="dark"){
            return 'light'
        }else{
            return 'dark'
        }
    }

    #getThemeIcon(){
       if (this.state.context?.theme==='dark'){
            return '🔅'
        }else{
            return '🌙'
        }
    }

    render(){
        this.innerHTML =  /* html */`
            <header>
            <nav ${this.getClasses(["navbar"], this.state.classList)} role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                <img class="navbar-item"  src="${this.state.context?.theme==='light'?this.state.brand?.src:this.state.brand?.srcDark===undefined?this.state.brand?.src:this.state.brand?.srcDark}" width="180" height="28">
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
                </div>
                <div class="navbar-menu">
                <div class="navbar-start">
                <div class="navbar-item">
                	<div class="buttons are-small">
                	<button id="btn-theme" ${this.getClasses(["button"], this.state.i18n?.classList)}>
                	${this.#getThemeIcon()}
                	</button>
                	</div>
                </div>		
                </div>
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
        let burger = this.querySelector('.navbar-burger');
        let menu = this.querySelector('.navbar-menu');
        burger.addEventListener('click',()=>{
            burger.classList.toggle("is-active")
            menu.classList.toggle("is-active")
        }) 
    }



}

customElements.define("page-header", PageHeader)
