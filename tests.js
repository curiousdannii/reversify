// Unit tests for Reversify

var bcv_parser = require( 'bible-passage-reference-parser/js/en_bcv_parser' );
var expect = require( 'chai' ).expect;

// Install the plugin
require( './index.js' )( bcv_parser );
var bcv = new bcv_parser.bcv_parser();

describe( 'reversify', function()
{
	it( 'should handle passages which don\'t need reversifying', function()
	{
		expect( bcv.parse( 'Matthew 1:1' ).reversify( 'default' ) ).to.equal( 'Matt.1.1' );
		expect( bcv.parse( 'Matthew 1:1' ).reversify( 'esv' ) ).to.equal( 'Matt.1.1' );
	});

	describe( 'should handle renumbering chapter breaks', function()
	{
		it( 'for single verses', function()
		{
			expect( bcv.parse( 'Lev 5:21 NAB' ).reversify( 'default' ) ).to.equal( 'Lev.6.2' );
			expect( bcv.parse( 'Lev 6:2' ).reversify( 'NAB' ) ).to.equal( 'Lev.5.21' );
			expect( bcv.parse( 'Lev 6:12 NAB' ).reversify( 'default' ) ).to.equal( 'Lev.6.19' );
			expect( bcv.parse( 'Lev 6:19' ).reversify( 'NAB' ) ).to.equal( 'Lev.6.12' );
			expect( bcv.parse( 'Jonah 2:1 NAB' ).reversify( 'default' ) ).to.equal( 'Jonah.1.17' );
			expect( bcv.parse( 'Jonah 1:17' ).reversify( 'NAB' ) ).to.equal( 'Jonah.2.1' );
			expect( bcv.parse( 'Jonah 2:8 NAB' ).reversify( 'default' ) ).to.equal( 'Jonah.2.7' );
			expect( bcv.parse( 'Jonah 2:7' ).reversify( 'NAB' ) ).to.equal( 'Jonah.2.8' );
		});

		it( 'for contained ranges', function()
		{
			expect( bcv.parse( 'Lev 5:20-6:23 NAB' ).reversify( 'default' ) ).to.equal( 'Lev.6.1-Lev.6.30' );
			expect( bcv.parse( 'Lev 6:1-30' ).reversify( 'NAB' ) ).to.equal( 'Lev.5.20-Lev.6.23' );
			expect( bcv.parse( 'Lev 5:25-6:11 NAB' ).reversify( 'default' ) ).to.equal( 'Lev.6.6-Lev.6.18' );
			expect( bcv.parse( 'Lev 6:6-18' ).reversify( 'NAB' ) ).to.equal( 'Lev.5.25-Lev.6.11' );
			expect( bcv.parse( 'Jonah 2:1-11 NAB' ).reversify( 'default' ) ).to.equal( 'Jonah.1.17-Jonah.2.10' );
			expect( bcv.parse( 'Jonah 1:17-2:10' ).reversify( 'NAB' ) ).to.equal( 'Jonah.2.1-Jonah.2.11' );
		});

		it( 'for ranges which are partially non-renumbered', function()
		{
			expect( bcv.parse( 'Lev 5:18-21 NAB' ).reversify( 'default' ) ).to.equal( 'Lev.5.18-Lev.6.2' );
			expect( bcv.parse( 'Lev 5:18-6:2' ).reversify( 'NAB' ) ).to.equal( 'Lev.5.18-Lev.5.21' );
			expect( bcv.parse( 'Lev 6:21-7:3 NAB' ).reversify( 'default' ) ).to.equal( 'Lev.6.28-Lev.7.3' );
			expect( bcv.parse( 'Lev 6:28-7:3' ).reversify( 'NAB' ) ).to.equal( 'Lev.6.21-Lev.7.3' );
			expect( bcv.parse( 'Jonah 1:16-2:2 NAB' ).reversify( 'default' ) ).to.equal( 'Jonah.1.16-Jonah.2.1' );
			expect( bcv.parse( 'Jonah 1:16-2:1' ).reversify( 'NAB' ) ).to.equal( 'Jonah.1.16-Jonah.2.2' );
			expect( bcv.parse( 'Jonah 2:10-3:2 NAB' ).reversify( 'default' ) ).to.equal( 'Jonah.2.9-Jonah.3.2' );
			expect( bcv.parse( 'Jonah 2:9-3:2' ).reversify( 'NAB' ) ).to.equal( 'Jonah.2.10-Jonah.3.2' );
		});
	});
});
