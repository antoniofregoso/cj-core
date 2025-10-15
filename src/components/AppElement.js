/**
 * Core element for creating funnel components
 */
export class AppElement extends HTMLElement {
    #default = {};
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
        }else {
            style = '';
        }
        
        return ` style="${style}"`;
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

    }

}

customElements.define("app-element", AppElement)