import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'ava';
import createCmdTest from './__helpers__/createCmdTest.js';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const bramkarzPath = resolvePath( __dirname, '..', 'bin', 'bramkarz.js' );
const fixtureDirPath = resolvePath( __dirname, '__fixtures__' );
const disabledByDefaultFixturePath = resolvePath( fixtureDirPath, 'disabledByDefault' );

test( 'returns correct exit code', createCmdTest( {
	cmd: bramkarzPath,
	cwd: disabledByDefaultFixturePath,
	callback( t, { exitCode } ) {
		t.is( exitCode, 1 );
	}
} ) );

test( 'passes arguments alongside', createCmdTest( {
	cmd: bramkarzPath,
	params: [
		'--version'
	],
	cwd: disabledByDefaultFixturePath,
	callback( t, { stdout } ) {
		const semverRegex = /^\d+\.\d+\.\d+$/;

		t.regex( stdout, semverRegex );
	}
} ) );
