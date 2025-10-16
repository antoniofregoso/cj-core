(()=>{var k=class extends HTMLElement{#c={};constructor(c={}){super(),this.state=this.initState(c)}initState(c,s){if(s!=null){let a=Object.assign({},c,s);return c!=null&&Object.keys(c).lenght!=0&&Object.keys(c).forEach(e=>{s[e]!=null&&(typeof s[e]=="string"||Array.isArray(s[e])?a[e]=s[e]:a[e]=Object.assign({},c[e],s[e]))}),a}else return c}attribute2CamelCase(c){let s=new RegExp("-([a-z])","g");return c.replace(s,(a,e)=>e.toUpperCase())}camelCase2attribute(c){return c.replace(new RegExp("-([a-z])","g"),(s,a)=>a.toUpperCase())}setState(c){this.state=this.initState(this.#c,c),this.render()}updateState(c){this.state=this.initState(this.state,c),this.render()}setAnimation(c){if(c==null)return"";{let s=` data-animation=${c.effect}`;return c.delay!=null&&(s+=` data-delay=${c.delay}`),c.speed!=null&&(s+=` data-speed=${c.speed}`),c.repeat!=null&&(s+=` data-repeat=${c.repeat}`),s}}cleanValue(c){return c??""}updateClassList(){this.state.classList&&this.classList.add(...this.state.classList)}getClasses(c=[],s){let a=[];s===void 0?a=c:a=[...c,...s];let e="";return a.length>0&&(e=`class="${a.toString().replaceAll(","," ")}"`),e}getBackground(){let c="";return this.state.backgroundImage?.url!=null?(c=`background-image: url('${this.state.backgroundImage.url}'); background-repeat: no-repeat; background-position: center; background-size: cover;`,this.state.backgroundImage?.fixed&&(c=`${c} background-attachment: fixed;`)):c="",` style="${c}"`}getTitles(){let c="";return this.state!=null&&(c=`
            <div class="content">    
                ${this.state.caption?.text[this.state.context.lang]!=null?`
                <h2 ${this.getClasses(["subtitle"],this.state.caption?.classList)}  ${this.setAnimation(this.state.caption?.animation)}>${this.state.caption.text[this.state.context.lang]}</h2>`:""}          
                ${this.state.title?.text[this.state.context.lang]!=null?`
                <h1 ${this.getClasses([],this.state.title?.classList)}  ${this.setAnimation(this.state.title?.animation)}>${this.state.title.text[this.state.context.lang]}</h1>`:""}
                ${this.state.subtitle?.text[this.state.context.lang]!=null?`
                <h2 ${this.getClasses([],this.state.subtitle?.classList)}  ${this.setAnimation(this.state.subtitle?.animation)}>${this.state.subtitle.text[this.state.context.lang]}</h2>`:""}
            </div>`),c}handleEvent(c){if(c.type==="click"){this.eventName=this.state.buttons?.eventName??this.state.eventName??this.eventName;let s=new CustomEvent(this.eventName,{detail:{source:c.target.id},bubbles:!0,composed:!0});this.dispatchEvent(s)}}registerExtraEvents(){}addEvents(){let c=this.querySelectorAll("button");c.length>0&&c.forEach(s=>{s.addEventListener("click",this)})}#l(c){if(c!=null){let s="";return c.forEach(a=>{s+=`<${a.href!=null?"a":"button"} id="${a.id}" ${this.getClasses(["button"],a.classList)} ${a.href!=null?`href="${a.href}"`:""}>${a?.text[this.state.context.lang]}</${a.href!=null?"a":"button"}>`}),s}else return""}buttonsRender(c){return c!=null?`
                <p ${this.getClasses(["buttons","mt-4"],c.classList)}>
                    ${this.#l(c.buttons)}
                </p>
            `:""}render(){console.error("Nothing to render")}connectedCallback(){this.render()}disconnectedCallback(){let c=this.querySelectorAll("button");c.length>0&&c.forEach(s=>{s.removeEventListener("click",this)})}};customElements.define("app-element",k);var r2=class extends k{#c={events:{viewedElement:void 0,leavingApp:!1,leavedApp:!1},REABANDONMENT_THRESHOLD_MS:3*60*1e3,classList:[]};constructor(c={},s=null){super(),this.data=c,this.template=s,this.scrollStopping={name:"",session:"",page:{start:Date.now(),end:0,time:0,leavingapp:0,views:0,req:{}},sections:{}};try{let a=document.querySelector("#app");a.innerHTML="",a.appendChild(this)}catch(a){console.error('The element with id "app" does not exist to insert the element "app-page".',a)}}#l=!1;#s=0;#a(){let c=document.getElementsByTagName("head")[0],s=document.createElement("meta");s.name="Cache-Control",s.content="no-cache, no-store, must-revalidate",c.appendChild(s);let a=document.createElement("meta");a.name="Pragma",a.content="no-cache",c.appendChild(a);let e=document.createElement("meta");e.name="Expires",e.content="0",c.appendChild(e)}#e(){let c=this.data.props,s=this.data.context,a=document.getElementsByTagName("head")[0];if(document.title!=null){document.title=c.title[s.lang];let e=document.querySelector("meta[name=description]");if(e===null){let g=document.createElement("meta");g.name="description",g.content=c.description[s.lang],a.appendChild(g)}else e.content=c.description[s.lang];let n=document.createElement("meta");n.setAttribute("property","og:title"),n.content=c.title[s.lang],a.appendChild(n);let o=document.createElement("meta");o.setAttribute("property","og:description"),o.content=c.description[s.lang],a.appendChild(o);let i=document.createElement("meta");i.setAttribute("property","og:type"),i.content=c.type,a.appendChild(i);let m=document.createElement("meta");m.setAttribute("property","og:image"),m.content=c.image,a.appendChild(m);let r=document.createElement("meta");r.name="twitter:card",r.content="summary_large_image",a.appendChild(r);let z=document.createElement("meta");z.name="twitter:title",z.content=c.title[s.lang],a.appendChild(z);let M=document.createElement("meta");M.name="twitter:description",M.content=c.title[s.lang],a.appendChild(M);let L=document.createElement("meta");L.name="twitter:image",L.content=c.image,a.appendChild(L);let C=document.createElement("link");C.setAttribute("rel","canonical"),C.setAttribute("href",c.canonical),a.appendChild(C)}}#n(){this.data.props?.classList?.length>0&&document.body.classList.add(...this.data.props.classList)}#i(c,s={}){return c!=null&&(c.context=s),c}setSectionViewed(c,s){return{[c]:{order:s.order,start:Date.now(),end:0,time:0,views:s.views+1}}}setSectionUnviewed(c,s){return{[c]:{order:s.order,start:s.start,end:Date.now(),time:s.time+(Date.now()-s.start),views:s.views}}}setPageQuit(c){return{start:c.start,end:Date.now(),time:Date.now()-c.start,leavingapp:c.leavingapp,views:c.views,req:c.req}}loadData(){if(this.data.props=this.initState(this.#c,this.data.props),this.data.props.id!=null){this.getAttribute("id")||this.setAttribute("id",this.data.props.id||`component-${Math.floor(Math.random()*100)}`),this.#e(),this.#n(),this.state.Cache===!1&&this.#a(),this.data.props.components.forEach(s=>{try{this.querySelector(`#${s.id}`).updateState(this.#i(s,this.data.context))}catch(a){console.error(`The Element with id ${s.id} does not exist or is not an object of type AppElement`,a)}});let c=document.querySelector(".pageloader");c?.classList.remove("is-active")}}async sendWebhook(c,s,a={},e=!0){let n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)},o=document.querySelector(".pageloader");o?.classList.add("is-active");try{let i=await fetch(c,n);if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);let m=await i.json();if(e==!0)try{m.context=a,this.data=m,this.loadData()}catch(r){console.error('Cannot load data to render "app-page" components',r)}else return m}catch(i){console.error("Error:",i)}}#t(c,s){let a=/id="([^"]+)"/g,e,n=[];for(;(e=a.exec(c))!==null;)n.push(e[1]);return n.filter(i=>s.includes(i))}#o(){if(this.#l&&Date.now()-this.#s<this.state.REABANDONMENT_THRESHOLD_MS)return;this.#l=!0,this.#s=Date.now();let c=new CustomEvent("leavedapp",{detail:{source:this.data.props.id},bubbles:!0,composed:!0});this.dispatchEvent(c)}#f(){if(Array.isArray(this.data.props.events.trackViewed)){let c=this.#t(this.template,this.data.props.events.trackViewed),s=0;c.forEach(e=>{this.scrollStopping.sections[e]={order:s,start:0,end:0,time:0,views:0},s++});let a=new IntersectionObserver(e=>{e.forEach(n=>{this.scrollStopping;let o=n.target.id;if(n.isIntersecting){let i=new CustomEvent("viewedelement",{detail:{source:o},bubbles:!0,composed:!0});this.dispatchEvent(i)}else{let i=new CustomEvent("unviewedelement",{detail:{source:o},bubbles:!0,composed:!0});this.dispatchEvent(i)}})},{root:null,rootMargin:"0px",threshold:.25});this.data.props.events.trackViewed.forEach(e=>{let n=this.querySelector(`#${e}`);n&&a.observe(n)})}if(this.data.props?.events?.leavingapp===!0){let c=new CustomEvent("leavingapp",{detail:{source:this.data.props.id},bubbles:!0,composed:!0});document.addEventListener("mouseleave",s=>{(s.clientY<=0||s.clientX<=0||s.clientX>=window.innerWidth||s.clientY>=window.innerHeight)&&this.dispatchEvent(c)})}this.data.props?.events?.leavedapp===!0&&(document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&this.#o()}),window.addEventListener("pagehide",()=>{this.#o()}))}#r(c){let s=new Set;function a(e){if(!(!e||typeof e!="object")){e.hasOwnProperty("eventName")&&s.add(e.eventName);for(let n in e)e.hasOwnProperty(n)&&typeof e[n]=="object"&&e[n]!==null&&a(e[n])}}return a(c),Array.from(s)}setEvents(c){let s=this.#r(this.data.props.components);s.push("user:select-lang","user:select-theme"),this.data.props.events.leavingapp===!0&&s.push("leavingapp"),this.data.props.events.leavedapp===!0&&s.push("leavedapp"),Array.isArray(this.data.props.events.trackViewed)&&this.data.props.events.trackViewed.length>0&&(s.push("viewedelement"),s.push("unviewedelement")),s.forEach((a,e)=>{this.addEventListener(a,c)})}render(){this.template===null?console.error("No component template provided"):(this.innerHTML=this.template,this.data.props?.id!=null&&(this.loadData(this.data),this.#f()))}};customElements.define("app-page",r2);function i0(l){if(!l)return"";var c=l.toLowerCase().trim();return c=c.normalize("NFD").replace(/[\u0300-\u036f]/g,""),c=c.replace(/[^a-z0-9\s-]/g," ").trim(),c=c.replace(/[\s-]+/g,"%20"),c}function t0(l=32){let c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s=new Uint8Array(l);crypto.getRandomValues(s);let a="";for(let e=0;e<l;e++){let n=s[e]%c.length;a+=c[n]}return a}function r0(){let l=document.querySelectorAll("[data-animation]"),c={threshold:.1};var s=new IntersectionObserver(a=>{a.forEach(e=>{if(e.isIntersecting){a3(e.target);return}e.target.classList.forEach(n=>{n.startsWith("animate__")&&e.target.classList.remove(n)})})});l.forEach(a=>{s.observe(a)})}function a3(l){l.classList.add("animate__animated",`animate__${l.getAttribute("data-animation")}`),l.hasAttribute("data-delay")&&l.classList.add(`animate__delay-${l.getAttribute("data-delay")}`),l.hasAttribute("data-speed")&&l.classList.add(`animate__${l.getAttribute("data-speed")}`),l.hasAttribute("data-repeat")&&(l.getAttribute("data-repeat")==="infinite"?l.classList.add("animate__infinite"):l.classList.add(`animate__repeat-${l.getAttribute("data-repeat")}`))}function m0(){return navigator.languages!=null?navigator.languages[0].substring(0,2):navigator.language.substring(0,2)}function z0(l){l===void 0&&(l={});let s=["is-bottom-to-top","is-right-to-left","is-left-to-right"].find(a=>a==l.direction);document.body.innerHTML+=`<div class="pageloader ${l?.color!=null?l.color:"is-light"} ${s??""} is-active"><span class="title">${l.message!=null?l.message:"Loading..."}</span></div>`}var m2=class extends k{#c={brand:{name:"CustumerJourney.js",url:"https://customerjourney.ninja/"}};constructor(c={}){super(),this.state=this.initState(this.#c,c),this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random()*100)}`)}render(){this.innerHTML=`
        <footer ${this.getClasses(["footer"],this.state.classList)} >
            <div class="content has-text-centered">
                    <img  src="${this.state.context?.theme==="light"?this.state.brand?.src:this.state.brand?.srcDark===void 0?this.state.brand?.src:this.state.brand?.srcDark}" style="max-width:200px">
                <p>${this.state.content?.text[this.state.context.lang]}</p>
                <p><a href="${this.state.privacyPolicy?.url}">${this.state.privacyPolicy?.text===void 0?"":this.state.privacyPolicy?.text[this.state.context.lang]}</a></p>
            </div>
            <div class="has-text-left" >
                <h4>Powered by <a href="${this.state.brand?.url}">${this.state.brand.name}</a></h4>
            </div>
        </footer>
        `}};customElements.define("page-footer",m2);function e3(l,c,s){return(c=o3(c))in l?Object.defineProperty(l,c,{value:s,enumerable:!0,configurable:!0,writable:!0}):l[c]=s,l}function V2(l,c){var s=Object.keys(l);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(l);c&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(l,e).enumerable})),s.push.apply(s,a)}return s}function t(l){for(var c=1;c<arguments.length;c++){var s=arguments[c]!=null?arguments[c]:{};c%2?V2(Object(s),!0).forEach(function(a){e3(l,a,s[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(s)):V2(Object(s)).forEach(function(a){Object.defineProperty(l,a,Object.getOwnPropertyDescriptor(s,a))})}return l}function n3(l,c){if(typeof l!="object"||!l)return l;var s=l[Symbol.toPrimitive];if(s!==void 0){var a=s.call(l,c||"default");if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(c==="string"?String:Number)(l)}function o3(l){var c=n3(l,"string");return typeof c=="symbol"?c:c+""}var $2=()=>{},D2={},h1={},g1=null,x1={mark:$2,measure:$2};try{typeof window<"u"&&(D2=window),typeof document<"u"&&(h1=document),typeof MutationObserver<"u"&&(g1=MutationObserver),typeof performance<"u"&&(x1=performance)}catch{}var{userAgent:X2=""}=D2.navigator||{},T=D2,p=h1,Y2=g1,Q=x1,C0=!!T.document,v=!!p.documentElement&&!!p.head&&typeof p.addEventListener=="function"&&typeof p.createElement=="function",N1=~X2.indexOf("MSIE")||~X2.indexOf("Trident/"),i3=/fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,t3=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,b1={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"}},f3={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},S1=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],d="classic",a2="duotone",r3="sharp",m3="sharp-duotone",w1=[d,a2,r3,m3],z3={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"}},L3={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"}},M3=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}]]),p3={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",brands:"fab"},duotone:{solid:"fad",regular:"fadr",light:"fadl",thin:"fadt"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds",regular:"fasdr",light:"fasdl",thin:"fasdt"}},C3=["fak","fa-kit","fakd","fa-kit-duotone"],K2={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},d3=["kit"],u3={kit:{"fa-kit":"fak"},"kit-duotone":{"fa-kit-duotone":"fakd"}},h3=["fak","fakd"],g3={kit:{fak:"fa-kit"},"kit-duotone":{fakd:"fa-kit-duotone"}},Q2={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},J={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},x3=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],N3=["fak","fa-kit","fakd","fa-kit-duotone"],b3={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},S3={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"}},w3={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"]},d2={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"}},k3=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands"],u2=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt",...x3,...k3],y3=["solid","regular","light","thin","duotone","brands"],k1=[1,2,3,4,5,6,7,8,9,10],A3=k1.concat([11,12,13,14,15,16,17,18,19,20]),v3=[...Object.keys(w3),...y3,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",J.GROUP,J.SWAP_OPACITY,J.PRIMARY,J.SECONDARY].concat(k1.map(l=>"".concat(l,"x"))).concat(A3.map(l=>"w-".concat(l))),P3={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},y="___FONT_AWESOME___",h2=16,y1="fa",A1="svg-inline--fa",R="data-fa-i2svg",g2="data-fa-pseudo-element",T3="data-fa-pseudo-element-pending",B2="data-prefix",R2="data-icon",J2="fontawesome-i2svg",E3="async",F3=["HTML","HEAD","STYLE","SCRIPT"],v1=(()=>{try{return!0}catch{return!1}})();function Y(l){return new Proxy(l,{get(c,s){return s in c?c[s]:c[d]}})}var P1=t({},b1);P1[d]=t(t(t(t({},{"fa-duotone":"duotone"}),b1[d]),K2.kit),K2["kit-duotone"]);var D3=Y(P1),x2=t({},p3);x2[d]=t(t(t(t({},{duotone:"fad"}),x2[d]),Q2.kit),Q2["kit-duotone"]);var Z2=Y(x2),N2=t({},d2);N2[d]=t(t({},N2[d]),g3.kit);var H2=Y(N2),b2=t({},S3);b2[d]=t(t({},b2[d]),u3.kit);var d0=Y(b2),B3=i3,T1="fa-layers-text",R3=t3,H3=t({},z3),u0=Y(H3),O3=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],z2=f3,q3=[...d3,...v3],j=T.FontAwesomeConfig||{};function I3(l){var c=p.querySelector("script["+l+"]");if(c)return c.getAttribute(l)}function U3(l){return l===""?!0:l==="false"?!1:l==="true"?!0:l}p&&typeof p.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(c=>{let[s,a]=c,e=U3(I3(s));e!=null&&(j[a]=e)});var E1={styleDefault:"solid",familyDefault:d,cssPrefix:y1,replacementClass:A1,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};j.familyPrefix&&(j.cssPrefix=j.familyPrefix);var _=t(t({},E1),j);_.autoReplaceSvg||(_.observeMutations=!1);var f={};Object.keys(E1).forEach(l=>{Object.defineProperty(f,l,{enumerable:!0,set:function(c){_[l]=c,V.forEach(s=>s(f))},get:function(){return _[l]}})});Object.defineProperty(f,"familyPrefix",{enumerable:!0,set:function(l){_.cssPrefix=l,V.forEach(c=>c(f))},get:function(){return _.cssPrefix}});T.FontAwesomeConfig=f;var V=[];function _3(l){return V.push(l),()=>{V.splice(V.indexOf(l),1)}}var P=h2,b={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function W3(l){if(!l||!v)return;let c=p.createElement("style");c.setAttribute("type","text/css"),c.innerHTML=l;let s=p.head.childNodes,a=null;for(let e=s.length-1;e>-1;e--){let n=s[e],o=(n.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(a=n)}return p.head.insertBefore(c,a),l}var G3="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function $(){let l=12,c="";for(;l-- >0;)c+=G3[Math.random()*62|0];return c}function W(l){let c=[];for(let s=(l||[]).length>>>0;s--;)c[s]=l[s];return c}function O2(l){return l.classList?W(l.classList):(l.getAttribute("class")||"").split(" ").filter(c=>c)}function F1(l){return"".concat(l).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function j3(l){return Object.keys(l||{}).reduce((c,s)=>c+"".concat(s,'="').concat(F1(l[s]),'" '),"").trim()}function e2(l){return Object.keys(l||{}).reduce((c,s)=>c+"".concat(s,": ").concat(l[s].trim(),";"),"")}function q2(l){return l.size!==b.size||l.x!==b.x||l.y!==b.y||l.rotate!==b.rotate||l.flipX||l.flipY}function V3(l){let{transform:c,containerWidth:s,iconWidth:a}=l,e={transform:"translate(".concat(s/2," 256)")},n="translate(".concat(c.x*32,", ").concat(c.y*32,") "),o="scale(".concat(c.size/16*(c.flipX?-1:1),", ").concat(c.size/16*(c.flipY?-1:1),") "),i="rotate(".concat(c.rotate," 0 0)"),m={transform:"".concat(n," ").concat(o," ").concat(i)},r={transform:"translate(".concat(a/2*-1," -256)")};return{outer:e,inner:m,path:r}}function $3(l){let{transform:c,width:s=h2,height:a=h2,startCentered:e=!1}=l,n="";return e&&N1?n+="translate(".concat(c.x/P-s/2,"em, ").concat(c.y/P-a/2,"em) "):e?n+="translate(calc(-50% + ".concat(c.x/P,"em), calc(-50% + ").concat(c.y/P,"em)) "):n+="translate(".concat(c.x/P,"em, ").concat(c.y/P,"em) "),n+="scale(".concat(c.size/P*(c.flipX?-1:1),", ").concat(c.size/P*(c.flipY?-1:1),") "),n+="rotate(".concat(c.rotate,"deg) "),n}var X3=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}`;function D1(){let l=y1,c=A1,s=f.cssPrefix,a=f.replacementClass,e=X3;if(s!==l||a!==c){let n=new RegExp("\\.".concat(l,"\\-"),"g"),o=new RegExp("\\--".concat(l,"\\-"),"g"),i=new RegExp("\\.".concat(c),"g");e=e.replace(n,".".concat(s,"-")).replace(o,"--".concat(s,"-")).replace(i,".".concat(a))}return e}var c1=!1;function L2(){f.autoAddCss&&!c1&&(W3(D1()),c1=!0)}var Y3={mixout(){return{dom:{css:D1,insertCss:L2}}},hooks(){return{beforeDOMElementCreation(){L2()},beforeI2svg(){L2()}}}},A=T||{};A[y]||(A[y]={});A[y].styles||(A[y].styles={});A[y].hooks||(A[y].hooks={});A[y].shims||(A[y].shims=[]);var S=A[y],B1=[],R1=function(){p.removeEventListener("DOMContentLoaded",R1),l2=1,B1.map(l=>l())},l2=!1;v&&(l2=(p.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(p.readyState),l2||p.addEventListener("DOMContentLoaded",R1));function K3(l){v&&(l2?setTimeout(l,0):B1.push(l))}function K(l){let{tag:c,attributes:s={},children:a=[]}=l;return typeof l=="string"?F1(l):"<".concat(c," ").concat(j3(s),">").concat(a.map(K).join(""),"</").concat(c,">")}function l1(l,c,s){if(l&&l[c]&&l[c][s])return{prefix:c,iconName:s,icon:l[c][s]}}var Q3=function(c,s){return function(a,e,n,o){return c.call(s,a,e,n,o)}},M2=function(c,s,a,e){var n=Object.keys(c),o=n.length,i=e!==void 0?Q3(s,e):s,m,r,z;for(a===void 0?(m=1,z=c[n[0]]):(m=0,z=a);m<o;m++)r=n[m],z=i(z,c[r],r,c);return z};function J3(l){let c=[],s=0,a=l.length;for(;s<a;){let e=l.charCodeAt(s++);if(e>=55296&&e<=56319&&s<a){let n=l.charCodeAt(s++);(n&64512)==56320?c.push(((e&1023)<<10)+(n&1023)+65536):(c.push(e),s--)}else c.push(e)}return c}function S2(l){let c=J3(l);return c.length===1?c[0].toString(16):null}function Z3(l,c){let s=l.length,a=l.charCodeAt(c),e;return a>=55296&&a<=56319&&s>c+1&&(e=l.charCodeAt(c+1),e>=56320&&e<=57343)?(a-55296)*1024+e-56320+65536:a}function s1(l){return Object.keys(l).reduce((c,s)=>{let a=l[s];return!!a.icon?c[a.iconName]=a.icon:c[s]=a,c},{})}function w2(l,c){let s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},{skipHooks:a=!1}=s,e=s1(c);typeof S.hooks.addPack=="function"&&!a?S.hooks.addPack(l,s1(c)):S.styles[l]=t(t({},S.styles[l]||{}),e),l==="fas"&&w2("fa",c)}var{styles:X,shims:c4}=S,H1=Object.keys(H2),l4=H1.reduce((l,c)=>(l[c]=Object.keys(H2[c]),l),{}),I2=null,O1={},q1={},I1={},U1={},_1={};function s4(l){return~q3.indexOf(l)}function a4(l,c){let s=c.split("-"),a=s[0],e=s.slice(1).join("-");return a===l&&e!==""&&!s4(e)?e:null}var W1=()=>{let l=a=>M2(X,(e,n,o)=>(e[o]=M2(n,a,{}),e),{});O1=l((a,e,n)=>(e[3]&&(a[e[3]]=n),e[2]&&e[2].filter(i=>typeof i=="number").forEach(i=>{a[i.toString(16)]=n}),a)),q1=l((a,e,n)=>(a[n]=n,e[2]&&e[2].filter(i=>typeof i=="string").forEach(i=>{a[i]=n}),a)),_1=l((a,e,n)=>{let o=e[2];return a[n]=n,o.forEach(i=>{a[i]=n}),a});let c="far"in X||f.autoFetchSvg,s=M2(c4,(a,e)=>{let n=e[0],o=e[1],i=e[2];return o==="far"&&!c&&(o="fas"),typeof n=="string"&&(a.names[n]={prefix:o,iconName:i}),typeof n=="number"&&(a.unicodes[n.toString(16)]={prefix:o,iconName:i}),a},{names:{},unicodes:{}});I1=s.names,U1=s.unicodes,I2=n2(f.styleDefault,{family:f.familyDefault})};_3(l=>{I2=n2(l.styleDefault,{family:f.familyDefault})});W1();function U2(l,c){return(O1[l]||{})[c]}function e4(l,c){return(q1[l]||{})[c]}function B(l,c){return(_1[l]||{})[c]}function G1(l){return I1[l]||{prefix:null,iconName:null}}function n4(l){let c=U1[l],s=U2("fas",l);return c||(s?{prefix:"fas",iconName:s}:null)||{prefix:null,iconName:null}}function E(){return I2}var j1=()=>({prefix:null,iconName:null,rest:[]});function o4(l){let c=d,s=H1.reduce((a,e)=>(a[e]="".concat(f.cssPrefix,"-").concat(e),a),{});return w1.forEach(a=>{(l.includes(s[a])||l.some(e=>l4[a].includes(e)))&&(c=a)}),c}function n2(l){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},{family:s=d}=c,a=D3[s][l];if(s===a2&&!l)return"fad";let e=Z2[s][l]||Z2[s][a],n=l in S.styles?l:null;return e||n||null}function i4(l){let c=[],s=null;return l.forEach(a=>{let e=a4(f.cssPrefix,a);e?s=e:a&&c.push(a)}),{iconName:s,rest:c}}function a1(l){return l.sort().filter((c,s,a)=>a.indexOf(c)===s)}function o2(l){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},{skipLookups:s=!1}=c,a=null,e=u2.concat(N3),n=a1(l.filter(M=>e.includes(M))),o=a1(l.filter(M=>!u2.includes(M))),i=n.filter(M=>(a=M,!S1.includes(M))),[m=null]=i,r=o4(n),z=t(t({},i4(o)),{},{prefix:n2(m,{family:r})});return t(t(t({},z),m4({values:l,family:r,styles:X,config:f,canonical:z,givenPrefix:a})),t4(s,a,z))}function t4(l,c,s){let{prefix:a,iconName:e}=s;if(l||!a||!e)return{prefix:a,iconName:e};let n=c==="fa"?G1(e):{},o=B(a,e);return e=n.iconName||o||e,a=n.prefix||a,a==="far"&&!X.far&&X.fas&&!f.autoFetchSvg&&(a="fas"),{prefix:a,iconName:e}}var f4=w1.filter(l=>l!==d||l!==a2),r4=Object.keys(d2).filter(l=>l!==d).map(l=>Object.keys(d2[l])).flat();function m4(l){let{values:c,family:s,canonical:a,givenPrefix:e="",styles:n={},config:o={}}=l,i=s===a2,m=c.includes("fa-duotone")||c.includes("fad"),r=o.familyDefault==="duotone",z=a.prefix==="fad"||a.prefix==="fa-duotone";if(!i&&(m||r||z)&&(a.prefix="fad"),(c.includes("fa-brands")||c.includes("fab"))&&(a.prefix="fab"),!a.prefix&&f4.includes(s)&&(Object.keys(n).find(L=>r4.includes(L))||o.autoFetchSvg)){let L=M3.get(s).defaultShortPrefixId;a.prefix=L,a.iconName=B(a.prefix,a.iconName)||a.iconName}return(a.prefix==="fa"||e==="fa")&&(a.prefix=E()||"fas"),a}var k2=class{constructor(){this.definitions={}}add(){for(var c=arguments.length,s=new Array(c),a=0;a<c;a++)s[a]=arguments[a];let e=s.reduce(this._pullDefinitions,{});Object.keys(e).forEach(n=>{this.definitions[n]=t(t({},this.definitions[n]||{}),e[n]),w2(n,e[n]);let o=H2[d][n];o&&w2(o,e[n]),W1()})}reset(){this.definitions={}}_pullDefinitions(c,s){let a=s.prefix&&s.iconName&&s.icon?{0:s}:s;return Object.keys(a).map(e=>{let{prefix:n,iconName:o,icon:i}=a[e],m=i[2];c[n]||(c[n]={}),m.length>0&&m.forEach(r=>{typeof r=="string"&&(c[n][r]=i)}),c[n][o]=i}),c}},e1=[],I={},U={},z4=Object.keys(U);function L4(l,c){let{mixoutsTo:s}=c;return e1=l,I={},Object.keys(U).forEach(a=>{z4.indexOf(a)===-1&&delete U[a]}),e1.forEach(a=>{let e=a.mixout?a.mixout():{};if(Object.keys(e).forEach(n=>{typeof e[n]=="function"&&(s[n]=e[n]),typeof e[n]=="object"&&Object.keys(e[n]).forEach(o=>{s[n]||(s[n]={}),s[n][o]=e[n][o]})}),a.hooks){let n=a.hooks();Object.keys(n).forEach(o=>{I[o]||(I[o]=[]),I[o].push(n[o])})}a.provides&&a.provides(U)}),s}function y2(l,c){for(var s=arguments.length,a=new Array(s>2?s-2:0),e=2;e<s;e++)a[e-2]=arguments[e];return(I[l]||[]).forEach(o=>{c=o.apply(null,[c,...a])}),c}function H(l){for(var c=arguments.length,s=new Array(c>1?c-1:0),a=1;a<c;a++)s[a-1]=arguments[a];(I[l]||[]).forEach(n=>{n.apply(null,s)})}function F(){let l=arguments[0],c=Array.prototype.slice.call(arguments,1);return U[l]?U[l].apply(null,c):void 0}function A2(l){l.prefix==="fa"&&(l.prefix="fas");let{iconName:c}=l,s=l.prefix||E();if(c)return c=B(s,c)||c,l1(V1.definitions,s,c)||l1(S.styles,s,c)}var V1=new k2,M4=()=>{f.autoReplaceSvg=!1,f.observeMutations=!1,H("noAuto")},p4={i2svg:function(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return v?(H("beforeI2svg",l),F("pseudoElements2svg",l),F("i2svg",l)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},{autoReplaceSvgRoot:c}=l;f.autoReplaceSvg===!1&&(f.autoReplaceSvg=!0),f.observeMutations=!0,K3(()=>{d4({autoReplaceSvgRoot:c}),H("watch",l)})}},C4={icon:l=>{if(l===null)return null;if(typeof l=="object"&&l.prefix&&l.iconName)return{prefix:l.prefix,iconName:B(l.prefix,l.iconName)||l.iconName};if(Array.isArray(l)&&l.length===2){let c=l[1].indexOf("fa-")===0?l[1].slice(3):l[1],s=n2(l[0]);return{prefix:s,iconName:B(s,c)||c}}if(typeof l=="string"&&(l.indexOf("".concat(f.cssPrefix,"-"))>-1||l.match(B3))){let c=o2(l.split(" "),{skipLookups:!0});return{prefix:c.prefix||E(),iconName:B(c.prefix,c.iconName)||c.iconName}}if(typeof l=="string"){let c=E();return{prefix:c,iconName:B(c,l)||l}}}},h={noAuto:M4,config:f,dom:p4,parse:C4,library:V1,findIconDefinition:A2,toHtml:K},d4=function(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},{autoReplaceSvgRoot:c=p}=l;(Object.keys(S.styles).length>0||f.autoFetchSvg)&&v&&f.autoReplaceSvg&&h.dom.i2svg({node:c})};function i2(l,c){return Object.defineProperty(l,"abstract",{get:c}),Object.defineProperty(l,"html",{get:function(){return l.abstract.map(s=>K(s))}}),Object.defineProperty(l,"node",{get:function(){if(!v)return;let s=p.createElement("div");return s.innerHTML=l.html,s.children}}),l}function u4(l){let{children:c,main:s,mask:a,attributes:e,styles:n,transform:o}=l;if(q2(o)&&s.found&&!a.found){let{width:i,height:m}=s,r={x:i/m/2,y:.5};e.style=e2(t(t({},n),{},{"transform-origin":"".concat(r.x+o.x/16,"em ").concat(r.y+o.y/16,"em")}))}return[{tag:"svg",attributes:e,children:c}]}function h4(l){let{prefix:c,iconName:s,children:a,attributes:e,symbol:n}=l,o=n===!0?"".concat(c,"-").concat(f.cssPrefix,"-").concat(s):n;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:t(t({},e),{},{id:o}),children:a}]}]}function _2(l){let{icons:{main:c,mask:s},prefix:a,iconName:e,transform:n,symbol:o,title:i,maskId:m,titleId:r,extra:z,watchable:M=!1}=l,{width:L,height:C}=s.found?s:c,g=h3.includes(a),D=[f.replacementClass,e?"".concat(f.cssPrefix,"-").concat(e):""].filter(q=>z.classes.indexOf(q)===-1).filter(q=>q!==""||!!q).concat(z.classes).join(" "),x={children:[],attributes:t(t({},z.attributes),{},{"data-prefix":a,"data-icon":e,class:D,role:z.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(L," ").concat(C)})},w=g&&!~z.classes.indexOf("fa-fw")?{width:"".concat(L/C*16*.0625,"em")}:{};M&&(x.attributes[R]=""),i&&(x.children.push({tag:"title",attributes:{id:x.attributes["aria-labelledby"]||"title-".concat(r||$())},children:[i]}),delete x.attributes.title);let u=t(t({},x),{},{prefix:a,iconName:e,main:c,mask:s,maskId:m,transform:n,symbol:o,styles:t(t({},w),z.styles)}),{children:N,attributes:O}=s.found&&c.found?F("generateAbstractMask",u)||{children:[],attributes:{}}:F("generateAbstractIcon",u)||{children:[],attributes:{}};return u.children=N,u.attributes=O,o?h4(u):u4(u)}function n1(l){let{content:c,width:s,height:a,transform:e,title:n,extra:o,watchable:i=!1}=l,m=t(t(t({},o.attributes),n?{title:n}:{}),{},{class:o.classes.join(" ")});i&&(m[R]="");let r=t({},o.styles);q2(e)&&(r.transform=$3({transform:e,startCentered:!0,width:s,height:a}),r["-webkit-transform"]=r.transform);let z=e2(r);z.length>0&&(m.style=z);let M=[];return M.push({tag:"span",attributes:m,children:[c]}),n&&M.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),M}function g4(l){let{content:c,title:s,extra:a}=l,e=t(t(t({},a.attributes),s?{title:s}:{}),{},{class:a.classes.join(" ")}),n=e2(a.styles);n.length>0&&(e.style=n);let o=[];return o.push({tag:"span",attributes:e,children:[c]}),s&&o.push({tag:"span",attributes:{class:"sr-only"},children:[s]}),o}var{styles:p2}=S;function v2(l){let c=l[0],s=l[1],[a]=l.slice(4),e=null;return Array.isArray(a)?e={tag:"g",attributes:{class:"".concat(f.cssPrefix,"-").concat(z2.GROUP)},children:[{tag:"path",attributes:{class:"".concat(f.cssPrefix,"-").concat(z2.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(f.cssPrefix,"-").concat(z2.PRIMARY),fill:"currentColor",d:a[1]}}]}:e={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:c,height:s,icon:e}}var x4={found:!1,width:512,height:512};function N4(l,c){!v1&&!f.showMissingIcons&&l&&console.error('Icon with name "'.concat(l,'" and prefix "').concat(c,'" is missing.'))}function P2(l,c){let s=c;return c==="fa"&&f.styleDefault!==null&&(c=E()),new Promise((a,e)=>{if(s==="fa"){let n=G1(l)||{};l=n.iconName||l,c=n.prefix||c}if(l&&c&&p2[c]&&p2[c][l]){let n=p2[c][l];return a(v2(n))}N4(l,c),a(t(t({},x4),{},{icon:f.showMissingIcons&&l?F("missingIconAbstract")||{}:{}}))})}var o1=()=>{},T2=f.measurePerformance&&Q&&Q.mark&&Q.measure?Q:{mark:o1,measure:o1},G='FA "6.7.2"',b4=l=>(T2.mark("".concat(G," ").concat(l," begins")),()=>$1(l)),$1=l=>{T2.mark("".concat(G," ").concat(l," ends")),T2.measure("".concat(G," ").concat(l),"".concat(G," ").concat(l," begins"),"".concat(G," ").concat(l," ends"))},W2={begin:b4,end:$1},Z=()=>{};function i1(l){return typeof(l.getAttribute?l.getAttribute(R):null)=="string"}function S4(l){let c=l.getAttribute?l.getAttribute(B2):null,s=l.getAttribute?l.getAttribute(R2):null;return c&&s}function w4(l){return l&&l.classList&&l.classList.contains&&l.classList.contains(f.replacementClass)}function k4(){return f.autoReplaceSvg===!0?c2.replace:c2[f.autoReplaceSvg]||c2.replace}function y4(l){return p.createElementNS("http://www.w3.org/2000/svg",l)}function A4(l){return p.createElement(l)}function X1(l){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},{ceFn:s=l.tag==="svg"?y4:A4}=c;if(typeof l=="string")return p.createTextNode(l);let a=s(l.tag);return Object.keys(l.attributes||[]).forEach(function(n){a.setAttribute(n,l.attributes[n])}),(l.children||[]).forEach(function(n){a.appendChild(X1(n,{ceFn:s}))}),a}function v4(l){let c=" ".concat(l.outerHTML," ");return c="".concat(c,"Font Awesome fontawesome.com "),c}var c2={replace:function(l){let c=l[0];if(c.parentNode)if(l[1].forEach(s=>{c.parentNode.insertBefore(X1(s),c)}),c.getAttribute(R)===null&&f.keepOriginalSource){let s=p.createComment(v4(c));c.parentNode.replaceChild(s,c)}else c.remove()},nest:function(l){let c=l[0],s=l[1];if(~O2(c).indexOf(f.replacementClass))return c2.replace(l);let a=new RegExp("".concat(f.cssPrefix,"-.*"));if(delete s[0].attributes.id,s[0].attributes.class){let n=s[0].attributes.class.split(" ").reduce((o,i)=>(i===f.replacementClass||i.match(a)?o.toSvg.push(i):o.toNode.push(i),o),{toNode:[],toSvg:[]});s[0].attributes.class=n.toSvg.join(" "),n.toNode.length===0?c.removeAttribute("class"):c.setAttribute("class",n.toNode.join(" "))}let e=s.map(n=>K(n)).join(`
`);c.setAttribute(R,""),c.innerHTML=e}};function t1(l){l()}function Y1(l,c){let s=typeof c=="function"?c:Z;if(l.length===0)s();else{let a=t1;f.mutateApproach===E3&&(a=T.requestAnimationFrame||t1),a(()=>{let e=k4(),n=W2.begin("mutate");l.map(e),n(),s()})}}var G2=!1;function K1(){G2=!0}function E2(){G2=!1}var s2=null;function f1(l){if(!Y2||!f.observeMutations)return;let{treeCallback:c=Z,nodeCallback:s=Z,pseudoElementsCallback:a=Z,observeMutationsRoot:e=p}=l;s2=new Y2(n=>{if(G2)return;let o=E();W(n).forEach(i=>{if(i.type==="childList"&&i.addedNodes.length>0&&!i1(i.addedNodes[0])&&(f.searchPseudoElements&&a(i.target),c(i.target)),i.type==="attributes"&&i.target.parentNode&&f.searchPseudoElements&&a(i.target.parentNode),i.type==="attributes"&&i1(i.target)&&~O3.indexOf(i.attributeName))if(i.attributeName==="class"&&S4(i.target)){let{prefix:m,iconName:r}=o2(O2(i.target));i.target.setAttribute(B2,m||o),r&&i.target.setAttribute(R2,r)}else w4(i.target)&&s(i.target)})}),v&&s2.observe(e,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function P4(){s2&&s2.disconnect()}function T4(l){let c=l.getAttribute("style"),s=[];return c&&(s=c.split(";").reduce((a,e)=>{let n=e.split(":"),o=n[0],i=n.slice(1);return o&&i.length>0&&(a[o]=i.join(":").trim()),a},{})),s}function E4(l){let c=l.getAttribute("data-prefix"),s=l.getAttribute("data-icon"),a=l.innerText!==void 0?l.innerText.trim():"",e=o2(O2(l));return e.prefix||(e.prefix=E()),c&&s&&(e.prefix=c,e.iconName=s),e.iconName&&e.prefix||(e.prefix&&a.length>0&&(e.iconName=e4(e.prefix,l.innerText)||U2(e.prefix,S2(l.innerText))),!e.iconName&&f.autoFetchSvg&&l.firstChild&&l.firstChild.nodeType===Node.TEXT_NODE&&(e.iconName=l.firstChild.data)),e}function F4(l){let c=W(l.attributes).reduce((e,n)=>(e.name!=="class"&&e.name!=="style"&&(e[n.name]=n.value),e),{}),s=l.getAttribute("title"),a=l.getAttribute("data-fa-title-id");return f.autoA11y&&(s?c["aria-labelledby"]="".concat(f.replacementClass,"-title-").concat(a||$()):(c["aria-hidden"]="true",c.focusable="false")),c}function D4(){return{iconName:null,title:null,titleId:null,prefix:null,transform:b,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function r1(l){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},{iconName:s,prefix:a,rest:e}=E4(l),n=F4(l),o=y2("parseNodeAttributes",{},l),i=c.styleParser?T4(l):[];return t({iconName:s,title:l.getAttribute("title"),titleId:l.getAttribute("data-fa-title-id"),prefix:a,transform:b,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:e,styles:i,attributes:n}},o)}var{styles:B4}=S;function Q1(l){let c=f.autoReplaceSvg==="nest"?r1(l,{styleParser:!1}):r1(l);return~c.extra.classes.indexOf(T1)?F("generateLayersText",l,c):F("generateSvgReplacementMutation",l,c)}function R4(){return[...C3,...u2]}function m1(l){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!v)return Promise.resolve();let s=p.documentElement.classList,a=z=>s.add("".concat(J2,"-").concat(z)),e=z=>s.remove("".concat(J2,"-").concat(z)),n=f.autoFetchSvg?R4():S1.concat(Object.keys(B4));n.includes("fa")||n.push("fa");let o=[".".concat(T1,":not([").concat(R,"])")].concat(n.map(z=>".".concat(z,":not([").concat(R,"])"))).join(", ");if(o.length===0)return Promise.resolve();let i=[];try{i=W(l.querySelectorAll(o))}catch{}if(i.length>0)a("pending"),e("complete");else return Promise.resolve();let m=W2.begin("onTree"),r=i.reduce((z,M)=>{try{let L=Q1(M);L&&z.push(L)}catch(L){v1||L.name==="MissingIcon"&&console.error(L)}return z},[]);return new Promise((z,M)=>{Promise.all(r).then(L=>{Y1(L,()=>{a("active"),a("complete"),e("pending"),typeof c=="function"&&c(),m(),z()})}).catch(L=>{m(),M(L)})})}function H4(l){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Q1(l).then(s=>{s&&Y1([s],c)})}function O4(l){return function(c){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=(c||{}).icon?c:A2(c||{}),{mask:e}=s;return e&&(e=(e||{}).icon?e:A2(e||{})),l(a,t(t({},s),{},{mask:e}))}}var q4=function(l){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},{transform:s=b,symbol:a=!1,mask:e=null,maskId:n=null,title:o=null,titleId:i=null,classes:m=[],attributes:r={},styles:z={}}=c;if(!l)return;let{prefix:M,iconName:L,icon:C}=l;return i2(t({type:"icon"},l),()=>(H("beforeDOMElementCreation",{iconDefinition:l,params:c}),f.autoA11y&&(o?r["aria-labelledby"]="".concat(f.replacementClass,"-title-").concat(i||$()):(r["aria-hidden"]="true",r.focusable="false")),_2({icons:{main:v2(C),mask:e?v2(e.icon):{found:!1,width:null,height:null,icon:{}}},prefix:M,iconName:L,transform:t(t({},b),s),symbol:a,title:o,maskId:n,titleId:i,extra:{attributes:r,styles:z,classes:m}})))},I4={mixout(){return{icon:O4(q4)}},hooks(){return{mutationObserverCallbacks(l){return l.treeCallback=m1,l.nodeCallback=H4,l}}},provides(l){l.i2svg=function(c){let{node:s=p,callback:a=()=>{}}=c;return m1(s,a)},l.generateSvgReplacementMutation=function(c,s){let{iconName:a,title:e,titleId:n,prefix:o,transform:i,symbol:m,mask:r,maskId:z,extra:M}=s;return new Promise((L,C)=>{Promise.all([P2(a,o),r.iconName?P2(r.iconName,r.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(g=>{let[D,x]=g;L([c,_2({icons:{main:D,mask:x},prefix:o,iconName:a,transform:i,symbol:m,maskId:z,title:e,titleId:n,extra:M,watchable:!0})])}).catch(C)})},l.generateAbstractIcon=function(c){let{children:s,attributes:a,main:e,transform:n,styles:o}=c,i=e2(o);i.length>0&&(a.style=i);let m;return q2(n)&&(m=F("generateAbstractTransformGrouping",{main:e,transform:n,containerWidth:e.width,iconWidth:e.width})),s.push(m||e.icon),{children:s,attributes:a}}}},U4={mixout(){return{layer(l){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},{classes:s=[]}=c;return i2({type:"layer"},()=>{H("beforeDOMElementCreation",{assembler:l,params:c});let a=[];return l(e=>{Array.isArray(e)?e.map(n=>{a=a.concat(n.abstract)}):a=a.concat(e.abstract)}),[{tag:"span",attributes:{class:["".concat(f.cssPrefix,"-layers"),...s].join(" ")},children:a}]})}}}},_4={mixout(){return{counter(l){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},{title:s=null,classes:a=[],attributes:e={},styles:n={}}=c;return i2({type:"counter",content:l},()=>(H("beforeDOMElementCreation",{content:l,params:c}),g4({content:l.toString(),title:s,extra:{attributes:e,styles:n,classes:["".concat(f.cssPrefix,"-layers-counter"),...a]}})))}}}},W4={mixout(){return{text(l){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},{transform:s=b,title:a=null,classes:e=[],attributes:n={},styles:o={}}=c;return i2({type:"text",content:l},()=>(H("beforeDOMElementCreation",{content:l,params:c}),n1({content:l,transform:t(t({},b),s),title:a,extra:{attributes:n,styles:o,classes:["".concat(f.cssPrefix,"-layers-text"),...e]}})))}}},provides(l){l.generateLayersText=function(c,s){let{title:a,transform:e,extra:n}=s,o=null,i=null;if(N1){let m=parseInt(getComputedStyle(c).fontSize,10),r=c.getBoundingClientRect();o=r.width/m,i=r.height/m}return f.autoA11y&&!a&&(n.attributes["aria-hidden"]="true"),Promise.resolve([c,n1({content:c.innerHTML,width:o,height:i,transform:e,title:a,extra:n,watchable:!0})])}}},G4=new RegExp('"',"ug"),z1=[1105920,1112319],L1=t(t(t(t({},{FontAwesome:{normal:"fas",400:"fas"}}),L3),P3),b3),F2=Object.keys(L1).reduce((l,c)=>(l[c.toLowerCase()]=L1[c],l),{}),j4=Object.keys(F2).reduce((l,c)=>{let s=F2[c];return l[c]=s[900]||[...Object.entries(s)][0][1],l},{});function V4(l){let c=l.replace(G4,""),s=Z3(c,0),a=s>=z1[0]&&s<=z1[1],e=c.length===2?c[0]===c[1]:!1;return{value:S2(e?c[0]:c),isSecondary:a||e}}function $4(l,c){let s=l.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(c),e=isNaN(a)?"normal":a;return(F2[s]||{})[e]||j4[s]}function M1(l,c){let s="".concat(T3).concat(c.replace(":","-"));return new Promise((a,e)=>{if(l.getAttribute(s)!==null)return a();let o=W(l.children).filter(L=>L.getAttribute(g2)===c)[0],i=T.getComputedStyle(l,c),m=i.getPropertyValue("font-family"),r=m.match(R3),z=i.getPropertyValue("font-weight"),M=i.getPropertyValue("content");if(o&&!r)return l.removeChild(o),a();if(r&&M!=="none"&&M!==""){let L=i.getPropertyValue("content"),C=$4(m,z),{value:g,isSecondary:D}=V4(L),x=r[0].startsWith("FontAwesome"),w=U2(C,g),u=w;if(x){let N=n4(g);N.iconName&&N.prefix&&(w=N.iconName,C=N.prefix)}if(w&&!D&&(!o||o.getAttribute(B2)!==C||o.getAttribute(R2)!==u)){l.setAttribute(s,u),o&&l.removeChild(o);let N=D4(),{extra:O}=N;O.attributes[g2]=c,P2(w,C).then(q=>{let l3=_2(t(t({},N),{},{icons:{main:q,mask:j1()},prefix:C,iconName:u,extra:O,watchable:!0})),f2=p.createElementNS("http://www.w3.org/2000/svg","svg");c==="::before"?l.insertBefore(f2,l.firstChild):l.appendChild(f2),f2.outerHTML=l3.map(s3=>K(s3)).join(`
`),l.removeAttribute(s),a()}).catch(e)}else a()}else a()})}function X4(l){return Promise.all([M1(l,"::before"),M1(l,"::after")])}function Y4(l){return l.parentNode!==document.head&&!~F3.indexOf(l.tagName.toUpperCase())&&!l.getAttribute(g2)&&(!l.parentNode||l.parentNode.tagName!=="svg")}function p1(l){if(v)return new Promise((c,s)=>{let a=W(l.querySelectorAll("*")).filter(Y4).map(X4),e=W2.begin("searchPseudoElements");K1(),Promise.all(a).then(()=>{e(),E2(),c()}).catch(()=>{e(),E2(),s()})})}var K4={hooks(){return{mutationObserverCallbacks(l){return l.pseudoElementsCallback=p1,l}}},provides(l){l.pseudoElements2svg=function(c){let{node:s=p}=c;f.searchPseudoElements&&p1(s)}}},C1=!1,Q4={mixout(){return{dom:{unwatch(){K1(),C1=!0}}}},hooks(){return{bootstrap(){f1(y2("mutationObserverCallbacks",{}))},noAuto(){P4()},watch(l){let{observeMutationsRoot:c}=l;C1?E2():f1(y2("mutationObserverCallbacks",{observeMutationsRoot:c}))}}}},d1=l=>{let c={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return l.toLowerCase().split(" ").reduce((s,a)=>{let e=a.toLowerCase().split("-"),n=e[0],o=e.slice(1).join("-");if(n&&o==="h")return s.flipX=!0,s;if(n&&o==="v")return s.flipY=!0,s;if(o=parseFloat(o),isNaN(o))return s;switch(n){case"grow":s.size=s.size+o;break;case"shrink":s.size=s.size-o;break;case"left":s.x=s.x-o;break;case"right":s.x=s.x+o;break;case"up":s.y=s.y-o;break;case"down":s.y=s.y+o;break;case"rotate":s.rotate=s.rotate+o;break}return s},c)},J4={mixout(){return{parse:{transform:l=>d1(l)}}},hooks(){return{parseNodeAttributes(l,c){let s=c.getAttribute("data-fa-transform");return s&&(l.transform=d1(s)),l}}},provides(l){l.generateAbstractTransformGrouping=function(c){let{main:s,transform:a,containerWidth:e,iconWidth:n}=c,o={transform:"translate(".concat(e/2," 256)")},i="translate(".concat(a.x*32,", ").concat(a.y*32,") "),m="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),r="rotate(".concat(a.rotate," 0 0)"),z={transform:"".concat(i," ").concat(m," ").concat(r)},M={transform:"translate(".concat(n/2*-1," -256)")},L={outer:o,inner:z,path:M};return{tag:"g",attributes:t({},L.outer),children:[{tag:"g",attributes:t({},L.inner),children:[{tag:s.icon.tag,children:s.icon.children,attributes:t(t({},s.icon.attributes),L.path)}]}]}}}},C2={x:0,y:0,width:"100%",height:"100%"};function u1(l){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return l.attributes&&(l.attributes.fill||c)&&(l.attributes.fill="black"),l}function Z4(l){return l.tag==="g"?l.children:[l]}var c0={hooks(){return{parseNodeAttributes(l,c){let s=c.getAttribute("data-fa-mask"),a=s?o2(s.split(" ").map(e=>e.trim())):j1();return a.prefix||(a.prefix=E()),l.mask=a,l.maskId=c.getAttribute("data-fa-mask-id"),l}}},provides(l){l.generateAbstractMask=function(c){let{children:s,attributes:a,main:e,mask:n,maskId:o,transform:i}=c,{width:m,icon:r}=e,{width:z,icon:M}=n,L=V3({transform:i,containerWidth:z,iconWidth:m}),C={tag:"rect",attributes:t(t({},C2),{},{fill:"white"})},g=r.children?{children:r.children.map(u1)}:{},D={tag:"g",attributes:t({},L.inner),children:[u1(t({tag:r.tag,attributes:t(t({},r.attributes),L.path)},g))]},x={tag:"g",attributes:t({},L.outer),children:[D]},w="mask-".concat(o||$()),u="clip-".concat(o||$()),N={tag:"mask",attributes:t(t({},C2),{},{id:w,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[C,x]},O={tag:"defs",children:[{tag:"clipPath",attributes:{id:u},children:Z4(M)},N]};return s.push(O,{tag:"rect",attributes:t({fill:"currentColor","clip-path":"url(#".concat(u,")"),mask:"url(#".concat(w,")")},C2)}),{children:s,attributes:a}}}},l0={provides(l){let c=!1;T.matchMedia&&(c=T.matchMedia("(prefers-reduced-motion: reduce)").matches),l.missingIconAbstract=function(){let s=[],a={fill:"currentColor"},e={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};s.push({tag:"path",attributes:t(t({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});let n=t(t({},e),{},{attributeName:"opacity"}),o={tag:"circle",attributes:t(t({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return c||o.children.push({tag:"animate",attributes:t(t({},e),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:t(t({},n),{},{values:"1;0;1;1;0;1;"})}),s.push(o),s.push({tag:"path",attributes:t(t({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:c?[]:[{tag:"animate",attributes:t(t({},n),{},{values:"1;0;0;0;0;1;"})}]}),c||s.push({tag:"path",attributes:t(t({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:t(t({},n),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:s}}}},s0={hooks(){return{parseNodeAttributes(l,c){let s=c.getAttribute("data-fa-symbol"),a=s===null?!1:s===""?!0:s;return l.symbol=a,l}}}},a0=[Y3,I4,U4,_4,W4,K4,Q4,J4,c0,l0,s0];L4(a0,{mixoutsTo:h});var h0=h.noAuto,g0=h.config,x0=h.library,N0=h.dom,b0=h.parse,S0=h.findIconDefinition,w0=h.toHtml,t2=h.icon,k0=h.layer,y0=h.text,A0=h.counter;var J1={prefix:"fas",iconName:"sun",icon:[512,512,[9728],"f185","M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"]};var Z1={prefix:"fas",iconName:"moon",icon:[384,512,[127769,9214],"f186","M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"]};var c3={prefix:"fas",iconName:"desktop",icon:[576,512,[128421,61704,"desktop-alt"],"f390","M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z"]};var j2=class extends k{#c={brand:{src:"https://customerjourney.ninja/assets/images/cj-js.png"},theme:{text:{es:"Tema",en:"Theme",fr:"Th\xE8me"}},themeValues:{light:{text:{es:"Claro",en:"Light",fr:"Clair"}},dark:{text:{es:"Oscuro",en:"Dark",fr:"Sombre"}},system:{text:{es:"Sistema",en:"System",fr:"Syst\xE8me"}}}};#l=t2(J1,{classes:["fa-1x","has-text-warning"]}).html[0];#s=t2(Z1,{classes:["fa-1x","has-text-grey-light"]}).html[0];#a=t2(c3,{classes:["fa-1x","has-text-info"]}).html[0];constructor(c={}){super(),this.state=this.initState(this.#c,c),this.getAttribute("id")||this.setAttribute("id",this.state.id||`header-${Math.floor(Math.random()*100)}`),this.setAttribute("i18n",this.state.context?.lang),this.setAttribute("theme",this.state.context?.theme)}handleEvent(c){if(c.type==="click"){let s="";switch(c.currentTarget.id){case"themes":document.getElementById(c.currentTarget.id).parentNode.classList.toggle("is-active");break;case"light-theme":document.getElementById("themes").parentNode.classList.toggle("is-active"),s="light";break;case"dark-theme":document.getElementById("themes").parentNode.classList.toggle("is-active"),document.documentElement.classList.add("cc--darkmode"),s="dark";break;case"system-theme":document.getElementById("themes").parentNode.classList.toggle("is-active"),s="system";break;default:let e=new CustomEvent("user:select-lang",{detail:c.target.id.slice(4),bubbles:!0,composed:!0});this.dispatchEvent(e);break}if(s!==""){let a=new CustomEvent("user:select-theme",{detail:s,bubbles:!0,composed:!0});this.dispatchEvent(a)}}}#e(){let c="";return Object.entries(this.state.i18n.lang).forEach(([s,a])=>{let e=["button"];s===this.state.context.lang&&e.push("is-focused"),c+=`<button id="btn-${s}" ${this.getClasses(e,this.state.i18n?.classList)}">${a}</button>`}),c}addEvents(){document.querySelector("#themes").addEventListener("click",this),document.querySelector("#light-theme").addEventListener("click",this),document.querySelector("#dark-theme").addEventListener("click",this),document.querySelector("#system-theme").addEventListener("click",this),this.state.i18n?.lang!=null&&Object.entries(this.state.i18n.lang).forEach(([n,o])=>{this.querySelector(`#btn-${n}`).addEventListener("click",this)})}#n(){switch(this.state.context?.theme){case"light":return document.documentElement.setAttribute("data-theme","light"),this.#l;break;case"dark":return document.documentElement.setAttribute("data-theme","dark"),this.#s;break;default:return document.documentElement.removeAttribute("data-theme"),this.#a;break}}render(){this.innerHTML=`
            <header>
            <nav ${this.getClasses(["navbar"],this.state.classList)} role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                <img class="navbar-item"  src="${this.state.context?.theme==="light"?this.state.brand?.src:this.state.brand?.srcDark===void 0?this.state.brand?.src:this.state.brand?.srcDark}" width="160" height="40">
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
                        ${this.state.theme?.text[this.state.context?.lang]} ${this.#n()}
                    </a>
                    <div class="navbar-dropdown">                   
                        <a id="light-theme" class="navbar-item">
                            ${this.#l} ${this.state.themeValues.light.text[this.state.context?.lang]}
                        </a>
                        <a id="dark-theme" class="navbar-item">
                            ${this.#s} ${this.state.themeValues.dark.text[this.state.context?.lang]}
                        </a>
                        <a id="system-theme" class="navbar-item">
                            ${this.#a} ${this.state.themeValues.system.text[this.state.context?.lang]}
                        </a>
                    </div>
                </div>
                </div>
                ${this.state.i18n===void 0?"":`
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons are-small">
                            ${this.#e()}
                        </div>
                    </div>
                </div>
                `}
                </div>
            </nav>
        </header>
        `,this.addEvents();let c=this.querySelector(".navbar-burger"),s=this.querySelector(".navbar-menu");c.addEventListener("click",()=>{c.classList.toggle("is-active"),s.classList.toggle("is-active")})}};customElements.define("page-header",j2);function B0(l){let c=document.createElement("script");c.innerHTML=`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${l}');
    fbq('track', 'PageView');
    `,document.head.appendChild(c);let s=document.createElement("noscript");s.innerHTML=`
    <img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=${l}&ev=PageView&noscript=1"/>
    `,document.head.appendChild(s)}function H0(l){let c=document.createElement("script");c.async=!0,c.src=`https://www.googletagmanager.com/gtag/js?id=${l}`;let s=document.createElement("script");s.innerHTML=`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());    
      gtag('config', '${l}');
    `,document.head.appendChild(c),document.head.appendChild(s)}function q0(l){var c=document.createElement("script");c.textContent=JSON.stringify(l),c.type="application/ld+json",document.head.appendChild(c)}function U0(l){let c=document.createElement("script");c.innerHTML=`
    _linkedin_partner_id = "${l}";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(_linkedin_partner_id)`,document.head.appendChild(c);let s=document.createElement("script");s.innerHTML=`
    (function(l) {
        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
        window.lintrk.q=[]}
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);})(window.lintrk);
    `,document.head.appendChild(s);let a=document.createElement("noscript");a.innerHTML=`
    <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=${l}=gif" />
    `,document.head.appendChild(a)}function W0(l){let c=document.createElement("script");c.innerHTML=`
    !function(e){if(!window.pintrk){window.pintrk = function () {
    window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
      n=window.pintrk;n.queue=[],n.version="3.0";var
      t=document.createElement("script");t.async=!0,t.src=e;var
      r=document.getElementsByTagName("script")[0];
      r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
    pintrk('load', '${l}', {em: '<user_email_address>'});
    pintrk('page');
    `,document.head.appendChild(c);let s=document.createElement("noscript");s.innerHTML=`
    <img height="1" width="1" style="display:none;" alt=""
      src="https://ct.pinterest.com/v3/?event=init&tid=${l}&pd[em]=<hashed_email_address>&noscript=1" />
    `,document.head.appendChild(s)}function j0(l){let c=document.getElementsByTagName("head")[0];if(l.hasOwnProperty("card")){let s=document.createElement("meta");s.name="twitter:card",s.content=l.card,c.appendChild(s)}if(l.hasOwnProperty("site")){let s=document.createElement("meta");s.name="twitter:site",s.content=l.site,c.appendChild(s)}if(l.hasOwnProperty("creator")){let s=document.createElement("meta");s.name="twitter:creator",s.content=l.creator,c.appendChild(s)}if(l.hasOwnProperty("title")){let s=document.createElement("meta");s.name="twitter:title",s.content=l.title,c.appendChild(s)}if(l.hasOwnProperty("description")){let s=document.createElement("meta");s.name="twitter:description",s.content=l.description,c.appendChild(s)}if(l.hasOwnProperty("image")){let s=document.createElement("meta");s.name="twitter:image",s.content=l.image,c.appendChild(s)}}})();
/*! Bundled license information:

@fortawesome/fontawesome-svg-core/index.mjs:
  (*!
   * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
   * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
   * Copyright 2024 Fonticons, Inc.
   *)

@fortawesome/free-solid-svg-icons/index.mjs:
  (*!
   * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
   * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
   * Copyright 2024 Fonticons, Inc.
   *)
*/
