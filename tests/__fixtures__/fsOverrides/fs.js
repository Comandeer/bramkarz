import fs from 'node:fs';
import { access } from 'node:fs';
import { appendFile } from 'node:fs';
import { chmod } from 'node:fs';
import { chown } from 'node:fs';
import { copyFile } from 'node:fs';
import { createReadStream } from 'node:fs';
import { createWriteStream } from 'node:fs';
import { exists } from 'node:fs';
import { lchmod } from 'node:fs';
import { lchown } from 'node:fs';
import { lutimes } from 'node:fs';
import { link } from 'node:fs';
import { lstat } from 'node:fs';
import { mkdir } from 'node:fs';
import { mkdtemp } from 'node:fs';
import { open } from 'node:fs';
import { opendir } from 'node:fs';
import { readdir } from 'node:fs';
import { readFile } from 'node:fs';
import { readlink } from 'node:fs';
import { realpath } from 'node:fs';
import { rename } from 'node:fs';
import { rmdir } from 'node:fs';
import { rm } from 'node:fs';
import { stat } from 'node:fs';
import { symlink } from 'node:fs';
import { truncate } from 'node:fs';
import { unlink } from 'node:fs';
import { unwatchFile } from 'node:fs';
import { utimes } from 'node:fs';
import { watch } from 'node:fs';
import { watchFile } from 'node:fs';
import { writeFile } from 'node:fs';
import { dirname } from 'node:path';
import { join as joinPath } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const testFileRelativePath = joinPath( '.', 'test.md' );
const testFileAbsolutePath = resolvePath( __dirname, testFileRelativePath );
const testDirectoryRelativePath = joinPath( '..', 'test' );
const testDirectoryAbsolutePath = resolvePath( __dirname, testDirectoryRelativePath );
const errorMessageRegex = /The '(.*)' path is not allowed\./;

await assertCall( 'access (relative)', ( callback ) => access( testFileRelativePath, callback ) );
await assertCall( 'access (absolute)', ( callback ) => access( testFileAbsolutePath, callback ) );
await assertCall( 'fs.access (relative)', ( callback ) => fs.access( testFileRelativePath, callback ) );
await assertCall( 'fs.access (absolute)', ( callback ) => fs.access( testFileAbsolutePath, callback ) );

await assertCall( 'appendFile (relative)', ( callback ) => appendFile( testFileRelativePath, '', callback ) );
await assertCall( 'appendFile (absolute)', ( callback ) => appendFile( testFileAbsolutePath, '', callback ) );
await assertCall( 'fs.appendFile (relative)', ( callback ) => fs.appendFile( testFileRelativePath, '', callback ) );
await assertCall( 'fs.appendFile (absolute)', ( callback ) => fs.appendFile( testFileAbsolutePath, '', callback ) );

await assertCall( 'chmod (relative)', ( callback ) => chmod( testFileRelativePath, '0644', callback ) );
await assertCall( 'chmod (absolute)', ( callback ) => chmod( testFileAbsolutePath, '0644', callback ) );
await assertCall( 'fs.chmod (relative)', ( callback ) => fs.chmod( testFileRelativePath, '0644', callback ) );
await assertCall( 'fs.chmod (absolute)', ( callback ) => fs.chmod( testFileAbsolutePath, '0644', callback ) );

await assertCall( 'chown (relative)', ( callback ) => chown( testFileRelativePath, 0, 0, callback ) );
await assertCall( 'chown (absolute)', ( callback ) => chown( testFileAbsolutePath, 0, 0, callback ) );
await assertCall( 'fs.chown (relative)', ( callback ) => fs.chown( testFileRelativePath, 0, 0, callback ) );
await assertCall( 'fs.chown (absolute)', ( callback ) => fs.chown( testFileAbsolutePath, 0, 0, callback ) );

