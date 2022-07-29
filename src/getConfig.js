import { readFile } from 'node:fs/promises';
import { findUp } from 'find-up';
import { packageDirectory } from 'pkg-dir';

async function getConfig( path ) {
	const packageRoot = await packageDirectory( {
		cwd: path
	} );
	const configFilePath = await findUp( '.bramkarzrc.json', {
		cwd: path,
		stopAt: packageRoot
	} );

	if ( !configFilePath ) {
		return {};
	}

	const configFileContent = await readFile( configFilePath );
	const config = JSON.parse( configFileContent );

	return config;
}

export default getConfig;
