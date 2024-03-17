/**
 * Create the Schema.org script and add it to the head
 * 
 * @param {Object} schema - Schema.org encoded as JSON-LD
 */
export function withSchema(schema){
    var script = document.createElement("script");
    script.textContent = JSON.stringify(schema);
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }