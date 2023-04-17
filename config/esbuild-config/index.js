const config = ({
  entryPoints = ['./src/index.ts'],
  outdir = 'dist',
  tsconfig = 'tsconfig.json',
}) => ({
  entryPoints,
  outdir,
  tsconfig,
  target: 'esnext',
  bundle: true,
  sourcemap: true,
});

module.exports = config;
