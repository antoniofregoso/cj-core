import { FunnelElement } from "./FunnelElement";

/**
 * Funnel page. It serves to contain the components of the funnel and adds management events
 */
export class FunnelPage extends FunnelElement {

    #default = {
      events:{
        viewedElement:undefined,
        leavingApp:false,
        leavedApp:false
          },
      classList:[]
    };
    

    /**
     * constructor description
     * @param {Object} props - The properties, animations, events and head of the page
     * @param {String} template - The layout of the funnel page components
     */
    constructor(props, template=null){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.#setStyles();
        this.template = template;
        if (this.state.noCache===true){
          this.#noCache();
        }
    }

    /**
     * Disable browser cache
     */
    #noCache(){
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
     * Add the page body css
     */
    #setStyles(){
      if (this.state.classList.length > 0){
        document.body.classList.add(...this.state.classList);
      }
    }
   
    /**
     * 
     * @param {Object} props 
     * @param {Object} context 
     * @returns 
     */
    #setContext(props,context={}){
        if (props!=undefined){
          props.context = context;
        } 
        return props;
    }

  

    /**
     * Load component properties and remove loader element
     * @param {Object} props - The properties of all funnel components identified by Id
     * @param {Object} context - The context of the funnel
     */
    loadData(props, context){
      for (var component of this.children){
        component.updateState(this.#setContext(props[component.id], context))
      }     
      let loading = document.querySelector('.pageloader');
      if (loading!=null){
        loading.classList.remove('is-active');
      }      
    }

    /**
     * Detects if the component has already been viewed
     * @param {HTMLElement} el 
     * @returns { Boolean} - True if the element was viewed in its entirety, false if it is not yet visible
     */
    #isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)

      );
    }

    #addEvents(){
      if (this.state.events.viewedElement!=undefined){
        let el = this.querySelector(`#${this.state.events.viewedElement}`)
        document.addEventListener('scroll',()=>{
          if (this.#isInViewport(el)==true){
            let viewedElement = new CustomEvent('viewedElement',{
              detail:{source:this.state.events.viewedElement},
              bubbles: true,
              composed: true
            });
            this.dispatchEvent(viewedElement);
              }
          }, {
              passive: true
          })        
        }
      if (this.state.events.leavingApp===true){
        let leavingApp = new CustomEvent('leavingApp',{
          detail:{source:this.state.id},
          bubbles: true,
          composed: true
        });
        document.addEventListener('mouseleave',()=>{          
          this.dispatchEvent(leavingApp);
        })
      }
      let leavedApp = new CustomEvent('leavedApp',{
        detail:{source:this.state.id},
        bubbles: true,
        composed: true
      });
      if (this.state.events.leavedApp===true){
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "hidden") {
            this.dispatchEvent(leavedApp);
          }
        });
      }
    }

    /**
     * Add listeners to each of the events
     * @param {Array} events - List of all events to follow generated within the funnel
     */
    eventsToListen(events, handleEvents){
      events.forEach((value,index)=>{
        this.addEventListener(value, handleEvents);
      });
    }

    /**
     * Fires on connectedCallback to render funnel page
     */
    render(){
      if (this.template===null){
        console.error('No component template provided')
      }
      else{
        this.innerHTML = this.template;
        this.#addEvents() 
      }  
    }
       
}

customElements.define("funnel-page", FunnelPage)