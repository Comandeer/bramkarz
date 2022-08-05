#!/usr/bin/env node

import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';
import { execa } from 'execa';
import { hideBin } from 'yargs/helpers';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const loaderPath = resolvePath( __dirname, 'loader.js' );
const loaderURL = pathToFileURL( loaderPath );

const cwd = process.cwd();
const argv = hideBin( process.argv );

( async function() {
	const { exitCode } = await execa( 'node', [
		'--experimental-loader',
		loaderURL,
		...argv
	], {
		cwd,
		stdio: 'inherit',
		extendEnv: true,
		reject: false,
		preferLocal: true,
		localDir: __dirname
	} );

	process.exit( typeof exitCode === 'number' ? exitCode : 1 );
}() );
