import fs from 'node:fs/promises';
import { access } from 'node:fs/promises';
import { appendFile } from 'node:fs/promises';
import { chmod } from 'node:fs/promises';
import { chown } from 'node:fs/promises';
import { copyFile } from 'node:fs/promises';
import { lchmod } from 'node:fs/promises';
import { lchown } from 'node:fs/promises';
import { lutimes } from 'node:fs/promises';
import { link } from 'node:fs/promises';
import { lstat } from 'node:fs/promises';
import { mkdir } from 'node:fs/promises';
import { mkdtemp } from 'node:fs/promises';
import { open } from 'node:fs/promises';
import { opendir } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';
import { readlink } from 'node:fs/promises';
import { realpath } from 'node:fs/promises';
import { rename } from 'node:fs/promises';
import { rmdir } from 'node:fs/promises';
import { rm } from 'node:fs/promises';
import { stat } from 'node:fs/promises';
import { symlink } from 'node:fs/promises';
import { truncate } from 'node:fs/promises';
import { unlink } from 'node:fs/promises';
import { utimes } from 'node:fs/promises';
import { watch } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';
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

await assertCall( 'access (relative)', () => access( testFileRelativePath ) );
await assertCall( 'access (absolute)', () => access( testFileAbsolutePath ) );
await assertCall( 'fs.access (relative)', () => fs.access( testFileRelativePath ) );
await assertCall( 'fs.access (absolute)', () => fs.access( testFileAbsolutePath ) );

await assertCall( 'appendFile (relative)', () => appendFile( testFileRelativePath, '' ) );
await assertCall( 'appendFile (absolute)', () => appendFile( testFileAbsolutePath, '' ) );
await assertCall( 'fs.appendFile (relative)', () => fs.appendFile( testFileRelativePath, '' ) );
await assertCall( 'fs.appendFile (absolute)', () => fs.appendFile( testFileAbsolutePath, '' ) );

await assertCall( 'chmod (relative)', () => chmod( testFileRelativePath, '0644' ) );
await assertCall( 'chmod (absolute)', () => chmod( testFileAbsolutePath, '0644' ) );
await assertCall( 'fs.chmod (relative)', () => fs.chmod( testFileRelativePath, '0644' ) );
await assertCall( 'fs.chmod (absolute)', () => fs.chmod( testFileAbsolutePath, '0644' ) );

await assertCall( 'chown (relative)', () => chown( testFileRelativePath, 0, 0 ) );
await assertCall( 'chown (absolute)', () => chown( testFileAbsolutePath, 0, 0 ) );
await assertCall( 'fs.chown (relative)', () => fs.chown( testFileRelativePath, 0, 0 ) );
await assertCall( 'fs.chown (absolute)', () => fs.chown( testFileAbsolutePath, 0, 0 ) );

await assertCall( 'copyFile (relative, source)', () => copyFile( testFileRelativePath, 'test.txt' ) );
await assertCall( 'copyFile (absolute, source)', () => copyFile( testFileAbsolutePath, 'test.txt' ) );
await assertCall( 'fs.copyFile (relative, source)', () => fs.copyFile( testFileRelativePath, 'test.txt' ) );
await assertCall( 'fs.copyFile (absolute, source)', () => fs.copyFile( testFileAbsolutePath, 'test.txt' ) );
await assertCall( 'copyFile (relative, destination)', () => copyFile( 'test.txt', testFileRelativePath ) );
await assertCall( 'copyFile (absolute, destination)', () => copyFile( 'test.txt', testFileAbsolutePath ) );
await assertCall( 'fs.copyFile (relative, destination)', () => fs.copyFile( 'test.txt', testFileRelativePath ) );
await assertCall( 'fs.copyFile (absolute, destination)', () => fs.copyFile( 'test.txt', testFileAbsolutePath ) );

await assertCall( 'lchmod (relative)', () => lchmod( testFileRelativePath, '0644' ) );
await assertCall( 'lchmod (absolute)', () => lchmod( testFileAbsolutePath, '0644' ) );
await assertCall( 'fs.lchmod (relative)', () => fs.lchmod( testFileRelativePath, '0644' ) );
await assertCall( 'fs.lchmod (absolute)', () => fs.lchmod( testFileAbsolutePath, '0644' ) );

await assertCall( 'lchown (relative)', () => lchown( testFileRelativePath, 0, 0 ) );
await assertCall( 'lchown (absolute)', () => lchown( testFileAbsolutePath, 0, 0 ) );
await assertCall( 'fs.lchown (relative)', () => fs.lchown( testFileRelativePath, 0, 0 ) );
await assertCall( 'fs.lchown (absolute)', () => fs.lchown( testFileAbsolutePath, 0, 0 ) );

await assertCall( 'lutimes (relative)', () => lutimes( testFileRelativePath, Date.now(), Date.now() ) );
await assertCall( 'lutimes (absolute)', () => lutimes( testFileAbsolutePath, Date.now(), Date.now() ) );
await assertCall( 'fs.lutimes (relative)', () => fs.lutimes( testFileRelativePath, Date.now(), Date.now() ) );
await assertCall( 'fs.lutimes (absolute)', () => fs.lutimes( testFileAbsolutePath, Date.now(), Date.now() ) );

