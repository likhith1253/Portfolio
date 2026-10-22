import { renderToString } from "react-dom/server";
import App from "./App";
import * as data from "./data/site";

// Used only at build time by scripts/prerender.mjs.
export function render() {
  return renderToString(<App />);
}

export { data };
