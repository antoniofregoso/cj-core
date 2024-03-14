export function withGoogleAnalytics(tagId){
    let script = document.createElement('script');
    script.async = true;
    script.src =`https://www.googletagmanager.com/gtag/js?id=${tagId}`;
    let script2 =  document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());    
      gtag('config', '${tagId}');
    `
    document.head.appendChild(script);
    document.head.appendChild(script2);
}