/* eslint-disable no-console */

import { unlink } from 'node:fs/promises';
import { resolve as resolvePath } from 'node:path';
import { getPackageFixtures } from './utilities.js';

const packageFixtures = await getPackageFixtures();

const unlinkPromises = packageFixtures.map( async ( packageFixture ) => {
	const nodeModulesPath = resolvePath( packageFixture, 'node_modules' );
	const bramkarzSymlinkPath = resolvePath( nodeModulesPath, 'bramkarz' );

	await unlink( bramkarzSymlinkPath );
} );

await Promise.allSettled( unlinkPromises );

console.log( 'Bramkarz unlinked.' );
