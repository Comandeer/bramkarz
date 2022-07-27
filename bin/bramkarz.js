#!/usr/bin/env node

import { dirname } from 'path';
import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';
import { execa } from 'execa';
import { hideBin } from 'yargs/helpers';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const esmlmConfigPath = resolvePath( __dirname, '..', '.esmlmrc.js' );

const cwd = process.cwd();
const argv = hideBin( process.argv );

( async function() {
	try {
		const { exitCode } = await execa( 'esmlm', [
			...argv
		], {
			cwd,
			stdio: 'inherit',
			env: {
				ESMLM_CONFIG: esmlmConfigPath
			},
			extendEnv: true,
			reject: false
		} );

		process.exit( exitCode );
	} catch ( err ) {
		process.exit( 1 );
	}
}() );
