/**
 * Create the Pinterest pixel script and add it to the head
 * 
 * @param {*} tagId - Pinterest Tag Id
 */
export function withPinterestTag(tagId){
    let script = document.createElement('script');
    script.innerHTML = `
    !function(e){if(!window.pintrk){window.pintrk = function () {
    window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
      n=window.pintrk;n.queue=[],n.version="3.0";var
      t=document.createElement("script");t.async=!0,t.src=e;var
      r=document.getElementsByTagName("script")[0];
      r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
    pintrk('load', '${tagId}', {em: '<user_email_address>'});
    pintrk('page');
    `
    document.head.appendChild(script);
    let noScript = document.createElement('noscript');
    noScript.innerHTML = `
    <img height="1" width="1" style="display:none;" alt=""
      src="https://ct.pinterest.com/v3/?event=init&tid=${tagId}&pd[em]=<hashed_email_address>&noscript=1" />
    `
    document.head.appendChild(noScript);
  }