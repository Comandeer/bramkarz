import { dirname } from 'node:path';
import { isAbsolute } from 'node:path';
import { relative as getRelativePath } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const bramkarzRootPath = resolvePath( __dirname, '..' );
const distPath = resolvePath( bramkarzRootPath, 'dist' );
const overridesPath = resolvePath( distPath, 'overrides' );
const overrides = new Map( [
	[
		/^(?:node:)?fs\/promises$/,
		createOverrideURL( 'fs', 'promises' )
	],
	[
		/^(?:node:)?fs$/,
		createOverrideURL( 'fs' )
	]
] );

async function resolve( specifier, context, nextResolve ) {
	const { parentURL = null } = context;
	const isOverridable = isModuleOverridable( specifier );
	const isBramkarzParent = parentURL && isInsideDir( bramkarzRootPath, parentURL );
	const needsHijack = isOverridable && !isBramkarzParent;

	if ( !needsHijack ) {
		return nextResolve( specifier, context, nextResolve );
	}

	const override = getModuleOverride( specifier );

	return {
		shortCircuit: true,
		url: override,
		format: 'module'
	};

}

function createOverrideURL( ...overridePathSegments ) {
	overridePathSegments[ overridePathSegments.length - 1 ] += '.mjs';

	const overridePath = resolvePath( overridesPath, ...overridePathSegments );
	const overrideURL = pathToFileURL( overridePath );

	return overrideURL.href;
}

function isModuleOverridable( module ) {
	const availableOverrides = [ ...overrides.keys() ];

	return availableOverrides.some( ( regex ) => {
		return regex.test( module );
	} );
}

function getModuleOverride( module ) {
	const availableOverrides = [ ...overrides ];

	const [ , override ] = availableOverrides.find( ( [ regex ] ) => {
		return regex.test( module );
	} );

	return override;
}

function isInsideDir( dir, path ) {
	const filePath = fileURLToPath( path );
	const relativePath = getRelativePath( dir, filePath );
	const isNotEmptyPath = relativePath.length > 0;
	const isNotOutsideDir = !relativePath.startsWith( '..' );
	const isNotAbsolutePath = !isAbsolute( relativePath );

	// https://stackoverflow.com/a/45242825/9025529
	return isNotEmptyPath && isNotOutsideDir && isNotAbsolutePath;
}

export { resolve };
