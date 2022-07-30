import fs from 'node:fs/promises';
import test from 'ava';
import fixtures from './__fixtures.js';
import overrideFS from '../src/overrideFS.js';
import getConfig from '../src/getConfig.js';

const simpleConfig = await getConfig( fixtures.simpleConfig );
const simpleConfigFilePath = simpleConfig.__filePath__;
let restore;

test.afterEach( () => {
	if ( restore ) {
		restore();
	}
} );

test.serial( 'overrideFS() returns function to restore original fs', ( t ) => {
	restore = overrideFS( {} );

	t.is( typeof restore, 'function' );
} );

test.serial( 'overrideFS() overrides fs.readFile()', async ( t ) => {
	restore = overrideFS( {} );

	await t.throwsAsync( async () => {
		return fs.readFile( '/whatever' );
	}, {
		message: 'The \'/whatever\' path is not allowed.'
	} );
} );

test.serial( 'overrideFS() allows reading files', async ( t ) => {
	restore = overrideFS( {
		__filePath__: simpleConfigFilePath,
		allowedPaths: [
			'../*.md'
		]
	} );

	const expectedFileContent = 'hublabubla\n';
	const fileContent = await fs.readFile( fixtures.testMd, 'utf8' );

	t.is( fileContent, expectedFileContent );
} );
