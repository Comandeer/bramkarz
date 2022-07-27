import { cwd } from 'node:process';

const projectPath = cwd();

/**
 * @type {import('esm-loader-manager').LoaderConfiguration}
 */
const config = {
	loaders: [
	]
};

export default config;
