/* eslint-disable no-console */

import { readFile } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';
import { resolve as resolvePath } from 'node:path';
import { cwd as processCwd } from 'node:process';
import { minify } from 'terser';

console.log( 'Preparing preamble…' );

const cwd = processCwd();
const fileName = 'bramkarzPreamble.js';
const srcPath = resolvePath( cwd, 'src', fileName );
const destPath = resolvePath( cwd, 'dist', fileName );
const preamble = await readFile( srcPath, 'utf8' );
const { code: minifiedPreamble } = await minify( preamble, {
	module: true
} );

await writeFile( destPath, minifiedPreamble );

console.log( 'Preamble prepared.' );
