
/**
 * Activate Animate.css animations when scrolling the page
 */
export function whithAnimations(){
    let objs = document.querySelectorAll('[data-animation]')
    let options = { threshold: 0.1}   
    var observerAnimations = new IntersectionObserver(entries=>{
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setupAnimation(entry.target)
                return
            }
            entry.target.classList.forEach(_class => {
                if (_class.startsWith('animate__')){
                    entry.target.classList.remove(_class)
                }
            })
        })
    })
    objs.forEach(obj => {
        observerAnimations.observe(obj);
    })
}

/**
 * 
 * @param {string} el - The ID of the element for which the animation is enabled
 */
function setupAnimation(el){
    el.classList.add("animate__animated", `animate__${el.getAttribute('data-animation')}`);
    if (el.hasAttribute('data-delay')){
        el.classList.add(`animate__delay-${el.getAttribute('data-delay')}`);
    }
    if (el.hasAttribute('data-speed')){
        el.classList.add(`animate__${el.getAttribute('data-speed')}`);
    }
    if (el.hasAttribute('data-repeat')){
        el.getAttribute('data-repeat') === "infinite"?el.classList.add("animate__infinite"):el.classList.add(`animate__repeat-${el.getAttribute('data-repeat')}`);
    }
}

/**
 * Gets the browser language with a length of 2 characters
 * @returns {string}
 */
export function getLang(){
    if (navigator.languages != undefined) 
      return navigator.languages[0].substring(0,2)
    return navigator.language.substring(0,2)
}

/**
 * 
 * @param {object} props 
 *  @param {string}  [props.color='is-white'] - options: is-black, is-light, is-dark, .
 *  @param {string}  [props.direction='is-top-to-bottom'] - "is-bottom-to-top", "is-right-to-left", "is-left-to-right, is-primary, is-link, is-info, is-success, is-warning, is-danger"
 *  @param {string}  [props.message='Loading...'] - The message presented in the Page Loader
 */
export function loading(props){
    if (props === undefined) {props={}}
    let directions = ["is-bottom-to-top", "is-right-to-left", "is-left-to-right"];
    let dir = directions.find(el=>el==props.direction)
    document.body.innerHTML += `<div class="pageloader ${props?.color!=undefined?props.color:`is-light`} ${dir!=undefined?dir:''} is-active"><span class="title">${props.message!=undefined?props.message:'Loading...'}</span></div>`;
}

