import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

function isEntryPoint( url, { parentURL }, { entrypoints, __filePath__: configPath } ) {
	const path = fileURLToPath( url );

	if ( !entrypoints ) {
		return !parentURL;
	}

	const configDir = dirname( configPath );
	const resolvedEntryPoints = entrypoints.map( ( entrypoint ) => {
		return resolvePath( configDir, entrypoint );
	} );

	return resolvedEntryPoints.includes( path );
}

export default isEntryPoint;
