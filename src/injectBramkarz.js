import { readFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const preamblePath = resolvePath( __dirname, 'bramkarzPreamble.js' );
const preamble = await readFile( preamblePath, 'utf8' );

function injectBramkarz( code ) {
	return `${ preamble }${ code }`;
}

export default injectBramkarz;
