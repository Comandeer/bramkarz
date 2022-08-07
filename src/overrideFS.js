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

	createProxies( mappings, fs, newFS, ( target, thisArg, argumentsList, pathIndexes ) => {
		validatePathArguments( argumentsList, pathIndexes );

		return Reflect.apply( target, thisArg, argumentsList );
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

function createProxies( mappings, sourceObject, targetObject, callback ) {
	const mappingsIterable = Object.entries( mappings );

	mappingsIterable.forEach( ( [ property, pathIndexes ] ) => {
		const isExistingProperty = sourceObject[ property ] !== undefined;
		const isMethod = typeof sourceObject[ property ] === 'function';
		const isNestedObject = !Array.isArray( pathIndexes );

		if ( isNestedObject && isExistingProperty ) {
			return createProxies( pathIndexes, sourceObject[ property ], targetObject[ property ], callback );
		}

		if ( isNestedObject || !isMethod ) {
			return;
		}

		targetObject[ property ] = new Proxy( sourceObject[ property ], {
			apply( target, thisArg, argumentsList ) {
				return callback( target, thisArg, argumentsList, pathIndexes );
			}
		} );
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