await assertCall( 'copyFile (relative, source)', ( callback ) => copyFile( testFileRelativePath, 'test.txt', callback ) );
await assertCall( 'copyFile (absolute, source)', ( callback ) => copyFile( testFileAbsolutePath, 'test.txt', callback ) );
await assertCall( 'fs.copyFile (relative, source)', ( callback ) => fs.copyFile( testFileRelativePath, 'test.txt', callback ) );
await assertCall( 'fs.copyFile (absolute, source)', ( callback ) => fs.copyFile( testFileAbsolutePath, 'test.txt', callback ) );
await assertCall( 'copyFile (relative, destination)', ( callback ) => copyFile( 'test.txt', testFileRelativePath, callback ) );
await assertCall( 'copyFile (absolute, destination)', ( callback ) => copyFile( 'test.txt', testFileAbsolutePath, callback ) );
await assertCall( 'fs.copyFile (relative, destination)', ( callback ) => fs.copyFile( 'test.txt', testFileRelativePath, callback ) );
await assertCall( 'fs.copyFile (absolute, destination)', ( callback ) => fs.copyFile( 'test.txt', testFileAbsolutePath, callback ) );

await assertNonCallbackedCall( 'createReadStream (relative)', () => createReadStream( testFileRelativePath ) );
await assertNonCallbackedCall( 'createReadStream (absolute)', () => createReadStream( testFileAbsolutePath ) );
await assertNonCallbackedCall( 'fs.createReadStream (relative)', () => fs.createReadStream( testFileRelativePath ) );
await assertNonCallbackedCall( 'fs.createReadStream (absolute)', () => fs.createReadStream( testFileAbsolutePath ) );

await assertNonCallbackedCall( 'createWriteStream (relative)', () => createWriteStream( testFileRelativePath ) );
await assertNonCallbackedCall( 'createWriteStream (absolute)', () => createWriteStream( testFileAbsolutePath ) );
await assertNonCallbackedCall( 'fs.createWriteStream (relative)', () => fs.createWriteStream( testFileRelativePath ) );
await assertNonCallbackedCall( 'fs.createWriteStream (absolute)', () => fs.createWriteStream( testFileAbsolutePath ) );

await assertCall( 'exists (relative)', ( callback ) => exists( testFileRelativePath, callback ) );
await assertCall( 'exists (absolute)', ( callback ) => exists( testFileAbsolutePath, callback ) );
await assertCall( 'fs.exists (relative)', ( callback ) => fs.exists( testFileRelativePath, callback ) );
await assertCall( 'fs.exists (absolute)', ( callback ) => fs.exists( testFileAbsolutePath, callback ) );

if ( typeof lchmod === 'function' ) {
	await assertCall( 'lchmod (relative)', ( callback ) => lchmod( testFileRelativePath, '0644', callback ) );
	await assertCall( 'lchmod (absolute)', ( callback ) => lchmod( testFileAbsolutePath, '0644', callback ) );
	await assertCall( 'fs.lchmod (relative)', ( callback ) => fs.lchmod( testFileRelativePath, '0644', callback ) );
	await assertCall( 'fs.lchmod (absolute)', ( callback ) => fs.lchmod( testFileAbsolutePath, '0644', callback ) );
}

await assertCall( 'lchown (relative)', ( callback ) => lchown( testFileRelativePath, 0, 0, callback ) );
await assertCall( 'lchown (absolute)', ( callback ) => lchown( testFileAbsolutePath, 0, 0, callback ) );
await assertCall( 'fs.lchown (relative)', ( callback ) => fs.lchown( testFileRelativePath, 0, 0, callback ) );
await assertCall( 'fs.lchown (absolute)', ( callback ) => fs.lchown( testFileAbsolutePath, 0, 0, callback ) );

await assertCall( 'lutimes (relative)', ( callback ) => lutimes( testFileRelativePath, Date.now(), Date.now(), callback ) );
await assertCall( 'lutimes (absolute)', ( callback ) => lutimes( testFileAbsolutePath, Date.now(), Date.now(), callback ) );
await assertCall( 'fs.lutimes (relative)', ( callback ) => fs.lutimes( testFileRelativePath, Date.now(), Date.now(), callback ) );
await assertCall( 'fs.lutimes (absolute)', ( callback ) => fs.lutimes( testFileAbsolutePath, Date.now(), Date.now(), callback ) );

