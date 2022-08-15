import { cp } from 'node:fs/promises';
import { cwd as processCWD } from 'node:process';
import { execa } from 'execa';
import { temporaryDirectoryTask } from 'tempy';

/**
 * @callback CmdTestCallback
 * @param {import('ava').ExecutionContext<unknown>} t Test execution context
 * @param {ChildProcessResult} results
 * @returns {void}
 */

/**
 * @typedef {Object} CmdTestOptions
 * @property {string} cmd Command to execute;
 * @property {Array<string>} [params=[]] Command's parameters.
 * @property {string} [cwd=process.cwd()] CWD for tee command
 * @property {Record<string, string>} [env={}] Additional environment variables to pass to the command.
 * @property {CmdTestCallback} callback
 */

/**
 * @param {CmdTestOptions} options
 * @returns {() => Promise}
 */
function createCmdTest( {
	cmd,
	callback,
	params = [],
	env = {},
	cwd = processCWD(),
	root = cwd
} = {} ) {
	return async ( t ) => {
		return temporaryDirectoryTask( async ( path ) => {
			console.log( 'temporaryDirectoryTask', root, path ); // eslint-disable-line no-console
			await cp( root, path, {
				recursive: true
			} );

			const newCWD = cwd.replace( root, path );
			console.log( 'newCWD', newCWD ); // eslint-disable-line no-console
			const result = await execa( cmd, params, {
				cwd: newCWD,
				env,
				reject: false
			} );

			return callback( t, result );
		} );
	};
}

export default createCmdTest;
