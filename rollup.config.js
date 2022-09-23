import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
        entryFileNames: 'cjs/[name].js',
        chunkFileNames: 'cjs/[name]-[hash].js',
      },
      {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
        entryFileNames: 'esm/[name].js',
        chunkFileNames: 'esm/[name]-[hash].js',
      },
    ],
    plugins: [
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss(),
    ],
  },
];
