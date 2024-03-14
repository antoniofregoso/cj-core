export function withSchema(schema){
    var script = document.createElement("script");
    script.textContent = JSON.stringify(schema);
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }