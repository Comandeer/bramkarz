/* eslint-disable no-console */

import { mkdir } from 'node:fs/promises';
import { symlink } from 'node:fs/promises';
import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPackageFixtures } from './utilities.js';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const bramkarzPath = resolvePath( __dirname, '..' );
const packageFixtures = await getPackageFixtures();

const symlinkPromises = packageFixtures.map( async ( packageFixture ) => {
	const nodeModulesPath = resolvePath( packageFixture, 'node_modules' );

	try {
		await mkdir( nodeModulesPath );
	} catch {
		// Ignore.
	}

	const bramkarzSymlinkPath = resolvePath( nodeModulesPath, 'bramkarz' );

	await symlink( bramkarzPath, bramkarzSymlinkPath );
} );

await Promise.allSettled( symlinkPromises );

console.log( 'Bramkarz symlinked.' );
