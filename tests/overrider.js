import test from 'ava';

test( 'overrider exports correct exports', async ( t ) => {
	const expectedImports = [
		'overrideFS'
	];

	const pkg = await import( '../src/overrider.js' );
	const actualImports = Object.keys( pkg );

	t.deepEqual( actualImports, expectedImports );
} );
