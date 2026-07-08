import { h } from "preact";

/**
 * Core element for creating funnel components
 */
export class AppElement extends HTMLElement {
    #default = {};
    #cleanupCallbacks = new Set();
    /**
     * 
     * @param {Object} props Attributes necessary to render the HTML element
     */
    constructor(props={}){
        super()
        this.state = this.initState(props);  

    }

    /**
     * Applies default values to props that are not defined in the component state
     * @param {Object} defValues Default values
     * @param {Object} props Values to be applied in the rendering
     * @returns {Object} - Default attributes combined with shipped attributes
     */
    initState(defValues, props){
        if (props!=undefined){
            let state = Object.assign({}, defValues, props);
            if (defValues!=undefined){
                if (Object.keys(defValues).lenght!=0){
                    Object.keys(defValues).forEach(prop=>{  
                        if (props[prop]!=undefined){
                            if (typeof props[prop] === 'string' ||  Array.isArray(props[prop])){
                                state[prop] = props[prop];
                            }else{
                                state[prop] = Object.assign({}, defValues[prop], props[prop]);
                            }
                            
                        }  
                    })
                }
            }
            return state;
        }else {
            return defValues;
        }
    }

    /**
     * convierte el nombre de un atributo a camel case
     * @param {String} attribute 
     * @returns {String}
     */
    attribute2CamelCase(attribute) {
        const pattern = new RegExp(("-" + "([a-z])"), "g");
        return attribute.replace(pattern, (match, capture) => capture.toUpperCase());
    }
    
    /**
     * Remove capitalization of an attribute name
     * @param {String} camelCase 
     * @returns  {String}
     */  
    camelCase2attribute(camelCase) {
        return camelCase.replace(new RegExp('-([a-z])', 'g'), (m, c) => c.toUpperCase());
    }

