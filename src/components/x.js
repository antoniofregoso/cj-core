
/**
 * Generate the x cards in the head of the page
 +
 * @param {Object} props - Properties to generate the x cards in the head of the page.
 */
export function withXCard(props){
    const head = document.getElementsByTagName('head')[0];
      if (props.hasOwnProperty('card')){
        let meta = document.createElement('meta');
        meta.name = "twitter:card";
        meta.content = props.card;
        head.appendChild(meta);
      }
      if (props.hasOwnProperty('site')){
        let meta = document.createElement('meta');
        meta.name = "twitter:site";
        meta.content = props.site;
        head.appendChild(meta);
      }
      if (props.hasOwnProperty('creator')){
        let meta = document.createElement('meta');
        meta.name = "twitter:creator";
        meta.content = props.creator;
        head.appendChild(meta);
      }
      if (props.hasOwnProperty('title')){
        let meta = document.createElement('meta');
        meta.name = "twitter:title";
        meta.content = props.title;
        head.appendChild(meta);
      }
      if (props.hasOwnProperty('description')){
        let meta = document.createElement('meta');
        meta.name = "twitter:description";
        meta.content = props.description;
        head.appendChild(meta);
      }
      if (props.hasOwnProperty('image')){
        let meta = document.createElement('meta');
        meta.name = "twitter:image";
        meta.content = props.image;
        head.appendChild(meta);
      }     
  
  }
  
