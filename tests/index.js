import test from 'ava';

test( 'package exports correct exports', async ( t ) => {
	const expectedImports = [
		'getConfig',
		'injectBramkarz',
		'isEntryPoint',
		'overrideFS'
	];

	const pkg = await import( '../src/index.js' );
	const actualImports = Object.keys( pkg );

	t.deepEqual( actualImports, expectedImports );
} );
