import { AppElement } from "./AppElement";

/**
 * Funnel page. It serves to contain the components of the funnel and adds management events
 */
export class AppPage extends AppElement {

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
     * @param {Object} data - The properties, animations, events and head of the page & context
     * @param {String} template - The layout of the funnel page components
     */
    constructor(data={}, template=null){
        super();
        this.data = data;
        this.template = template;
        this.scrollStopping = {
          name:"",
          session:"",
          page:{
            start:Date.now(),
            end:0,
            time:0,
            leavingapp:0,
            views:0,
            req:{}
          },
          sections:{}
        }
        try {          
          let app = document.querySelector('#app');
          app.innerHTML = '';
          app.appendChild(this); 
        } catch (error){
          console.error('The element with id "app" does not exist to insert the element "app-page".', error);
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

    #setSEO(){
      let props = this.data.props;
      let context = this.data.context;
      let head = document.getElementsByTagName('head')[0];
      if (document.title!=undefined){
        document.title = props.title[context.lang]
        let description = document.querySelector("meta[name=description]")
        if (description===null){
          let meta = document.createElement('meta');
          meta.name = "description";
          meta.content = props.description[context.lang];
          head.appendChild(meta);
        }else {
          description.content = props.description[context.lang];
        }
        let metaTitle = document.createElement('meta');
        metaTitle.setAttribute('property', 'og:title')
        metaTitle.content = props.title[context.lang]
        head.appendChild(metaTitle);
        let metaDescription = document.createElement('meta');
        metaDescription.setAttribute('property', 'og:description')
        metaDescription.content = props.description[context.lang];
        head.appendChild(metaDescription);
        let metaType = document.createElement('meta');
        metaType.setAttribute('property', 'og:type')
        metaType.content = props.type;
        head.appendChild(metaType);
        let metaImage = document.createElement('meta');
        metaImage.setAttribute('property', 'og:image')
        metaImage.content = props.image;
        head.appendChild(metaImage);
        let twitterCard = document.createElement('meta');
        twitterCard.name = "twitter:card";
        twitterCard.content = "summary_large_image";
        head.appendChild(twitterCard);
        let twitterTitle = document.createElement('meta');
        twitterTitle.name = "twitter:title";
        twitterTitle.content = props.title[context.lang];
        head.appendChild(twitterTitle);
        let twitterDescription = document.createElement('meta');
        twitterDescription.name = "twitter:description";
        twitterDescription.content = props.title[context.lang];
        head.appendChild(twitterDescription);
        let twitterImage = document.createElement('meta');
        twitterImage.name = "twitter:image";
        twitterImage.content = props.image;
        head.appendChild(twitterImage);
        let cannonical = document.createElement('link');
        cannonical.setAttribute('rel', 'canonical');
        cannonical.setAttribute('href', props.canonical);
        head.appendChild(cannonical);
      }
    }

    /**
     * Add the page body css
     */
    #setStyles(){
      if (this.data.props?.classList?.length > 0){
        document.body.classList.add(...this.data.props.classList);
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
     * 
     * @param {String} name 
     * @param {Object} track 
     * @returns 
     */
    setSectionViewed(name, track){
      let res ={ 
        [name]:{
        order: track.order,
        start: Date.now(),
        end: 0,
        time: 0,
        views: track.views + 1
        }
      };
      return res;
    }
    /**
     * 
     * @param {String} name 
     * @param {Object} track 
     * @returns 
     */
    setSectionUnviewed(name, track){
      let res = {
        [name]:{
        order: track.order,
        start: track.start,
        end: Date.now(),
        time: track.time + (Date.now() - track.start),
        views: track.views
        }
      };
      return res;
      }

    /**
     * Update the props to each of the components
     */
    loadData(){     
      this.data.props = this.initState(this.#default,this.data.props);
      if (this.data.props.id!=undefined){
      this.getAttribute("id")||this.setAttribute("id",this.data.props.id||`component-${Math.floor(Math.random() * 100)}`);
      this.#setSEO();
      this.#setStyles();
      if (this.state.Cache===false){
        this.#noCache();
      }
      this.data.props.components.forEach(el=>{
        try {
          this.querySelector(`#${el.id}`)
            .updateState(this.#setContext(el,this.data.context));
        } catch (error) {
          console.error(`The Element with id ${el.id} does not exist or is not an object of type AppElement`, error);
        }        
      }) 
      let loading = document.querySelector('.pageloader');
      if (loading!=null){
        loading.classList.remove('is-active');
      }  

      }
        
    }

    /**
     * 
     * @param {String} webhookUrl - The webhook URI
     * @param {Object} data - The parameters that are sent in the JSON body of the webhook
     * @param {Object} [context={}] - The context of the app
     * @param {Boolean} [render=true] - true to render the page, false to just receive the data
     * @returns {Object} - If render is false it returns the body of the webhook response, if render is true it renders the page with the data from the response body.
     * 
     */
    async sendWebhook(webhookUrl, data, context={}, render=true){
      const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
      let loading = document.querySelector('.pageloader');
      if (loading!=null){
        loading.classList.add('is-active');
      }  
      try {
        const response = await fetch(webhookUrl, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        if (render==true){
          try {
            responseData.context = context;
            this.data = responseData;
            this.loadData();
          } catch (error){
            console.error('Cannot load data to render "app-page" components', error);
          }         
        }else {
          return responseData;
        }
      }  catch (error) {
          console.error('Error:', error);
      }
    }
    /**
     * 
     * @param {String} htmlTemplate 
     * @param {Array} validNames 
     * @returns 
     */
  #getOrderedIdsFromTemplate(htmlTemplate, validNames) {
    const regex = /id="([^"]+)"/g;
    let match;
    let orderedIds = [];
    while ((match = regex.exec(htmlTemplate)) !== null) {
        orderedIds.push(match[1]);
    }
    const validIdsInOrder = orderedIds.filter(id => validNames.includes(id));
    
    return validIdsInOrder;
}

    /**
     * Add the events that the page responds to
     */  
    #addEvents(){
      if (Array.isArray(this.data.props.events.trackViewed)){
        let sections = this.#getOrderedIdsFromTemplate(this.template,this.data.props.events.trackViewed);
        let i = 0;
        sections.forEach((id)=>{
          this.scrollStopping.sections[id]={order:i,start:0,end:0,time:0,views:0}
          i++;
        });
        const observerSections = new IntersectionObserver((entries) => {
        // Itera sobre las entradas observadas
          entries.forEach((entry) => {
            this.scrollStopping
            const id = entry.target.id;
            if (entry.isIntersecting) {
              // Elemento es visible
              let viewedElement = new CustomEvent('viewedelement', {
                detail: { source: id },
                bubbles: true,
                composed: true,
              });
              this.dispatchEvent(viewedElement);
            } else {
              // Elemento dejó de ser visible
              let unviewedElement = new CustomEvent('unviewedelement', {
                detail: { source: id },
                bubbles: true,
                composed: true,
              });
              this.dispatchEvent(unviewedElement);
            }
          
        });
        },
        {
          root: null, // Usa el viewport como root
          rootMargin: '0px', // Margen adicional, si es necesario
          threshold: 0.25, // 1.0 significa que el elemento debe estar completamente visible
        }
      );

      // Observa cada elemento con los IDs especificados
      this.data.props.events.trackViewed.forEach((id) => {
        const el = this.querySelector(`#${id}`);
        if (el) {
          observerSections.observe(el);
        }
      });
      };
      if (this.data.props?.events?.leavingapp===true){
        let leavingApp = new CustomEvent('leavingapp',{
          detail:{source:this.data.props.id},
          bubbles: true,
          composed: true
        });
        document.addEventListener('mouseleave',(e)=>{   
          if(e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight))
          {        
            this.dispatchEvent(leavingApp);        
          } 
        })
      }
      if (this.data.props?.events?.leavedapp===true){
        let leavedApp = new CustomEvent('leavedapp',{
          detail:{source:this.data.props.id},
          bubbles: true,
          composed: true
        });
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "hidden") {
            this.dispatchEvent(leavedApp);
          }
        });
      }
    }

  #extractEventNames(jsonObj) {
    const eventNames = new Set(); // Usamos Set para evitar duplicados

    function traverse(obj) {
      if (!obj || typeof obj !== 'object') return;

      // Si encontramos una clave 'eventName', la agregamos al Set
      if (obj.hasOwnProperty('eventName')) {
        eventNames.add(obj.eventName);
      }

      // Recorremos todas las claves del objeto
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          // Si el valor es un objeto o array, lo recorremos recursivamente
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            traverse(obj[key]);
          }
        }
      }
    }

    traverse(jsonObj);
    return Array.from(eventNames); // Convertimos el Set a un array
  }

    setEvents(handleEvents){
      let listen = this.#extractEventNames(this.data.props.components);
      listen.push(...["user:select-lang", "user:select-theme"]);
      if (this.data.props.events.leavingapp===true){
        listen.push("leavingapp");
      }
      if (this.data.props.events.leavedapp===true){
        listen.push("leavedapp");
      }
      if (Array.isArray(this.data.props.events.trackViewed)&& this.data.props.events.trackViewed.length>0){
        listen.push("viewedelement");
        listen.push("unviewedelement");
      }
      listen.forEach((value,index)=>{
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
        if (this.data.props?.id!=undefined ){
          this.loadData(this.data);
          this.#addEvents();
        }  
      }  
    }
}

customElements.define("app-page", AppPage)
