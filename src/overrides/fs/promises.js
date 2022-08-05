import * as fs from 'node:fs/promises';
import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { cwd as processCwd } from 'node:process';
import getConfig from '../../getConfig.js';
import micromatch from 'micromatch';

const projectPath = processCwd();
const { allowedPaths = [], __filePath__ } = await getConfig( projectPath );
const configDir = __filePath__ ? dirname( __filePath__ ) : '';

const newFS = { ...fs };

newFS.readFile = newFS.default.readFile = new Proxy( fs.readFile, {
	apply( target, thisArg, argumentsList ) {
		const path = argumentsList[ 0 ];

		if ( !isAllowedPath( path, allowedPaths, configDir ) ) {
			throw new Error( `The '${ path }' path is not allowed.` );
		}

		return Reflect.apply( target, thisArg, argumentsList );
	}
} );

function isAllowedPath( path, allowedPaths, cwd ) {
	if ( allowedPaths.length === 0 ) {
		return false;
	}

	return allowedPaths.some( ( allowedPath ) => {
		return micromatch.isMatch( path, allowedPath, {
			cwd,
			matchBase: true
		} );
	} );
}

const { readFile } = newFS;

export default newFS.default;
export { readFile };