await assertCall( 'link (relative, source)', ( callback ) => link( testFileRelativePath, 'test.txt', callback ) );
await assertCall( 'link (absolute, source)', ( callback ) => link( testFileAbsolutePath, 'test.txt', callback ) );
await assertCall( 'fs.link (relative, source)', ( callback ) => fs.link( testFileRelativePath, 'test.txt', callback ) );
await assertCall( 'fs.link (absolute, source)', ( callback ) => fs.link( testFileAbsolutePath, 'test.txt', callback ) );
await assertCall( 'link (relative, destination)', ( callback ) => link( 'test.txt', testFileRelativePath, callback ) );
await assertCall( 'link (absolute, destination)', ( callback ) => link( 'test.txt', testFileAbsolutePath, callback ) );
await assertCall( 'fs.link (relative, destination)', ( callback ) => fs.link( 'test.txt', testFileRelativePath, callback ) );
await assertCall( 'fs.link (absolute, destination)', ( callback ) => fs.link( 'test.txt', testFileAbsolutePath, callback ) );

await assertCall( 'lstat (relative)', ( callback ) => lstat( testFileRelativePath, callback ) );
await assertCall( 'lstat (absolute)', ( callback ) => lstat( testFileAbsolutePath, callback ) );
await assertCall( 'fs.lstat (relative)', ( callback ) => fs.lstat( testFileRelativePath, callback ) );
await assertCall( 'fs.lstat (absolute)', ( callback ) => fs.lstat( testFileAbsolutePath, callback ) );

await assertCall( 'mkdir (relative)', ( callback ) => mkdir( testDirectoryRelativePath, callback ) );
await assertCall( 'mkdir (absolute)', ( callback ) => mkdir( testDirectoryAbsolutePath, callback ) );
await assertCall( 'fs.mkdir (relative)', ( callback ) => fs.mkdir( testDirectoryRelativePath, callback ) );
await assertCall( 'fs.mkdir (absolute)', ( callback ) => fs.mkdir( testDirectoryAbsolutePath, callback ) );

await assertCall( 'mkdtemp (relative)', ( callback ) => mkdtemp( testDirectoryRelativePath, callback ) );
await assertCall( 'mkdtemp (absolute)', ( callback ) => mkdtemp( testDirectoryAbsolutePath, callback ) );
await assertCall( 'fs.mkdtemp (relative)', ( callback ) => fs.mkdtemp( testDirectoryRelativePath, callback ) );
await assertCall( 'fs.mkdtemp (absolute)', ( callback ) => fs.mkdtemp( testDirectoryAbsolutePath, callback ) );

await assertCall( 'open (relative)', ( callback ) => open( testFileRelativePath, 'r', callback ) );
await assertCall( 'open (absolute)', ( callback ) => open( testFileAbsolutePath, 'r', callback ) );
await assertCall( 'fs.open (relative)', ( callback ) => fs.open( testFileRelativePath, 'r', callback ) );
await assertCall( 'fs.open (absolute)', ( callback ) => fs.open( testFileAbsolutePath, 'r', callback ) );

await assertCall( 'opendir (relative)', ( callback ) => opendir( testDirectoryRelativePath, callback ) );
await assertCall( 'opendir (absolute)', ( callback ) => opendir( testDirectoryAbsolutePath, callback ) );
await assertCall( 'fs.opendir (relative)', ( callback ) => fs.opendir( testDirectoryRelativePath, callback ) );
await assertCall( 'fs.opendir (absolute)', ( callback ) => fs.opendir( testDirectoryAbsolutePath, callback ) );

await assertCall( 'readdir (relative)', ( callback ) => readdir( testDirectoryRelativePath, callback ) );
await assertCall( 'readdir (absolute)', ( callback ) => readdir( testDirectoryAbsolutePath, callback ) );
await assertCall( 'fs.readdir (relative)', ( callback ) => fs.readdir( testDirectoryRelativePath, callback ) );
await assertCall( 'fs.readdir (absolute)', ( callback ) => fs.readdir( testDirectoryAbsolutePath, callback ) );

await assertCall( 'readFile (relative)', ( callback ) => readFile( testFileRelativePath, callback ) );
await assertCall( 'readFile (absolute)', ( callback ) => readFile( testFileAbsolutePath, callback ) );
await assertCall( 'fs.readFile (relative)', ( callback ) => fs.readFile( testFileRelativePath, callback ) );
await assertCall( 'fs.readFile (absolute)', ( callback ) => fs.readFile( testFileAbsolutePath, callback ) );

