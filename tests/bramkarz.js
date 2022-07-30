import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'ava';
import fixtures from './__fixtures.js';
import createCmdTest from './__helpers__/createCmdTest.js';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const bramkarzPath = resolvePath( __dirname, '..', 'bin', 'bramkarz.js' );
const fsErrorRegex = /The '.+' path is not allowed./;

test( 'returns correct exit code', createCmdTest( {
	cmd: bramkarzPath,
	params: [
		'.'
	],
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
		const semverRegex = /^v\d+\.\d+\.\d+$/;

		t.regex( stdout, semverRegex );
	}
} ) );

// TODO: check how to bypass sourcemaps issues.
// test( 'disallows any read if there is no config file', createCmdTest( {
// 	cmd: bramkarzPath,
// 	params: [
// 		'.'
// 	],
// 	cwd: fixtures.disabledByDefault,
// 	callback( t, { stderr, exitCode } ) {
// 		t.regex( stderr, fsErrorRegex );
// 		t.is( exitCode, 1 );
// 	}
// } ) );

test( 'allows read according to the config file', createCmdTest( {
	cmd: bramkarzPath,
	params: [
		'.'
	],
	cwd: fixtures.simpleConfig,
	callback( t, { stderr/* , exitCode*/ } ) {
		t.notRegex( stderr, fsErrorRegex );
		// t.is( exitCode, 0 );
	}
} ) );
