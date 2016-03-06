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

	describe( 'should handle chapters which are split in two', function()
	{
		it( 'for single verses', function()
		{
			expect( bcv.parse( 'Joel 3:2 NAB' ).reversify( 'default' ) ).to.equal( 'Joel.2.29' );
			expect( bcv.parse( 'Joel 2:29' ).reversify( 'NAB' ) ).to.equal( 'Joel.3.2' );
			expect( bcv.parse( 'Joel 4:4 NAB' ).reversify( 'default' ) ).to.equal( 'Joel.3.4' );
			expect( bcv.parse( 'Joel 3:4' ).reversify( 'NAB' ) ).to.equal( 'Joel.4.4' );
			expect( bcv.parse( 'Mal 3:21 NAB' ).reversify( 'default' ) ).to.equal( 'Mal.4.3' );
			expect( bcv.parse( 'Mal 4.3' ).reversify( 'NAB' ) ).to.equal( 'Mal.3.21' );
		});

		it( 'for contained ranges', function()
		{
			expect( bcv.parse( 'Joel 3:3-4:3 NAB' ).reversify( 'default' ) ).to.equal( 'Joel.2.30-Joel.3.3' );
			expect( bcv.parse( 'Joel 2:30-3:3' ).reversify( 'NAB' ) ).to.equal( 'Joel.3.3-Joel.4.3' );
			expect( bcv.parse( 'Mal 3:20-22 NAB' ).reversify( 'default' ) ).to.equal( 'Mal.4.2-Mal.4.4' );
			expect( bcv.parse( 'Mal 4:2-4' ).reversify( 'NAB' ) ).to.equal( 'Mal.3.20-Mal.3.22' );
		});

		it( 'for ranges which are partially non-renumbered', function()
		{
			expect( bcv.parse( 'Joel 2:23-4:3 NAB' ).reversify( 'default' ) ).to.equal( 'Joel.2.23-Joel.3.3' );
			expect( bcv.parse( 'Joel 2:23-3:3' ).reversify( 'NAB' ) ).to.equal( 'Joel.2.23-Joel.4.3' );
			expect( bcv.parse( 'Mal 3:6-22 NAB' ).reversify( 'default' ) ).to.equal( 'Mal.3.6-Mal.4.4' );
			expect( bcv.parse( 'Mal 3:6-4:4' ).reversify( 'NAB' ) ).to.equal( 'Mal.3.6-Mal.3.22' );
		});
	});

	describe( 'should handle Psalm headings', function()
	{
		it( 'for single verses', function()
		{
			expect( bcv.parse( 'Ps 3:5 NAB' ).reversify( 'default' ) ).to.equal( 'Ps.3.4' );
			expect( bcv.parse( 'Ps 3:4' ).reversify( 'NAB' ) ).to.equal( 'Ps.3.5' );
			expect( bcv.parse( 'Ps 51:6 NAB' ).reversify( 'default' ) ).to.equal( 'Ps.51.4' );
			expect( bcv.parse( 'Ps 51:4' ).reversify( 'NAB' ) ).to.equal( 'Ps.51.6' );
		});

		it( 'for whole chapters', function()
		{
			expect( bcv.parse( 'Ps 3 NAB' ).reversify( 'default' ) ).to.equal( 'Ps.3.1-Ps.3.8' );
			expect( bcv.parse( 'Ps 3' ).reversify( 'NAB' ) ).to.equal( 'Ps.3.2-Ps.3.9' );
			expect( bcv.parse( 'Ps 51 NAB' ).reversify( 'default' ) ).to.equal( 'Ps.51.1-Ps.51.19' );
			expect( bcv.parse( 'Ps 51' ).reversify( 'NAB' ) ).to.equal( 'Ps.51.3-Ps.51.21' );
		});

		it( 'and delete them if they are the only verse referenced', function()
		{
			expect( bcv.parse( 'Ps 3:1 NAB' ).reversify( 'default' ) ).to.equal( '' );
			expect( bcv.parse( 'Ps 51:2, 51:1, 51:1-2 NAB' ).reversify( 'default' ) ).to.equal( '' );
		});
	});
});
