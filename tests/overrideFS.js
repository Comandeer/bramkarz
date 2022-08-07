import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'ava';
import overrideFS from '../src/overrideFS.js';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const fsErrorRegex = /The '.+' path is not allowed./;

test( 'overrideFS() overrides the provided object', ( t ) => {
	const fs = {
		hublabubla: {}
	};
	const newFS = overrideFS( fs );

	t.not( fs, newFS );
	t.not( fs.hublabubla, newFS.hublabubla );
} );

test( 'overrideFS() overrides each mapping', async ( t ) => {
	const fs = {
		readFile() {},
		default: {
			readFile() {}
		}
	};
	const newFS = overrideFS( fs, {
		mappings: {
			readFile: [ 0 ],
			default: {
				readFile: [ 0 ]
			}
		}
	} );

	t.not( fs.readFile, newFS.readFile );
	t.not( fs.default.readFile, newFS.default.readFile );
	t.not( newFS.readFile, newFS.default.readFile );
} );

test( 'overrideFS() validates arguments under passed indexes (singular)', ( t ) => {
	const fs = {
		dummyFn() {}
	};
	const newFS = overrideFS( fs, {
		mappings: {
			dummyFn: [ 2 ]
		}
	} );

	t.throws( () => {
		newFS.dummyFn( './first', './second', './third' );
	}, {
		message: 'The \'./third\' path is not allowed.'
	} );
} );

test( 'overrideFS() validates arguments under passed indexes (multiple)', ( t ) => {
	const fs = {
		dummyFn() {}
	};
	const newFS = overrideFS( fs, {
		allowedPaths: [
			'*.pass'
		],
		mappings: {
			dummyFn: [ 0, 2 ]
		}
	} );

	t.throws( () => {
		newFS.dummyFn( './first', './second', './third' );
	}, {
		message: 'The \'./first\' path is not allowed.'
	} );

	t.throws( () => {
		newFS.dummyFn( './first.pass', './second', './third' );
	}, {
		message: 'The \'./third\' path is not allowed.'
	} );
} );

test( 'overrideFS() overrides functions according to the passed config', ( t ) => {
	const fs = {
		readFile() {}
	};
	const bramkarzRoot = resolvePath( __dirname );
	const newFS = overrideFS( fs, {
		bramkarzRoot,
		allowedPaths: [
			'*.txt'
		],
		mappings: {
			readFile: [ 0 ]
		}
	} );

	t.throws( () => {
		return newFS.readFile( './test.txt' );
	}, {
		message: fsErrorRegex
	} );

	t.notThrows( () => {
		return newFS.readFile( './tests/nested/test.txt' );
	} );

	t.throws( () => {
		return newFS.readFile( './tests/nested/test.md' );
	} );
} );
