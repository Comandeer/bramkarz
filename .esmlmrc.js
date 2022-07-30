import { cwd } from 'node:process';
import { getConfig } from './dist/bramkarz.mjs';
import { isEntryPoint } from './dist/bramkarz.mjs';
import { injectBramkarz } from './dist/bramkarz.mjs';

const projectPath = cwd();
const bramkarzConfig = await getConfig( projectPath );

/**
 * @type {import('esm-loader-manager').LoaderConfiguration}
 */
const config = {
	loaders: [
		{
			matcher( url, context ) {
				const isPathEntryPoint = isEntryPoint( url, context, bramkarzConfig );

				return isPathEntryPoint;
			},

			loader( url, source ) {
				const code = source.toString( 'utf-8' );

				return injectBramkarz( code );
			}
		}
	]
};

export default config;
