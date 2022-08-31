import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';

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
      image(),
      json(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss(),
    ],
  },
];
