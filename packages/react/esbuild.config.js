const { context, build } = require('esbuild');
const config = require('@john/esbuild-config');
const pkg = require('./package.json');

const watch = process.argv.includes('--watch');
const minify = !watch;

const external = Object.keys({
  ...pkg.peerDependencies,
});

const commonConfig = {
  external: [...external],
  minify,
  ...config({
    tsconfig: 'tsconfig.build.json',
  }),
};

if (watch) {
  Promise.all([
    context({
      ...commonConfig,
      format: 'cjs',
    }),
    context({
      ...commonConfig,
      format: 'esm',
      outExtension: {
        '.js': '.mjs',
      },
    }),
  ])
    .then((contexts) => Promise.all(contexts.map((ctx) => ctx.watch())))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
} else {
  Promise.all([
    build({
      ...commonConfig,
      format: 'cjs',
    }),
    build({
      ...commonConfig,
      format: 'cjs',
    }),
  ]).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