await assertCall( 'link (relative, source)', () => link( testFileRelativePath, 'test.txt' ) );
await assertCall( 'link (absolute, source)', () => link( testFileAbsolutePath, 'test.txt' ) );
await assertCall( 'fs.link (relative, source)', () => fs.link( testFileRelativePath, 'test.txt' ) );
await assertCall( 'fs.link (absolute, source)', () => fs.link( testFileAbsolutePath, 'test.txt' ) );
await assertCall( 'link (relative, destination)', () => link( 'test.txt', testFileRelativePath ) );
await assertCall( 'link (absolute, destination)', () => link( 'test.txt', testFileAbsolutePath ) );
await assertCall( 'fs.link (relative, destination)', () => fs.link( 'test.txt', testFileRelativePath ) );
await assertCall( 'fs.link (absolute, destination)', () => fs.link( 'test.txt', testFileAbsolutePath ) );

await assertCall( 'lstat (relative)', () => lstat( testFileRelativePath ) );
await assertCall( 'lstat (absolute)', () => lstat( testFileAbsolutePath ) );
await assertCall( 'fs.lstat (relative)', () => fs.lstat( testFileRelativePath ) );
await assertCall( 'fs.lstat (absolute)', () => fs.lstat( testFileAbsolutePath ) );

await assertCall( 'mkdir (relative)', () => mkdir( testDirectoryRelativePath ) );
await assertCall( 'mkdir (absolute)', () => mkdir( testDirectoryAbsolutePath ) );
await assertCall( 'fs.mkdir (relative)', () => fs.mkdir( testDirectoryRelativePath ) );
await assertCall( 'fs.mkdir (absolute)', () => fs.mkdir( testDirectoryAbsolutePath ) );

await assertCall( 'mkdtemp (relative)', () => mkdtemp( testDirectoryRelativePath ) );
await assertCall( 'mkdtemp (absolute)', () => mkdtemp( testDirectoryAbsolutePath ) );
await assertCall( 'fs.mkdtemp (relative)', () => fs.mkdtemp( testDirectoryRelativePath ) );
await assertCall( 'fs.mkdtemp (absolute)', () => fs.mkdtemp( testDirectoryAbsolutePath ) );

await assertCall( 'open (relative)', () => open( testFileRelativePath, 'r' ) );
await assertCall( 'open (absolute)', () => open( testFileAbsolutePath, 'r' ) );
await assertCall( 'fs.open (relative)', () => fs.open( testFileRelativePath, 'r' ) );
await assertCall( 'fs.open (absolute)', () => fs.open( testFileAbsolutePath, 'r' ) );

await assertCall( 'opendir (relative)', () => opendir( testDirectoryRelativePath ) );
await assertCall( 'opendir (absolute)', () => opendir( testDirectoryAbsolutePath ) );
await assertCall( 'fs.opendir (relative)', () => fs.opendir( testDirectoryRelativePath ) );
await assertCall( 'fs.opendir (absolute)', () => fs.opendir( testDirectoryAbsolutePath ) );

await assertCall( 'readdir (relative)', () => readdir( testDirectoryRelativePath ) );
await assertCall( 'readdir (absolute)', () => readdir( testDirectoryAbsolutePath ) );
await assertCall( 'fs.readdir (relative)', () => fs.readdir( testDirectoryRelativePath ) );
await assertCall( 'fs.readdir (absolute)', () => fs.readdir( testDirectoryAbsolutePath ) );

await assertCall( 'readFile (relative)', () => readFile( testFileRelativePath ) );
await assertCall( 'readFile (absolute)', () => readFile( testFileAbsolutePath ) );
await assertCall( 'fs.readFile (relative)', () => fs.readFile( testFileRelativePath ) );
await assertCall( 'fs.readFile (absolute)', () => fs.readFile( testFileAbsolutePath ) );

await assertCall( 'readlink (relative)', () => readlink( testFileRelativePath ) );
await assertCall( 'readlink (absolute)', () => readlink( testFileAbsolutePath ) );
await assertCall( 'fs.readlink (relative)', () => fs.readlink( testFileRelativePath ) );
await assertCall( 'fs.readlink (absolute)', () => fs.readlink( testFileAbsolutePath ) );

await assertCall( 'realpath (relative)', () => realpath( testFileRelativePath ) );
await assertCall( 'realpath (absolute)', () => realpath( testFileAbsolutePath ) );
await assertCall( 'fs.realpath (relative)', () => fs.realpath( testFileRelativePath ) );
await assertCall( 'fs.realpath (absolute)', () => fs.realpath( testFileAbsolutePath ) );

