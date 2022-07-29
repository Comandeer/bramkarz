import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const fixtureDirPath = resolvePath( __dirname, '__fixtures__' );
const disabledByDefaultFixturePath = resolvePath( fixtureDirPath, 'disabledByDefault' );
const simpleConfigFixturePath = resolvePath( fixtureDirPath, 'simpleConfig' );

const fixtures = {
	'disabledByDefault': disabledByDefaultFixturePath,
	'simpleConfig': simpleConfigFixturePath
};

export default fixtures;
