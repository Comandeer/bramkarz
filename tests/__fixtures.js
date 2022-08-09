import { dirname } from 'node:path';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const fixtureDirPath = resolvePath( __dirname, '__fixtures__' );
const disabledByDefaultFixturePath = resolvePath( fixtureDirPath, 'disabledByDefault' );
const simpleConfigFixturePath = resolvePath( fixtureDirPath, 'simpleConfig' );
const readOutsideOfRootFixturePath = resolvePath( fixtureDirPath, 'readOutsideOfRoot' );
const readOutsideOfRootNestedDirectoryPath = resolvePath( readOutsideOfRootFixturePath, 'nested' );
const fsOverridesFixturePath = resolvePath( fixtureDirPath, 'fsOverrides' );
const testMdPath = resolvePath( fixtureDirPath, 'test.md' );
const testTxtPath = resolvePath( fixtureDirPath, 'test.txt' );

const fixtures = {
	__dirname,
	disabledByDefault: disabledByDefaultFixturePath,
	simpleConfig: simpleConfigFixturePath,
	readOutsideOfRoot: readOutsideOfRootFixturePath,
	readOutsideOfRootNested: readOutsideOfRootNestedDirectoryPath,
	fsOverrides: fsOverridesFixturePath,
	testMd: testMdPath,
	testTxt: testTxtPath
};

export default fixtures;
