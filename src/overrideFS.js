import { relative as getRelativePath } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { cwd as processCwd } from 'node:process';
import { fileURLToPath } from 'node:url';
import micromatch from 'micromatch';

function overrideFS( fs, {
	bramkarzRoot = processCwd(),
	allowedPaths = [],
	mappings = {}
} = {} ) {
	const newFS = cloneModule( fs );

	iterateMappings( mappings, fs, newFS, ( property, pathIndexes, sourceObj, targetObj ) => {
		targetObj[ property ] = new Proxy( sourceObj[ property ], {
			apply( target, thisArg, argumentsList ) {
				validatePathArguments( argumentsList, pathIndexes );

				return Reflect.apply( target, thisArg, argumentsList );
			}
		} );
	} );

	return newFS;

	function validatePathArguments( argumentsList, pathIndexes = [ 0 ] ) {
		for ( const pathIndex of pathIndexes ) {
			const path = argumentsList[ pathIndex ];
			const absolutePath = getAbsolutePath( processCwd(), path );

			if ( !isInsideDir( bramkarzRoot, absolutePath ) || !isAllowedPath( path, allowedPaths, bramkarzRoot ) ) {
				throw new Error( `The '${ path }' path is not allowed.` );
			}
		}
	}
}

function cloneModule( module ) {
	const newModule = {};

	for ( const [ property, value ] of Object.entries( module ) ) {
		newModule[ property ] = isObject( value ) ? cloneModule( value ) : value;
	}

	return newModule;

	function isObject( value ) {
		const isObject = typeof value === 'object' && value !== null;
		const isArray = Array.isArray( value );

		return isObject && !isArray;
	}
}

function iterateMappings( mappings, originalObj, clonedObj, callback ) {
	const mappingsIterable = Object.entries( mappings );

	mappingsIterable.forEach( ( [ property, pathIndexes ] ) => {
		if ( Array.isArray( pathIndexes ) ) {
			return callback( property, pathIndexes, originalObj, clonedObj );
		}

		return iterateMappings( pathIndexes, originalObj[ property ], clonedObj[ property ], callback );
	} );
}

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

export default overrideFS;
