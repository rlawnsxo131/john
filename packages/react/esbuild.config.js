const { context } = require('esbuild');
const pkg = require('./package.json');

const watch = process.argv.includes('--watch');
const minify = !watch;

const external = Object.keys({
  ...pkg.peerDependencies,
});

const commonConfig = {
  entryPoints: ['./src/index.ts'],
  outdir: 'dist',
  target: 'esnext',
  bundle: true,
  tsconfig: 'tsconfig.build.json',
  external: [...external],
  sourcemap: true,
  minify,
};

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
  .then(([cjsCtx, esmCtx]) => Promise.all([cjsCtx.watch(), esmCtx.watch()]))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