await assertCall( 'rename (relative, source)', () => rename( testFileRelativePath, 'test.txt' ) );
await assertCall( 'rename (absolute, source)', () => rename( testFileAbsolutePath, 'test.txt' ) );
await assertCall( 'fs.rename (relative, source)', () => fs.rename( testFileRelativePath, 'test.txt' ) );
await assertCall( 'fs.rename (absolute, source)', () => fs.rename( testFileAbsolutePath, 'test.txt' ) );
await assertCall( 'rename (relative, destination)', () => rename( 'test.txt', testFileRelativePath ) );
await assertCall( 'rename (absolute, destination)', () => rename( 'test.txt', testFileAbsolutePath ) );
await assertCall( 'fs.rename (relative, destination)', () => fs.rename( 'test.txt', testFileRelativePath ) );
await assertCall( 'fs.rename (absolute, destination)', () => fs.rename( 'test.txt', testFileAbsolutePath ) );

await assertCall( 'rmdir (relative)', () => rmdir( testDirectoryRelativePath ) );
await assertCall( 'rmdir (absolute)', () => rmdir( testDirectoryAbsolutePath ) );
await assertCall( 'fs.rmdir (relative)', () => fs.rmdir( testDirectoryRelativePath ) );
await assertCall( 'fs.rmdir (absolute)', () => fs.rmdir( testDirectoryAbsolutePath ) );

await assertCall( 'rm (relative)', () => rm( testFileRelativePath ) );
await assertCall( 'rm (absolute)', () => rm( testFileAbsolutePath ) );
await assertCall( 'fs.rm (relative)', () => fs.rm( testFileRelativePath ) );
await assertCall( 'fs.rm (absolute)', () => fs.rm( testFileAbsolutePath ) );

await assertCall( 'stat (relative)', () => stat( testFileRelativePath ) );
await assertCall( 'stat (absolute)', () => stat( testFileAbsolutePath ) );
await assertCall( 'fs.stat (relative)', () => fs.stat( testFileRelativePath ) );
await assertCall( 'fs.stat (absolute)', () => fs.stat( testFileAbsolutePath ) );

await assertCall( 'symlink (relative, source)', () => symlink( testFileRelativePath, 'test.txt' ) );
await assertCall( 'symlink (absolute, source)', () => symlink( testFileAbsolutePath, 'test.txt' ) );
await assertCall( 'fs.symlink (relative, source)', () => fs.symlink( testFileRelativePath, 'test.txt' ) );
await assertCall( 'fs.symlink (absolute, source)', () => fs.symlink( testFileAbsolutePath, 'test.txt' ) );
await assertCall( 'symlink (relative, destination)', () => symlink( 'test.txt', testFileRelativePath ) );
await assertCall( 'symlink (absolute, destination)', () => symlink( 'test.txt', testFileAbsolutePath ) );
await assertCall( 'fs.symlink (relative, destination)', () => fs.symlink( 'test.txt', testFileRelativePath ) );
await assertCall( 'fs.symlink (absolute, destination)', () => fs.symlink( 'test.txt', testFileAbsolutePath ) );

await assertCall( 'truncate (relative)', () => truncate( testFileRelativePath ) );
await assertCall( 'truncate (absolute)', () => truncate( testFileAbsolutePath ) );
await assertCall( 'fs.truncate (relative)', () => fs.truncate( testFileRelativePath ) );
await assertCall( 'fs.truncate (absolute)', () => fs.truncate( testFileAbsolutePath ) );

await assertCall( 'unlink (relative)', () => unlink( testFileRelativePath ) );
await assertCall( 'unlink (absolute)', () => unlink( testFileAbsolutePath ) );
await assertCall( 'fs.unlink (relative)', () => fs.unlink( testFileRelativePath ) );
await assertCall( 'fs.unlink (absolute)', () => fs.unlink( testFileAbsolutePath ) );

await assertCall( 'utimes (relative)', () => utimes( testFileRelativePath, Date.now(), Date.now() ) );
await assertCall( 'utimes (absolute)', () => utimes( testFileAbsolutePath, Date.now(), Date.now() ) );
await assertCall( 'fs.utimes (relative)', () => fs.utimes( testFileRelativePath, Date.now(), Date.now() ) );
await assertCall( 'fs.utimes (absolute)', () => fs.utimes( testFileAbsolutePath, Date.now(), Date.now() ) );

await assertCall( 'watch (relative)', () => watch( testFileRelativePath ) );
await assertCall( 'watch (absolute)', () => watch( testFileAbsolutePath ) );
await assertCall( 'fs.watch (relative)', () => fs.watch( testFileRelativePath ) );
await assertCall( 'fs.watch (absolute)', () => fs.watch( testFileAbsolutePath ) );

await assertCall( 'writeFile (relative)', () => writeFile( testFileRelativePath, '' ) );
await assertCall( 'writeFile (absolute)', () => writeFile( testFileAbsolutePath, '' ) );
await assertCall( 'fs.writeFile (relative)', () => fs.writeFile( testFileRelativePath, '' ) );
await assertCall( 'fs.writeFile (absolute)', () => fs.writeFile( testFileAbsolutePath, '' ) );

async function assertCall( name, fn ) {
	try {
		await fn();
	} catch ( { message } ) {
		if ( errorMessageRegex.test( message ) ) {
			return console.log( name, 'PASS' );
		}

		console.log( name, 'FAIL' );
	}
}
