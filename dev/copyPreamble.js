/* eslint-disable no-console */

import { copyFile } from 'node:fs/promises';
import { resolve as resolvePath } from 'node:path';
import { cwd as processCwd } from 'node:process';

console.log( 'Copying preamble…' );

const cwd = processCwd();
const fileName = 'bramkarzPreamble.js';
const srcPath = resolvePath( cwd, 'src', fileName );
const destPath = resolvePath( cwd, 'dist', fileName );

await copyFile( srcPath, destPath );

console.log( 'Preamble copied.' );
