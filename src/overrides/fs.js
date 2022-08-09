import * as fs from 'node:fs';
import { dirname } from 'node:path';
import { cwd as processCwd } from 'node:process';
import getConfig from '../getConfig.js';
import overrideFS from '../overrideFS.js';

const cwd = processCwd();
const { allowedPaths = [], __filePath__ } = await getConfig( cwd );
const bramkarzRoot = __filePath__ ? dirname( __filePath__ ) : '';
const newFS = overrideFS( fs, {
	bramkarzRoot,
	allowedPaths
} );

const {
	access,
	appendFile,
	chmod,
	chown,
	constants,
	copyFile,
	createReadStream,
	createWriteStream,
	exists,
	lchmod,
	lchown,
	lutimes,
	link,
	lstat,
	mkdir,
	mkdtemp,
	open,
	opendir,
	promises,
	readdir,
	readFile,
	readlink,
	realpath,
	rename,
	rmdir,
	rm,
	stat,
	symlink,
	truncate,
	unlink,
	unwatchFile,
	utimes,
	watch,
	watchFile,
	writeFile,
	Dir,
	Dirent,
	Stats,
	ReadStream,
	WriteStream,
	FileReadStream,
	FileWriteStream,
	_toUnixTimestamp,
	F_OK,
	R_OK,
	W_OK,
	X_OK
} = newFS;

export default newFS.default;

export { access };
export { appendFile };
export { chmod };
export { chown };
export { constants };
export { copyFile };
export { createReadStream };
export { createWriteStream };
export { exists };
export { lchmod };
export { lchown };
export { lutimes };
export { link };
export { lstat };
export { mkdir };
export { mkdtemp };
export { open };
export { opendir };
export { promises };
export { readdir };
export { readFile };
export { readlink };
export { realpath };
export { rename };
export { rmdir };
export { rm };
export { stat };
export { symlink };
export { truncate };
export { unlink };
export { unwatchFile };
export { utimes };
export { watch };
export { watchFile };
export { writeFile };
export { Dir };
export { Dirent };
export { Stats };
export { ReadStream };
export { WriteStream };
export { FileReadStream };
export { FileWriteStream };
export { _toUnixTimestamp };
export { F_OK };
export { R_OK };
export { W_OK };
export { X_OK };
