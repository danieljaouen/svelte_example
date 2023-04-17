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
    watch,
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
const promise = esbuild.build(opts);

if (watch) {
  promise.then((_result) => {
    process.stdin.on('close', () => {
      process.exit(0);
    })

    process.stdin.resume();
  });
}
