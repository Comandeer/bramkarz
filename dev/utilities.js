import { readdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

async function getPackageFixtures() {
	const __dirname = dirname( fileURLToPath( import.meta.url ) );
	const fixturesDirPath = resolvePath( __dirname, '..', 'tests', '__fixtures__' );
	const fixtures = await readdir( fixturesDirPath, {
		withFileTypes: true
	} );
	const packageFixtures = fixtures.filter( ( fixture ) => {
		return fixture.isDirectory();
	} );
	const absolutePaths = packageFixtures.map( ( packageFixture ) => {
		return entityToAbsolutePath( fixturesDirPath, packageFixture );
	} );

	return absolutePaths;
}

function entityToAbsolutePath( path, { name } ) {
	const resolvedPath = resolvePath( path, name );

	return resolvedPath;
}

export { getPackageFixtures };
