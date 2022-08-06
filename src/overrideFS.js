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
	const newFS = { ...fs };
	newFS.default = { ...fs.default };

	for ( const [ method, pathIndexes ] of Object.entries( mappings ) ) {
		newFS[ method ] = newFS.default[ method ] = new Proxy( fs[ method ], {
			apply( target, thisArg, argumentsList ) {
				validatePathArguments( argumentsList, pathIndexes );

				return Reflect.apply( target, thisArg, argumentsList );
			}
		} );
	}
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
