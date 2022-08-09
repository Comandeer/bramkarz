import * as fs from 'node:fs/promises';
import { dirname } from 'node:path';
import { cwd as processCwd } from 'node:process';
import getConfig from '../../getConfig.js';
import overrideFS from '../../overrideFS.js';

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
	cp,
	lchmod,
	lchown,
	lutimes,
	link,
	lstat,
	mkdir,
	mkdtemp,
	open,
	opendir,
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
	utimes,
	watch,
	writeFile
} = newFS;

export default newFS.default;

export { access };
export { appendFile };
export { chmod };
export { chown };
export { constants };
export { copyFile };
export { cp };
export { lchmod };
export { lchown };
export { lutimes };
export { link };
export { lstat };
export { mkdir };
export { mkdtemp };
export { open };
export { opendir };
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
export { utimes };
export { watch };
export { writeFile };
