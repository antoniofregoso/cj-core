import { FunnelElement } from "./FunnelElement";

/**
 * 
 */
export class FunnelPage extends FunnelElement {

    #default = {
      classList:[]
    };
    components = [];

    /**
     * 
     * @param {*} props 
     */
    constructor(props, template=null){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.setStyles();
        this.template = template;
        if (this.state.noCache===true){
          this.setCache();
        }
        this.viewedElement = new CustomEvent( this.state.viewedEvent===undefined?"viewedElement":this.state.viewedEvent);
    }

    /**
     * 
     */
    setCache(){
      let head = document.getElementsByTagName('head')[0];
      let cacheControl = document.createElement('meta');
      cacheControl.name = "Cache-Control";
      cacheControl.content = "no-cache, no-store, must-revalidate";
      head.appendChild(cacheControl);
      let pragma = document.createElement('meta');
      pragma.name = "Pragma";
      pragma.content = "no-cache";
      head.appendChild(pragma);
      let expires = document.createElement('meta');
      expires.name = "Expires";
      expires.content = "0";
      head.appendChild(expires);
    }

    /**
     * 
     */
    setStyles(){
      if (this.state.classList.length > 0){
        document.body.classList.add(...this.state.classList);
      }
    }
   
    /**
     * 
     * @param {*} props 
     * @param {*} context 
     * @returns 
     */
    setContext(props,context={}){
        if (props!=undefined){
          props.context = context;
        } 
        return props;
    }

    /**
     * 
     * @returns 
     */
    getLang(){
      if (navigator.languages != undefined) 
        return navigator.languages[0].substring(0,2)
      return navigator.language.substring(0,2)
  }

  loadData(props, context){
    for (var component of this.children){
      component.updateState(this.setContext(props[component.id], context))
    }
  }

    /**
     * 
     * @param {*} el 
     * @returns 
     */
    isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)

      );
    }

    /**
     * 
     * @param {*} previousState 
     * @param {*} currentState 
     * @returns 
     */
    diffState(previousState, currentState) {
        const diff = {};
        
        for (let key in previousState) {
          if (previousState[key] !== currentState[key]) {
            diff[key] = [previousState[key], currentState[key]];
          }
        }
        
        for (let key in currentState) {
          if (currentState[key] !== previousState[key]) {
            diff[key] = [previousState[key], currentState[key]];
          }
        }
        
        return diff;
      }

      /**
       * 
       * @param  {...any} components 
       */
    componentsAdd(...components){   
      this.components = this.components.concat(components);
      document.querySelector('#app').appendChild(this);      
    }

    /**
     * 
     */
    render(){
      if (this.template===null){
        this.components.forEach(el=>{            
          this.appendChild(el)
      })
      }else{
        this.innerHTML = this.template;
      }        
      let loading = document.querySelector('.pageloader');
      if (loading!=null){
        loading.classList.remove('is-active');
      }       
    }
       
}

customElements.define("funnel-page", FunnelPage)