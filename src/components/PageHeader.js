import { AppElement } from "./AppElement";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon, faDesktop } from '@fortawesome/free-solid-svg-icons';
/**
 * Funnel Page Footer
 */
export class PageHeader extends AppElement {

    #default = {
        brand: {
            src: "https://customerjourney.ninja/assets/images/cj-js.png"
        },
        theme: {
            text:{
                es:"Tema",
                en:"Theme",
                fr:"Thème"
            }
        },
        themeValues:{
            light:{
                text:{
                    es:"Claro",
                    en:"Light",
                    fr:"Clair"
                },
            },
            dark:{
                text:{
                    es:"Oscuro",
                    en:"Dark",
                    fr:"Sombre"
                },
            },
            system:{
                text:{
                    es:"Sistema",
                    en:"System",
                    fr:"Système"
                },
            }
        }

    }

    #sunIcon = icon(faSun, {classes: ['fa-1x', 'has-text-warning']}).html[0];
    #moonIcon = icon(faMoon, {classes: ['fa-1x', 'has-text-grey-light']}).html[0];
    #desktopIcon = icon(faDesktop, {classes: ['fa-1x', 'has-text-info']}).html[0];

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`header-${Math.floor(Math.random() * 100)}`);
        this.setAttribute("i18n", this.state.context?.lang);
        this.setAttribute("theme", this.state.context?.theme)
        
    } 

    handleEvent(event) {
        if (event.type === "click") {
            let theme = '';
            switch(event.currentTarget.id){
                case "themes":                    
                    let themes = document.getElementById(event.currentTarget.id);
                    themes.parentNode.classList.toggle('is-active');
                    break;                
                case 'light-theme':
                    document.getElementById('themes').parentNode.classList.toggle('is-active');
                    theme = 'light';
                    break;
                case 'dark-theme':
                    document.getElementById('themes').parentNode.classList.toggle('is-active');
                    document.documentElement.classList.add('cc--darkmode');
                    theme = 'dark';
                    break;
                case 'system-theme':
                    document.getElementById('themes').parentNode.classList.toggle('is-active');
                    theme = 'system';
                    break;
                default:
                    const selectLang = new CustomEvent("user:select-lang",{
                    detail:event.target.id.slice(4),
                    bubbles: true,
                    composed: true
                    });
                    this.dispatchEvent(selectLang);
                    break;
            }
            if (theme !== '') {
                const selectTheme = new CustomEvent("user:select-theme",{
                    detail: theme,
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(selectTheme);
            }
        }
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
        let themes = document.querySelector('#themes');
        themes.addEventListener('click', this)
        let lightTheme = document.querySelector('#light-theme');
        lightTheme.addEventListener('click', this)
        let darkTheme = document.querySelector('#dark-theme');
        darkTheme.addEventListener('click', this)
        let systemTheme = document.querySelector('#system-theme');
        systemTheme.addEventListener('click', this)
        if (this.state.i18n?.lang!=undefined){
            Object.entries(this.state.i18n.lang).forEach(([key, value])=>{  
                this.querySelector(`#btn-${key}`).addEventListener("click",this)
            });            
        }
    }


    #setTheme(){
        switch(this.state.context?.theme){
            case "light":
                document.documentElement.setAttribute('data-theme', 'light');
                return this.#sunIcon;
                break;
            case "dark":
                document.documentElement.setAttribute('data-theme', 'dark');
                return this.#moonIcon;
                break;  
            default:
                document.documentElement.removeAttribute('data-theme');
                return this.#desktopIcon;
                break;
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
                <div class="navbar-item has-dropdown">
                    <a id="themes" class="navbar-link is-arrowless">
                        ${ this.state.theme?.text[this.state.context?.lang]} ${ this.#setTheme() }
                    </a>
                    <div class="navbar-dropdown">                   
                        <a id="light-theme" class="navbar-item">
                            ${ this.#sunIcon } ${ this.state.themeValues.light.text[this.state.context?.lang] }
                        </a>
                        <a id="dark-theme" class="navbar-item">
                            ${ this.#moonIcon } ${ this.state.themeValues.dark.text[this.state.context?.lang] }
                        </a>
                        <a id="system-theme" class="navbar-item">
                            ${ this.#desktopIcon } ${ this.state.themeValues.system.text[this.state.context?.lang] }
                        </a>
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