await assertCall( 'readlink (relative)', ( callback ) => readlink( testFileRelativePath, callback ) );
await assertCall( 'readlink (absolute)', ( callback ) => readlink( testFileAbsolutePath, callback ) );
await assertCall( 'fs.readlink (relative)', ( callback ) => fs.readlink( testFileRelativePath, callback ) );
await assertCall( 'fs.readlink (absolute)', ( callback ) => fs.readlink( testFileAbsolutePath, callback ) );

await assertCall( 'realpath (relative)', ( callback ) => realpath( testFileRelativePath, callback ) );
await assertCall( 'realpath (absolute)', ( callback ) => realpath( testFileAbsolutePath, callback ) );
await assertCall( 'fs.realpath (relative)', ( callback ) => fs.realpath( testFileRelativePath, callback ) );
await assertCall( 'fs.realpath (absolute)', ( callback ) => fs.realpath( testFileAbsolutePath, callback ) );

await assertCall( 'rename (relative, source)', ( callback ) => rename( testFileRelativePath, 'test.txt', callback ) );
await assertCall( 'rename (absolute, source)', ( callback ) => rename( testFileAbsolutePath, 'test.txt', callback ) );
await assertCall( 'fs.rename (relative, source)', ( callback ) => fs.rename( testFileRelativePath, 'test.txt', callback ) );
await assertCall( 'fs.rename (absolute, source)', ( callback ) => fs.rename( testFileAbsolutePath, 'test.txt', callback ) );
await assertCall( 'rename (relative, destination)', ( callback ) => rename( 'test.txt', testFileRelativePath, callback ) );
await assertCall( 'rename (absolute, destination)', ( callback ) => rename( 'test.txt', testFileAbsolutePath, callback ) );
await assertCall( 'fs.rename (relative, destination)', ( callback ) => fs.rename( 'test.txt', testFileRelativePath, callback ) );
await assertCall( 'fs.rename (absolute, destination)', ( callback ) => fs.rename( 'test.txt', testFileAbsolutePath, callback ) );

await assertCall( 'rmdir (relative)', ( callback ) => rmdir( testDirectoryRelativePath, callback ) );
await assertCall( 'rmdir (absolute)', ( callback ) => rmdir( testDirectoryAbsolutePath, callback ) );
await assertCall( 'fs.rmdir (relative)', ( callback ) => fs.rmdir( testDirectoryRelativePath, callback ) );
await assertCall( 'fs.rmdir (absolute)', ( callback ) => fs.rmdir( testDirectoryAbsolutePath, callback ) );

await assertCall( 'rm (relative)', ( callback ) => rm( testFileRelativePath, callback ) );
await assertCall( 'rm (absolute)', ( callback ) => rm( testFileAbsolutePath, callback ) );
await assertCall( 'fs.rm (relative)', ( callback ) => fs.rm( testFileRelativePath, callback ) );
await assertCall( 'fs.rm (absolute)', ( callback ) => fs.rm( testFileAbsolutePath, callback ) );

await assertCall( 'stat (relative)', ( callback ) => stat( testFileRelativePath, callback ) );
await assertCall( 'stat (absolute)', ( callback ) => stat( testFileAbsolutePath, callback ) );
await assertCall( 'fs.stat (relative)', ( callback ) => fs.stat( testFileRelativePath, callback ) );
await assertCall( 'fs.stat (absolute)', ( callback ) => fs.stat( testFileAbsolutePath, callback ) );

await assertCall( 'symlink (relative, source)', ( callback ) => symlink( testFileRelativePath, 'test.txt', callback ) );
await assertCall( 'symlink (absolute, source)', ( callback ) => symlink( testFileAbsolutePath, 'test.txt', callback ) );
await assertCall( 'fs.symlink (relative, source)', ( callback ) => fs.symlink( testFileRelativePath, 'test.txt', callback ) );
await assertCall( 'fs.symlink (absolute, source)', ( callback ) => fs.symlink( testFileAbsolutePath, 'test.txt', callback ) );
await assertCall( 'symlink (relative, destination)', ( callback ) => symlink( 'test.txt', testFileRelativePath, callback ) );
await assertCall( 'symlink (absolute, destination)', ( callback ) => symlink( 'test.txt', testFileAbsolutePath, callback ) );
await assertCall( 'fs.symlink (relative, destination)', ( callback ) => fs.symlink( 'test.txt', testFileRelativePath, callback ) );
await assertCall( 'fs.symlink (absolute, destination)', ( callback ) => fs.symlink( 'test.txt', testFileAbsolutePath, callback ) );

