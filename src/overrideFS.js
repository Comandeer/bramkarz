import fs from 'node:fs/promises';
import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import micromatch from 'micromatch';

const originalMethods = new Map( [
	[ 'readFile', fs.readFile ]
] );

function overrideFS( { allowedPaths = [], __filePath__ } ) {
	const configDir = __filePath__ ? dirname( __filePath__ ) : '';

	fs.readFile = new Proxy( fs.readFile, {
		apply( target, thisArg, argumentsList ) {
			const path = argumentsList[ 0 ];

			if ( !isAllowedPath( path, allowedPaths, configDir ) ) {
				throw new Error( `The '${ path }' path is not allowed.` );
			}

			return Reflect.apply( target, thisArg, argumentsList );
		}
	} );

	return restoreFS;
}

function isAllowedPath( path, allowedPaths, cwd ) {
	if ( allowedPaths.length === 0 ) {
		return false;
	}

	return allowedPaths.some( ( allowedPath ) => {
		const absoluteGlob = resolvePath( cwd, allowedPath );

		return micromatch.isMatch( path, absoluteGlob, {
			cwd
		} );
	} );
}

function restoreFS() {
	for ( const [ method, originalMethod ] of originalMethods ) {
		fs[ method ] = originalMethod;
	}
}

export default overrideFS;
