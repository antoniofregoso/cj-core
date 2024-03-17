/**
 * Core element for creating funnel components
 */
export class FunnelElement extends HTMLElement {
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
     * 
     * @param {Object} defValues Default values
     * @param {Object} props Values to be applied in the rendering
     * @returns 
     */
    initState(defValues, props){
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
    }

    /**
     * 
     * @param {string} attribute 
     * @returns 
     */
    attribute2CamelCase(attribute) {
        const pattern = new RegExp(("-" + "([a-z])"), "g");
        return attribute.replace(pattern, (match, capture) => capture.toUpperCase());
      }
    
    /**
     * 
     * @param {string} camelCase 
     * @returns 
     */  
    camelCase2attribute(camelCase) {
        return camelCase.replace(new RegExp('-([a-z])', 'g'), (m, c) => c.toUpperCase());
      }

    /**
     * 
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
            let animation = ` data-animation=${props.animation}`
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
     * 
     * 
     * @param {string} defaultClass 
     * @param {string} optionalClasses 
     * @returns 
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
     * @param {*} props 
     * @returns 
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
     * 
     * @param {*} props 
     * @returns 
     */
    buttonsRender(props){
        if(props!=undefined){
            let buttons = /* html */`
                <p ${this.getClasses(['buttons'], props.classList)}>
                    ${this.#getButtons(props.buttons)}
                </p>
            `
           return buttons;
        }else return '';
    }



    /**
     * 
     */
    render(){
        console.error('Nothing to render');
    }

    /**
     * 
     */
    connectedCallback(){
        this.render();
    }  

}

customElements.define("funnel-element", FunnelElement)

