import { relative as getRelativePath } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { cwd as processCwd } from 'node:process';
import { fileURLToPath } from 'node:url';
import micromatch from 'micromatch';

const defaultMethods = {
	access: [ 0 ],
	appendFile: [ 0 ],
	chmod: [ 0 ],
	chown: [ 0 ],
	copyFile: [ 0, 1 ],
	cp: [ 0, 1 ],
	createReadStream: [ 0 ],
	createWriteStream: [ 0 ],
	exists: [ 0 ],
	lchmod: [ 0 ],
	lchown: [ 0 ],
	lutimes: [ 0 ],
	link: [ 0, 1 ],
	lstat: [ 0 ],
	mkdir: [ 0 ],
	mkdtemp: [ 0 ],
	open: [ 0 ],
	opendir: [ 0 ],
	readdir: [ 0 ],
	readFile: [ 0 ],
	readlink: [ 0 ],
	realpath: [ 0 ],
	rename: [ 0, 1 ],
	rmdir: [ 0 ],
	rm: [ 0 ],
	stat: [ 0 ],
	symlink: [ 0, 1 ],
	truncate: [ 0 ],
	unlink: [ 0 ],
	unwatchFile: [ 0 ],
	utimes: [ 0 ],
	watch: [ 0 ],
	watchFile: [ 0 ],
	writeFile: [ 0 ]
};
const defaultMappings = {
	...defaultMethods,
	default: {
		...defaultMethods,
		promises: {
			...defaultMethods
		}
	},
	promises: {
		...defaultMethods
	}
};

function overrideFS( fs, {
	bramkarzRoot = processCwd(),
	allowedPaths = [],
	mappings = defaultMappings
} = {} ) {
	const newFS = cloneModule( fs );

	createProxies( mappings, fs, newFS, ( target, thisArg, argumentsList, pathIndexes ) => {
		// TODO: find less naive way without the need of vast refactor…
		const callback = argumentsList[ argumentsList.length - 1 ];
		const isCallbacked = typeof callback === 'function';

		try {
			validatePathArguments( argumentsList, pathIndexes );
		} catch ( error ) {
			if ( isCallbacked ) {
				return callback( error );
			}

			throw error;
		}

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

function isInsideDir( dir, filePath ) {
	const relativePath = getRelativePath( dir, filePath );

	// https://www.golinuxcloud.com/if-path-is-subdirectory-of-another-nodejs/
	return !relativePath.startsWith( '..' );
}

export default overrideFS;