await assertCall( 'truncate (relative)', ( callback ) => truncate( testFileRelativePath, callback ) );
await assertCall( 'truncate (absolute)', ( callback ) => truncate( testFileAbsolutePath, callback ) );
await assertCall( 'fs.truncate (relative)', ( callback ) => fs.truncate( testFileRelativePath, callback ) );
await assertCall( 'fs.truncate (absolute)', ( callback ) => fs.truncate( testFileAbsolutePath, callback ) );

await assertCall( 'unlink (relative)', ( callback ) => unlink( testFileRelativePath, callback ) );
await assertCall( 'unlink (absolute)', ( callback ) => unlink( testFileAbsolutePath, callback ) );
await assertCall( 'fs.unlink (relative)', ( callback ) => fs.unlink( testFileRelativePath, callback ) );
await assertCall( 'fs.unlink (absolute)', ( callback ) => fs.unlink( testFileAbsolutePath, callback ) );

await assertNonCallbackedCall( 'unwatchFile (relative)', () => unwatchFile( testFileRelativePath ) );
await assertNonCallbackedCall( 'unwatchFile (absolute)', () => unwatchFile( testFileAbsolutePath ) );
await assertNonCallbackedCall( 'fs.unwatchFile (relative)', () => fs.unwatchFile( testFileRelativePath ) );
await assertNonCallbackedCall( 'fs.unwatchFile (absolute)', () => fs.unwatchFile( testFileAbsolutePath ) );

await assertCall( 'utimes (relative)', ( callback ) => utimes( testFileRelativePath, Date.now(), Date.now(), callback ) );
await assertCall( 'utimes (absolute)', ( callback ) => utimes( testFileAbsolutePath, Date.now(), Date.now(), callback ) );
await assertCall( 'fs.utimes (relative)', ( callback ) => fs.utimes( testFileRelativePath, Date.now(), Date.now(), callback ) );
await assertCall( 'fs.utimes (absolute)', ( callback ) => fs.utimes( testFileAbsolutePath, Date.now(), Date.now(), callback ) );

await assertNonCallbackedCall( 'watch (relative)', () => watch( testFileRelativePath ) );
await assertNonCallbackedCall( 'watch (absolute)', () => watch( testFileAbsolutePath ) );
await assertNonCallbackedCall( 'fs.watch (relative)', () => fs.watch( testFileRelativePath ) );
await assertNonCallbackedCall( 'fs.watch (absolute)', () => fs.watch( testFileAbsolutePath ) );

await assertNonCallbackedCall( 'watchFile (relative)', () => watchFile( testFileRelativePath ) );
await assertNonCallbackedCall( 'watchFile (absolute)', () => watchFile( testFileAbsolutePath ) );
await assertNonCallbackedCall( 'fs.watchFile (relative)', () => fs.watchFile( testFileRelativePath ) );
await assertNonCallbackedCall( 'fs.watchFile (absolute)', () => fs.watchFile( testFileAbsolutePath ) );

await assertCall( 'writeFile (relative)', ( callback ) => writeFile( testFileRelativePath, '', callback ) );
await assertCall( 'writeFile (absolute)', ( callback ) => writeFile( testFileAbsolutePath, '', callback ) );
await assertCall( 'fs.writeFile (relative)', ( callback ) => fs.writeFile( testFileRelativePath, '', callback ) );
await assertCall( 'fs.writeFile (absolute)', ( callback ) => fs.writeFile( testFileAbsolutePath, '', callback ) );

async function assertCall( name, fn ) {
	return new Promise( ( resolve ) => {
		fn( ( error ) => {
			console.log (error );
			const isBlocked = error && errorMessageRegex.test( error.message );

			console.log( name, isBlocked ? 'PASS' : 'FAIL' );
			resolve();
		} );
	} );
}

function assertNonCallbackedCall( name, fn ) {
	try {
		fn();
	} catch ( { message } ) {
		if ( errorMessageRegex.test( message ) ) {
			return console.log( name, 'PASS' );
		}

		console.log( name, 'FAIL' );
	}
}
