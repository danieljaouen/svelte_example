const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");

const args = process.argv.slice(2);
const watch = args.includes("--watch");
const deploy = args.includes("--deploy");

const loader = {
}

const plugins = [sveltePlugin()]

let opts = {
  entryPoints: ["./js/app.js"],
  bundle: true,
  target: "es2018",
  outdir: "../priv/static/js",
  logLevel: "info",
  mainFields: ["svelte", "browser", "module", "main"],
  format: "esm",
  splitting: true,
  loader,
  plugins,
}

if (watch) {
  opts = {
    ...opts,
    sourcemap: 'inline',
  }
}

if (deploy) {
  opts = {
    ...opts,
    minify: true,
  }
}

//build the application
const promise = esbuild.context(opts).then(context => {
  if (watch) {
    context.watch();
  }
});
