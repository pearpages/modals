import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2022",
  external: ["react", "react-dom"],
  // charset: false, or sass prepends @charset "UTF-8"; to dist/index.css because
  // one loud comment contains a non-ASCII character. A consumer that imports the
  // sheet into a cascade layer then has the at-rule inside the layer, which is
  // invalid, and Next's CSS optimiser warns on every build.
  esbuildPlugins: [sassPlugin({ charset: false })],
});
