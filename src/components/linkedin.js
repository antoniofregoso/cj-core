/**
 * Create the Linkedin pixel script and add it to the head
 * 
 * @param {String} tagId - LinkedIn  Insight Tag Id
 */
export function withLinkedinInsightTag(tagId){
    let script = document.createElement('script');
    script.innerHTML = `
    _linkedin_partner_id = "${tagId}";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(_linkedin_partner_id)`;
    document.head.appendChild(script);
    let script2 = document.createElement('script');
    script2.innerHTML = `
    (function(l) {
        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
        window.lintrk.q=[]}
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);})(window.lintrk);
    `;
    document.head.appendChild(script2)
    let noScript = document.createElement('noscript');
    noScript.innerHTML = `
    <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=${tagId}=gif" />
    `
    document.head.appendChild(noScript);
}

