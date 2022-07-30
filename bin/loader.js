import { readFile } from 'node:fs/promises';

import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const distPath = resolvePath( __dirname, '..', 'dist' );

const bramkarzPrefixRegex = /^bramkarz:/;

export async function resolve( specifier, context, nextResolve ) {
	const { parentURL = null } = context;
	const fsRegex = /^(?:node:)?fs\/promises?$/;
	const isFS = fsRegex.test( specifier );
	const isBramkarzParent = parentURL && bramkarzPrefixRegex.test( parentURL );
	const needsHijack = isFS && !isBramkarzParent;

	// Node cannot into custom schemas in parent URLs.
	if ( isBramkarzParent ) {
		context.parentURL = undefined;
	}

	if ( !needsHijack ) {
		return nextResolve( specifier, context, nextResolve );
	}

	return {
		shortCircuit: true,
		url: 'bramkarz:fs/promises',
		format: 'module'
	};

}

export async function load( url, context, nextLoad ) {
	const isBramkarzURL = bramkarzPrefixRegex.test( url );

	if ( !isBramkarzURL ) {
		return nextLoad( url, context, nextLoad );
	}

	const overrideName = url.replace( bramkarzPrefixRegex, '' );
	const overridePath = createOverridePath( overrideName );
	const override = await readFile( overridePath, 'utf8' );

	return {
		format: context.format,
		shortCircuit: true,
		source: override
	};
}

function createOverridePath( override ) {
	return resolvePath( distPath, 'overrides', `${ override }.mjs` );
}
