import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const distPath = resolvePath( __dirname, '..', 'dist' );
const overridesPath = resolvePath( distPath, 'overrides' );
const overrides = new Map( [
	[
		/^(?:node:)?fs\/promises?$/,
		createOverrideURL( 'fs', 'promises' )
	]
] );

async function resolve( specifier, context, nextResolve ) {
	const { parentURL = null } = context;
	const isOverridable = isModuleOverridable( specifier );
	const isBramkarzParent = isBramkarzModule( parentURL );
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

function isBramkarzModule( url ) {
	const bramkarzModules = [ ...overrides.values() ];

	return bramkarzModules.some( ( module ) => {
		return module === url;
	} );
}

function getModuleOverride( module ) {
	const availableOverrides = [ ...overrides ];

	const [ , override ] = availableOverrides.find( ( [ regex ] ) => {
		return regex.test( module );
	} );

	return override;
}

export { resolve };
