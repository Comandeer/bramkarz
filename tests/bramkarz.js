import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'ava';
import fixtures from './__fixtures.js';
import createCmdTest from './__helpers__/createCmdTest.js';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const bramkarzPath = resolvePath( __dirname, '..', 'bin', 'bramkarz.js' );

test( 'returns correct exit code', createCmdTest( {
	cmd: bramkarzPath,
	cwd: fixtures.disabledByDefault,
	callback( t, { exitCode } ) {
		t.is( exitCode, 1 );
	}
} ) );

test( 'passes arguments alongside', createCmdTest( {
	cmd: bramkarzPath,
	params: [
		'--version'
	],
	cwd: fixtures.disabledByDefault,
	callback( t, { stdout } ) {
		const semverRegex = /^\d+\.\d+\.\d+$/;

		t.regex( stdout, semverRegex );
	}
} ) );
