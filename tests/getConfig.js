import test from 'ava';
import fixtures from './__fixtures.js';
import getConfig from '../src/getConfig.js';

const expectedSimpleConfig = {
	allowedPaths: [
		'*.txt'
	]
};

test( 'getConfig() returns config from the nearest .bramkarzrc.json file', async ( t ) => {
	const config = await getConfig( fixtures.simpleConfig );

	// We do not need file path metadata in the config, so we remove it.
	delete config.__filePath__;

	t.deepEqual( config, expectedSimpleConfig );
} );

test( 'getConfig() returns empty object if no .bramkarzrc.json file is found', async ( t ) => {
	const config = await getConfig( fixtures.disabledByDefault );

	t.deepEqual( config, {} );
} );
