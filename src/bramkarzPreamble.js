import { cwd } from 'node:process';
import { getConfig } from 'bramkarz';
import { overrideFS } from 'bramkarz';

const projectPath = cwd();
const bramkarzConfig = await getConfig( projectPath );

overrideFS( bramkarzConfig );
