// Smoke test: imports the *built* dist (what actually gets published) and
// mounts each component in a jsdom document. Catches broken exports,
// malformed markup, and thrown exceptions - not full behavioral coverage.
import { test } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const dom = new JSDOM(`<!doctype html><html><body><div id="app"></div></body></html>`, {
  runScripts: "outside-only",
});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.customElements = dom.window.customElements;
globalThis.CustomEvent = dom.window.CustomEvent;

const { AppPage, PageHeader, PageFooter } = await import("../dist/index.js");

const context = { lang: "es", theme: "light" };

test("PageHeader renders a nav and language buttons", () => {
  document.body.innerHTML = "";
  const header = new PageHeader({ context, i18n: { lang: { es: "ES", en: "EN" } } });
  document.body.appendChild(header);
  assert.ok(header.querySelector("nav"), "expected a <nav> inside page-header");
  assert.ok(header.querySelector(".buttons.are-small button"), "expected language buttons to render");
});

test("PageFooter renders brand and content", () => {
  document.body.innerHTML = "";
  const footer = new PageFooter({
    context,
    content: { text: { es: "Contenido del footer" } },
    brand: { name: "CJ.js", url: "https://example.test" },
  });
  document.body.appendChild(footer);
  assert.ok(footer.querySelector("footer"), "expected a <footer> inside page-footer");
  assert.match(footer.textContent, /Contenido del footer/);
});

test("AppPage mounts its template and forwards props to child components", () => {
  document.body.innerHTML = '<div id="app"></div>';
  const template = `<page-header id="header"></page-header><page-footer id="footer"></page-footer>`;
  const data = {
    props: {
      id: "home",
      title: { es: "Titulo" },
      description: { es: "Desc" },
      components: [
        { id: "header", context, i18n: { lang: { es: "ES" } } },
        { id: "footer", context, content: { text: { es: "pie de pagina" } }, brand: { name: "CJ", url: "#" } },
      ],
      events: {},
    },
    context,
  };

  const page = new AppPage(data, template);

  assert.ok(document.querySelector("app-page"), "AppPage should attach itself under #app");
  assert.ok(page.querySelector("page-header"), "template should render page-header");
  assert.match(page.querySelector("page-footer").textContent, /pie de pagina/, "AppPage should forward props to page-footer");
});
