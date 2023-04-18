function config({
  entryPoints = ['./src/index.ts'],
  outdir = 'dist',
  tsconfig = 'tsconfig.json',
  external = [],
  minify = false,
}) {
  return new Promise((resolve) =>
    resolve({
      cjs: {
        entryPoints,
        outdir,
        tsconfig,
        external,
        minify,
        bundle: true,
        sourcemap: true,
        format: 'cjs',
      },
      esm: {
        entryPoints,
        outdir,
        tsconfig,
        external,
        minify,
        bundle: true,
        sourcemap: true,
        format: 'esm',
        outExtension: {
          '.js': '.mjs',
        },
      },
    }),
  );
}

module.exports = config;
