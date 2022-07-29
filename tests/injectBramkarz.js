import { readFile } from 'node:fs/promises';
import { resolve as resolvePath } from 'node:path';
import test from 'ava';
import fixtures from './__fixtures.js';
import injectBramkarz from '../src/injectBramkarz.js';

const preamblePath = resolvePath( fixtures.__dirname, '..', 'dist', 'bramkarzPreamble.js' );
const preamble = await readFile( preamblePath, 'utf8' );

test( 'injectBramkarz() adds the preamble to the beginning of the provided code', ( t ) => {
	const code = 'hublabubla';
	const expectedCode = `${ preamble }${ code }`;
	const actualCode = injectBramkarz( code );

	t.is( actualCode, expectedCode );
} );
