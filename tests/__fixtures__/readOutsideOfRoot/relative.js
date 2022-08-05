import fs, { readFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const testFilePath = resolvePath( '..', 'test.txt' );

console.log( await readFile( testFilePath, 'utf8' ) );
console.log( await fs.readFile( testFilePath, 'utf8' ) );