    /**
     * Initializes the component state and renders it.
     * @param {Object} props Attributes and properties to render the component
     */
    setState(props){
        this.state =this.initState(this.#default,props);
        this.render();
    }

    /**
     * Update state and render the component
     * 
     * @param {Object} props Attributes and properties to update the component
     */
    updateState(props){
        this.state = this.initState(this.state, props)
        this.render();
    }

    /**
     * Generate data attributes to generate component animations
     * 
     * @param {Object} props Attributes to define animation
     *  @param {string} props.animation Animation name
     *  @param {string} props.delay 2s, 3s, 4s or 5s
     *  @param {string} props.speed slower, slow, fast or faster. Default 1s
     *  @param {string} props.repeat 1, 2, 3, infinite. Default 0
     * @returns Animation data- params
     */
    setAnimation(props){
        if (props===undefined||props===null){
            return '';
        }else{
            let animation = ` data-animation=${props.effect}`
            props.delay!=undefined?animation+= ` data-delay=${props.delay}`:false;
            props.speed!=undefined?animation+=` data-speed=${props.speed}`:false;
            props.repeat!=undefined?animation+=` data-repeat=${props.repeat}`:false;
            return animation
        } 
        
    }

    /**
     * Same as setAnimation but returns a plain object of data- attributes
     * to spread onto a JSX element instead of a literal HTML string
     *
     * @param {Object} props Attributes to define animation
     * @returns {Object}
     */
    getAnimationProps(props){
        if (props===undefined||props===null){
            return {};
        }
        let attrs = { 'data-animation': props.effect };
        if (props.delay!=undefined) attrs['data-delay'] = props.delay;
        if (props.speed!=undefined) attrs['data-speed'] = props.speed;
        if (props.repeat!=undefined) attrs['data-repeat'] = props.repeat;
        return attrs;
    }

    /**
     *
     */
    cleanValue(prop){
        return prop!=undefined?prop:'';
    }

    /**
     * 
     */
    updateClassList(){
        if (this.state.classList){
            this.classList.add(...this.state.classList)
        }
    }

    /**
     * Add the additional classes sent to the component props
     * 
     * @param {string} defaultClass 
     * @param {string} optionalClasses 
     */
    getClasses(defaultClass=[], optionalClasses){
        let resultClasses = [];
        if (optionalClasses===undefined){
            resultClasses = defaultClass
        }else{
            resultClasses = [...defaultClass, ...optionalClasses]
        }
        let classes = '';
        if (resultClasses.length>0){
            classes = `class="${resultClasses.toString().replaceAll(",", " ")}"`;
        }
        return classes;
    }
    
    /**
     * Add the additional classes sent to the component props, as a plain
     * space separated string suitable for JSX's `class` attribute
     *
     * @param {string} defaultClass
     * @param {string} optionalClasses
     * @returns {string|undefined}
     */
    getClassNames(defaultClass=[], optionalClasses){
        let resultClasses = optionalClasses===undefined?defaultClass:[...defaultClass, ...optionalClasses];
        return resultClasses.length>0?resultClasses.join(" "):undefined;
    }

    /**
     *
     * @returns {string} The styles needed to add the background image
     */
    getBackground(){
        let style = '';
        if (this.state.backgroundImage?.url!=undefined) {
            style = `background-image: url('${this.state.backgroundImage.url}'); background-repeat: no-repeat; background-position: center; background-size: cover;`;
            if (this.state.backgroundImage?.fixed){
                style = `${style} background-attachment: fixed;`
            }
            if (this.state.backgroundImage?.filter){
                style = `${style} filter: ${this.state.backgroundImage?.filter};`
            }
        }else {
            style = '';
        }
        
        return ` style="${style}"`;
    }

    /**
     * Same as getBackground but returns the bare CSS text (no `style="..."`
     * wrapper) suitable for JSX's `style` attribute
     *
     * @returns {string|undefined}
     */
    getBackgroundStyle(){
        let style = '';
        if (this.state.backgroundImage?.url!=undefined) {
            style = `background-image: url('${this.state.backgroundImage.url}'); background-repeat: no-repeat; background-position: center; background-size: cover;`;
            if (this.state.backgroundImage?.fixed){
                style = `${style} background-attachment: fixed;`
            }
            if (this.state.backgroundImage?.filter){
                style = `${style} filter: ${this.state.backgroundImage?.filter};`
            }
        }
        return style || undefined;
    }

    /**
   * Generate caption, title and subtitle of the component
   */
    getTitles(){
        let titles = '';
        if(this.state!=undefined){
            titles = /* HTML */`
            <div class="content">    
                ${this.state.caption?.text[this.state.context.lang]!=undefined?`
                <h2 ${this.getClasses(["subtitle"], this.state.caption?.classList)}  ${this.setAnimation(this.state.caption?.animation)}>${this.state.caption.text[this.state.context.lang]}</h2>`:''}          
                ${this.state.title?.text[this.state.context.lang]!=undefined?`
                <h1 ${this.getClasses([], this.state.title?.classList)}  ${this.setAnimation(this.state.title?.animation)}>${this.state.title.text[this.state.context.lang]}</h1>`:``}
                ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`
                <h2 ${this.getClasses([], this.state.subtitle?.classList)}  ${this.setAnimation(this.state.subtitle?.animation)}>${this.state.subtitle.text[this.state.context.lang]}</h2>`:``}
            </div>`
        }
        return titles;
    }

    /**
     * Same as getTitles but returns a Preact vnode tree instead of an HTML
     * string, for use directly inside a component's JSX render()
     */
    getTitlesJSX(){
        if (this.state===undefined) return null;
        const lang = this.state.context.lang;
        return h('div', { class: 'content' }, [
            this.state.caption?.text[lang]!=undefined ? h('h2', { class: this.getClassNames(["subtitle"], this.state.caption?.classList), ...this.getAnimationProps(this.state.caption?.animation) }, this.state.caption.text[lang]) : null,
            this.state.title?.text[lang]!=undefined ? h('h1', { class: this.getClassNames([], this.state.title?.classList), ...this.getAnimationProps(this.state.title?.animation) }, this.state.title.text[lang]) : null,
            this.state.subtitle?.text[lang]!=undefined ? h('h2', { class: this.getClassNames([], this.state.subtitle?.classList), ...this.getAnimationProps(this.state.subtitle?.animation) }, this.state.subtitle.text[lang]) : null,
        ]);
    }

    handleEvent(event){
        if (event.type === "click") {
            this.eventName = this.state.buttons?.eventName ?? this.state.eventName ?? this.eventName; 
            const clickFunnel = new CustomEvent(this.eventName,{
            detail:{source:event.target.id},
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(clickFunnel);
        }
    }

	registerExtraEvents() {}
    /**
     * Generate click events on the component's CTA buttons
     */
    addEvents(){
        let buttons = this.querySelectorAll("button");
        if (buttons.length>0){
            buttons.forEach((item)=>{
            item.addEventListener("click",this)
            });    
        }  
    }
    
    /**
     * Create the CTA buttons of the component from the props sent
     * @param {Object} props 
     */
    #getButtons(props){
        if(props!=undefined){
            let buttons = '';
            props.forEach(el=>{
                buttons += `<${el.href!=undefined?'a':'button'} id="${el.id}" ${this.getClasses(['button'], el.classList)} ${el.href!=undefined?`href="${el.href}"`:''}>${el?.text[this.state.context.lang]}</${el.href!=undefined?'a':'button'}>`;
            })
            return buttons;
        }else return ''
    }
   
    /**
     * Generate the CTA button container and insert the buttons described in the props
     * @param {Object} props 
     */
    buttonsRender(props){
        if(props!=undefined){
            let buttons = /* html */`
                <p ${this.getClasses(['buttons','mt-4'], props.classList)}>
                    ${this.#getButtons(props.buttons)}
                </p>
            `
           return buttons;
        }else return '';
    }

    /**
     * Same as #getButtons but returns an array of Preact vnodes
     * @param {Object} props
     */
    #getButtonsJSX(props){
        if (props===undefined) return [];
        return props.map(el => h(
            el.href!=undefined ? 'a' : 'button',
            { key: el.id, id: el.id, class: this.getClassNames(['button'], el.classList), href: el.href },
            el?.text[this.state.context.lang]
        ));
    }

    /**
     * Same as buttonsRender but returns a Preact vnode tree instead of an
     * HTML string, for use directly inside a component's JSX render()
     * @param {Object} props
     */
    buttonsRenderJSX(props){
        if (props===undefined) return null;
        return h('p', { class: this.getClassNames(['buttons', 'mt-4'], props.classList) }, this.#getButtonsJSX(props.buttons));
    }

    addCleanup(callback){
        if (typeof callback !== "function") return () => {};

        this.#cleanupCallbacks.add(callback);

        return () => {
            this.#cleanupCallbacks.delete(callback);
        };
    }

    runCleanups(){
        this.#cleanupCallbacks.forEach((callback) => {
            try {
                callback();
            } catch (error) {
                console.error("Error during component cleanup", error);
            }
        });

        this.#cleanupCallbacks.clear();
    }



    /**
     * Render the component
     */
    render(){
        console.error('Nothing to render');
    }

    /**
     * Renders the component when inserted into the DOM
     */
    connectedCallback(){
        this.render();
    }  

    disconnectedCallback(){
        let buttons = this.querySelectorAll("button");
        if (buttons.length>0){
          buttons.forEach((item)=>{
            item.removeEventListener("click",this)
          });    
        }  

        this.runCleanups();
    }

}

customElements.define("app-element", AppElement)
