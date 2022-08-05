import * as fs from 'node:fs/promises';
import { dirname } from 'node:path';
import { relative as getRelativePath } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { cwd as processCwd } from 'node:process';
import { fileURLToPath } from 'node:url';
import getConfig from '../../getConfig.js';
import micromatch from 'micromatch';

const cwd = processCwd();
const { allowedPaths = [], __filePath__ } = await getConfig( cwd );
const configDir = __filePath__ ? dirname( __filePath__ ) : '';

const newFS = { ...fs };

newFS.readFile = newFS.default.readFile = new Proxy( fs.readFile, {
	apply( target, thisArg, argumentsList ) {
		const path = argumentsList[ 0 ];
		const absolutePath = getAbsolutePath( cwd, path );

		if ( !isInsideDir( configDir, absolutePath ) || !isAllowedPath( path, allowedPaths, configDir ) ) {
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

function getAbsolutePath( cwd, path ) {
	const filePath = path.startsWith( 'file://' ) ? fileURLToPath( path ) : path;

	return resolvePath( cwd, filePath );
}

function isInsideDir( dir, path ) {
	const filePath = path.startsWith( 'file://' ) ? fileURLToPath( path ) : path;
	const relativePath = getRelativePath( dir, filePath );

	// https://www.golinuxcloud.com/if-path-is-subdirectory-of-another-nodejs/
	return !relativePath.startsWith( '..' );
}

const { readFile } = newFS;

export default newFS.default;
export { readFile };
