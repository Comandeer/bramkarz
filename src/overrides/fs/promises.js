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
	allowedPaths,
	mappings: {
		readFile: [ 0 ],
		default: {
			readFile: [ 0 ]
		}
	}
} );

const { readFile } = newFS;

export default newFS.default;
export { readFile };
