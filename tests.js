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

	describe( 'should handle simple verse renumberings', function()
	{
		it( 'for single verses', function()
		{
			expect( bcv.parse( 'Lev 5:21 NAB' ).reversify( 'default' ) ).to.equal( 'Lev.6.2' );
			expect( bcv.parse( 'Lev 6:2' ).reversify( 'NAB' ) ).to.equal( 'Lev.5.21' );
			expect( bcv.parse( 'Jonah 2:1 NAB' ).reversify( 'default' ) ).to.equal( 'Jonah.1.17' );
			expect( bcv.parse( 'Jonah 1:17' ).reversify( 'NAB' ) ).to.equal( 'Jonah.2.1' );
		});

		it( 'for entire ranges', function()
		{
			expect( bcv.parse( 'Lev 5:20-26 NAB' ).reversify( 'default' ) ).to.equal( 'Lev.6.1-Lev.6.7' );
			expect( bcv.parse( 'Lev 6:1-7' ).reversify( 'NAB' ) ).to.equal( 'Lev.5.20-Lev.5.26' );
		});

		it( 'for ranges which overlap with non-renumbered verses', function()
		{
			expect( bcv.parse( 'Lev 5:18-21 NAB' ).reversify( 'default' ) ).to.equal( 'Lev.5.18-Lev.6.2' );
			expect( bcv.parse( 'Lev 5:18-6:2' ).reversify( 'NAB' ) ).to.equal( 'Lev.5.18-Lev.5.21' );
			expect( bcv.parse( 'Lev 5:25-6:2 NAB' ).reversify( 'default' ) ).to.equal( 'Lev.6.6-Lev.6.9' );
			expect( bcv.parse( 'Lev 6:6-9' ).reversify( 'NAB' ) ).to.equal( 'Lev.5.25-Lev.6.2' );
			expect( bcv.parse( 'Lev 5:18-6:2 NAB' ).reversify( 'default' ) ).to.equal( 'Lev.5.18-Lev.6.9' );
			expect( bcv.parse( 'Lev 5:18-6:9' ).reversify( 'NAB' ) ).to.equal( 'Lev.5.18-Lev.6.2' );
			expect( bcv.parse( 'Jonah 1:16-2:1 NAB' ).reversify( 'default' ) ).to.equal( 'Jonah.1.16-Jonah.1.17' );
			expect( bcv.parse( 'Jonah 1:16-17' ).reversify( 'NAB' ) ).to.equal( 'Jonah.1.16-Jonah.2.1' );
			expect( bcv.parse( 'Jonah 2:1-2 NAB' ).reversify( 'default' ) ).to.equal( 'Jonah.1.17-Jonah.2.1' );
			expect( bcv.parse( 'Jonah 1:17-2:1' ).reversify( 'NAB' ) ).to.equal( 'Jonah.2.1-Jonah.2.2' );
			expect( bcv.parse( 'Jonah 1:16-2:2 NAB' ).reversify( 'default' ) ).to.equal( 'Jonah.1.16-Jonah.2.1' );
			expect( bcv.parse( 'Jonah 1:16-2:1' ).reversify( 'NAB' ) ).to.equal( 'Jonah.1.16-Jonah.2.2' );
		});
	});
});
