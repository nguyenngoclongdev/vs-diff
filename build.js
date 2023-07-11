/* eslint-disable @typescript-eslint/naming-convention */
const { build } = require('esbuild');
const { Generator } = require('npm-dts');
const { dependencies: pkgDependencies, peerDependencies: pkgPeerDependencies } = require('./package.json');
const fs = require("fs");

const dependencies = pkgDependencies || {};
const peerDependencies = pkgPeerDependencies || {};

const isDev = process.env.NODE_ENV !== 'production';

const sharedConfig = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: isDev,
    external: Object.keys(dependencies).concat(Object.keys(peerDependencies))
};

build({
    ...sharedConfig,
    platform: 'node', // for CJS
    outfile: 'dist/index.js'
});

build({
    ...sharedConfig,
    outfile: 'dist/index.esm.js',
    platform: 'neutral', // for ESM
    format: 'esm'
});

fs.copyFileSync("index.d.ts", "dist/index.d.ts");
// new Generator({
//     entry: 'src/index.ts',
//     output: 'dist/index.d.ts'
// }).generate();
