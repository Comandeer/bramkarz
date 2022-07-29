import { resolve as resolvePath } from 'node:path';
import test from 'ava';
import fixtures from './__fixtures.js';
import getConfig from '../src/getConfig.js';
import isEntryPoint from '../src/isEntryPoint.js';
import { pathToFileURL } from 'node:url';

const simpleConfig = await getConfig( fixtures.simpleConfig );
const simpleModuleContext = {};
const withParentURLModuleContext = {
	parentURL: 'file:///path/to/project/index.js'
};

test( 'isEntryPoint() returns true for the correct entrypoint path', ( t ) => {
	const path = resolvePath( fixtures.simpleConfig, 'index.js' );
	const url = pathToFileURL( path );

	t.true( isEntryPoint( url, simpleModuleContext, simpleConfig ) );
} );

test( 'isEntryPoint() returns false for the wrong entrypoint path', ( t ) => {
	const path = resolvePath( fixtures.simpleConfig, 'whatever.js' );
	const url = pathToFileURL( path );

	t.false( isEntryPoint( url, simpleModuleContext, simpleConfig ) );
} );

test( 'isEntryPoint() returns true for any path if the config is empty and there is no parent module', ( t ) => {
	const path = resolvePath( fixtures.disabledByDefault, 'whatever.js' );
	const url = pathToFileURL( path );

	t.true( isEntryPoint( url, simpleModuleContext, {} ) );
} );

test( 'isEntryPoint() returns false for any path if the config is empty and there is a parent module', ( t ) => {
	const path = resolvePath( fixtures.disabledByDefault, 'whatever.js' );
	const url = pathToFileURL( path );

	t.false( isEntryPoint( url, withParentURLModuleContext, {} ) );
} );
