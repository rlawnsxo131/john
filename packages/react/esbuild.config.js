const { context, build } = require('esbuild');
const config = require('@john/esbuild-config');
const pkg = require('./package.json');

const watch = process.argv.includes('--watch');
const minify = !watch;

const external = Object.keys({
  ...pkg.peerDependencies,
});

config({
  tsconfig: './tsconfig.build.json',
  external,
  minify,
})
  .then(({ cjs, esm }) =>
    watch
      ? Promise.all([
          context({
            ...cjs,
          }),
          context({
            ...esm,
          }),
        ]).then((contexts) => Promise.all(contexts.map((ctx) => ctx.watch())))
      : Promise.all([
          build({
            ...cjs,
          }),
          build({
            ...esm,
          }),
        ]),
  )
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
