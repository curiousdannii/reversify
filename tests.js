// Unit tests for Reversify

/*eslint-env mocha */

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

	it( 'should support non-default to non-default reversifications', function()
	{
		expect( bcv.parse( '3 John 14 HCSB' ).reversify( 'KJV' ) ).to.equal( '3John.1.14' );
		expect( bcv.parse( '3 John 14 KJV' ).reversify( 'HCSB' ) ).to.equal( '3John.1.14' );
	});

	it( 'should support additional translations', function()
	{
		expect( bcv.parse( '2 Cor 13:12 HCSB' ).reversify( 'default' ) ).to.equal( '2Cor.13.12-2Cor.13.13' );
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

	describe( 'should handle verses which are split in two', function()
	{
		it( 'for single verses', function()
		{
			expect( bcv.parse( 'Acts 10:48 NAB' ).reversify( 'default' ) ).to.equal( 'Acts.10.48' );
			expect( bcv.parse( 'Acts 10:49 NAB' ).reversify( 'default' ) ).to.equal( 'Acts.10.48' );
			expect( bcv.parse( 'Acts 10:48' ).reversify( 'NAB' ) ).to.equal( 'Acts.10.48-Acts.10.49' );
			expect( bcv.parse( 'Acts 19:40 NAB' ).reversify( 'default' ) ).to.equal( 'Acts.19.40-Acts.19.41' );
			expect( bcv.parse( 'Acts 19.40' ).reversify( 'NAB' ) ).to.equal( 'Acts.19.40' );
			expect( bcv.parse( 'Acts 19.41' ).reversify( 'NAB' ) ).to.equal( 'Acts.19.40' );
		});

		it( 'for overlapping ranges', function()
		{
			expect( bcv.parse( '2 Cor 13:11-12 NAB' ).reversify( 'default' ) ).to.equal( '2Cor.13.11-2Cor.13.13' );
			expect( bcv.parse( '2 Cor 13:11-12' ).reversify( 'NAB' ) ).to.equal( '2Cor.13.11-2Cor.13.12' );
			expect( bcv.parse( '2 Cor 13:11-13' ).reversify( 'NAB' ) ).to.equal( '2Cor.13.11-2Cor.13.12' );
			expect( bcv.parse( '2 Cor 13:12-13 NAB' ).reversify( 'default' ) ).to.equal( '2Cor.13.12-2Cor.13.14' );
			expect( bcv.parse( '2 Cor 13:12-14' ).reversify( 'NAB' ) ).to.equal( '2Cor.13.12-2Cor.13.13' );
			expect( bcv.parse( '2 Cor 13:13-14' ).reversify( 'NAB' ) ).to.equal( '2Cor.13.12-2Cor.13.13' );
			expect( bcv.parse( '1 Kings 22:42-43 NAB' ).reversify( 'default' ) ).to.equal( '1Kgs.22.42-1Kgs.22.43' );
			expect( bcv.parse( '1 Kings 22:42-44 NAB' ).reversify( 'default' ) ).to.equal( '1Kgs.22.42-1Kgs.22.43' );
			expect( bcv.parse( '1 Kings 22:42-43' ).reversify( 'NAB' ) ).to.equal( '1Kgs.22.42-1Kgs.22.44' );
			expect( bcv.parse( '1 Kings 22:43-45 NAB' ).reversify( 'default' ) ).to.equal( '1Kgs.22.43-1Kgs.22.44' );
			expect( bcv.parse( '1 Kings 22:44-45 NAB' ).reversify( 'default' ) ).to.equal( '1Kgs.22.43-1Kgs.22.44' );
			expect( bcv.parse( '1 Kings 22:43-44' ).reversify( 'NAB' ) ).to.equal( '1Kgs.22.43-1Kgs.22.45' );
		});

		it( 'for other affected verses', function()
		{
			expect( bcv.parse( '2 Cor 13:13 NAB' ).reversify( 'default' ) ).to.equal( '2Cor.13.14' );
			expect( bcv.parse( '2 Cor 13:14' ).reversify( 'NAB' ) ).to.equal( '2Cor.13.13' );
			expect( bcv.parse( '1 Kings 22:52 NAB' ).reversify( 'default' ) ).to.equal( '1Kgs.22.51' );
			expect( bcv.parse( '1 Kings 22:51' ).reversify( 'NAB' ) ).to.equal( '1Kgs.22.52' );
		});
	});

	describe( 'should handle verses which are split into many', function()
	{
		it( 'for single verses', function()
		{
			expect( bcv.parse( 'Exodus 20:13 NJPS' ).reversify( 'default' ) ).to.equal( 'Exod.20.13-Exod.20.16' );
			expect( bcv.parse( 'Exodus 20:13' ).reversify( 'NJPS' ) ).to.equal( 'Exod.20.13' );
			expect( bcv.parse( 'Exodus 20:16' ).reversify( 'NJPS' ) ).to.equal( 'Exod.20.13' );
		});

		it( 'for overlapping ranges', function()
		{
			expect( bcv.parse( 'Exodus 20:11-13 NJPS' ).reversify( 'default' ) ).to.equal( 'Exod.20.11-Exod.20.16' );
			expect( bcv.parse( 'Exodus 20:11-13' ).reversify( 'NJPS' ) ).to.equal( 'Exod.20.11-Exod.20.13' );
			expect( bcv.parse( 'Exodus 20:11-16' ).reversify( 'NJPS' ) ).to.equal( 'Exod.20.11-Exod.20.13' );
			expect( bcv.parse( 'Exodus 20:13-15 NJPS' ).reversify( 'default' ) ).to.equal( 'Exod.20.13-Exod.20.18' );
			expect( bcv.parse( 'Exodus 20:13-18' ).reversify( 'NJPS' ) ).to.equal( 'Exod.20.13-Exod.20.15' );
			expect( bcv.parse( 'Exodus 20:16-18' ).reversify( 'NJPS' ) ).to.equal( 'Exod.20.13-Exod.20.15' );
		});

		it( 'for other affected verses', function()
		{
			expect( bcv.parse( 'Exodus 20:18 NJPS' ).reversify( 'default' ) ).to.equal( 'Exod.20.21' );
			expect( bcv.parse( 'Exodus 20:21' ).reversify( 'NJPS' ) ).to.equal( 'Exod.20.18' );
		});
	});

	describe( 'should handle verses which are split in two across chapter breaks', function()
	{
		it( 'for single verses', function()
		{
			expect( bcv.parse( '1 Samuel 20:42 NAB' ).reversify( 'default' ) ).to.equal( '1Sam.20.42' );
			expect( bcv.parse( '1 Samuel 21:1 NAB' ).reversify( 'default' ) ).to.equal( '1Sam.20.42' );
			expect( bcv.parse( '1 Samuel 20:42' ).reversify( 'NAB' ) ).to.equal( '1Sam.20.42-1Sam.21.1' );
			expect( bcv.parse( 'Isaiah 63:19 NAB' ).reversify( 'default' ) ).to.equal( 'Isa.63.19-Isa.64.1' );
			expect( bcv.parse( 'Isaiah 63:19' ).reversify( 'NAB' ) ).to.equal( 'Isa.63.19' );
			expect( bcv.parse( 'Isaiah 64:1' ).reversify( 'NAB' ) ).to.equal( 'Isa.63.19' );
		});

		it( 'for overlapping ranges', function()
		{
			expect( bcv.parse( '1 Samuel 20:41-42 NAB' ).reversify( 'default' ) ).to.equal( '1Sam.20.41-1Sam.20.42' );
			expect( bcv.parse( '1 Samuel 20:41-21:1 NAB' ).reversify( 'default' ) ).to.equal( '1Sam.20.41-1Sam.20.42' );
			expect( bcv.parse( '1 Samuel 20:42-21:2 NAB' ).reversify( 'default' ) ).to.equal( '1Sam.20.42-1Sam.21.1' );
			expect( bcv.parse( '1 Samuel 21:1-2 NAB' ).reversify( 'default' ) ).to.equal( '1Sam.20.42-1Sam.21.1' );
			expect( bcv.parse( '1 Samuel 20:41-42' ).reversify( 'NAB' ) ).to.equal( '1Sam.20.41-1Sam.21.1' );
			expect( bcv.parse( '1 Samuel 20:42-21:1' ).reversify( 'NAB' ) ).to.equal( '1Sam.20.42-1Sam.21.2' );
			expect( bcv.parse( 'Isaiah 63:18-19 NAB' ).reversify( 'default' ) ).to.equal( 'Isa.63.18-Isa.64.1' );
			expect( bcv.parse( 'Isaiah 63:19-64:1 NAB' ).reversify( 'default' ) ).to.equal( 'Isa.63.19-Isa.64.2' );
			expect( bcv.parse( 'Isaiah 63:18-19' ).reversify( 'NAB' ) ).to.equal( 'Isa.63.18-Isa.63.19' );
			expect( bcv.parse( 'Isaiah 63:18-64:1' ).reversify( 'NAB' ) ).to.equal( 'Isa.63.18-Isa.63.19' );
			expect( bcv.parse( 'Isaiah 63:19-64:2' ).reversify( 'NAB' ) ).to.equal( 'Isa.63.19-Isa.64.1' );
			expect( bcv.parse( 'Isaiah 64:1-2' ).reversify( 'NAB' ) ).to.equal( 'Isa.63.19-Isa.64.1' );
		});

		it( 'for other affected verses', function()
		{
			expect( bcv.parse( '1 Samuel 21:5 NAB' ).reversify( 'default' ) ).to.equal( '1Sam.21.4' );
			expect( bcv.parse( '1 Samuel 21:4' ).reversify( 'NAB' ) ).to.equal( '1Sam.21.5' );
			expect( bcv.parse( 'Isaiah 64:5 NAB' ).reversify( 'default' ) ).to.equal( 'Isa.64.6' );
			expect( bcv.parse( 'Isaiah 64:6' ).reversify( 'NAB' ) ).to.equal( 'Isa.64.5' );
		});
	});

	describe( 'should handle deleted verses', function()
	{
		it( 'for the verses themselves', function()
		{
			expect( bcv.parse( 'Joshua 21:36' ).reversify( 'NJPS' ) ).to.equal( '' );
			expect( bcv.parse( 'Joshua 21:37' ).reversify( 'NJPS' ) ).to.equal( '' );
			expect( bcv.parse( 'Joshua 21:36-37' ).reversify( 'NJPS' ) ).to.equal( '' );
		});

		it( 'for overlapping ranges', function()
		{
			expect( bcv.parse( 'Joshua 21:35-36' ).reversify( 'NJPS' ) ).to.equal( 'Josh.21.35' );
			expect( bcv.parse( 'Joshua 21:37-38' ).reversify( 'NJPS' ) ).to.equal( 'Josh.21.36' );
			expect( bcv.parse( 'Joshua 21:34-40' ).reversify( 'NJPS' ) ).to.equal( 'Josh.21.34-Josh.21.38' );
			expect( bcv.parse( 'Joshua 21:36-22:5' ).reversify( 'NJPS' ) ).to.equal( 'Josh.21.36-Josh.22.5' );
			expect( bcv.parse( 'Joshua 20:7-21:37' ).reversify( 'NJPS' ) ).to.equal( 'Josh.20.7-Josh.21.35' );
			expect( bcv.parse( 'Joshua 21:35-36 NJPS' ).reversify( 'default' ) ).to.equal( 'Josh.21.35-Josh.21.38' );
			expect( bcv.parse( 'Joshua 21:37-38 NJPS' ).reversify( 'default' ) ).to.equal( 'Josh.21.39-Josh.21.40' );
		});

		it( 'for other affected verses', function()
		{
			expect( bcv.parse( 'Joshua 21:38-39' ).reversify( 'NJPS' ) ).to.equal( 'Josh.21.36-Josh.21.37' );
			expect( bcv.parse( 'Joshua 21:36-37 NJPS' ).reversify( 'default' ) ).to.equal( 'Josh.21.38-Josh.21.39' );
			expect( bcv.parse( 'Joshua 21:45' ).reversify( 'NJPS' ) ).to.equal( 'Josh.21.43' );
			expect( bcv.parse( 'Joshua 21:43 NJPS' ).reversify( 'default' ) ).to.equal( 'Josh.21.45' );
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
			expect( bcv.parse( 'Ps 29-30' ).reversify( 'NAB' ) ).to.equal( 'Ps.29.1-Ps.30.13' );
			expect( bcv.parse( 'Ps 29-30 NAB' ).reversify( 'default' ) ).to.equal( 'Ps.29.1-Ps.30.12' );
			expect( bcv.parse( 'Ps 30-31' ).reversify( 'NAB' ) ).to.equal( 'Ps.30.2-Ps.31.25' );
			expect( bcv.parse( 'Ps 30-31 NAB' ).reversify( 'default' ) ).to.equal( 'Ps.30.1-Ps.31.24' );
		});

		it( 'and delete them if they are the only verse referenced', function()
		{
			expect( bcv.parse( 'Ps 3:1 NAB' ).reversify( 'default' ) ).to.equal( '' );
			expect( bcv.parse( 'Ps 51:2, 51:1, 51:1-2 NAB' ).reversify( 'default' ) ).to.equal( '' );
		});

		it( 'and split verses within the same chapter', function()
		{
			expect( bcv.parse( 'Ps 13 NAB' ).reversify( 'default' ) ).to.equal( 'Ps.13.1-Ps.13.6' );
			expect( bcv.parse( 'Ps 13' ).reversify( 'NAB' ) ).to.equal( 'Ps.13.2-Ps.13.6' );
			expect( bcv.parse( 'Ps 13:5 NAB' ).reversify( 'default' ) ).to.equal( 'Ps.13.4' );
			expect( bcv.parse( 'Ps 13:6 NAB' ).reversify( 'default' ) ).to.equal( 'Ps.13.5-Ps.13.6' );
			expect( bcv.parse( 'Ps 13:5' ).reversify( 'NAB' ) ).to.equal( 'Ps.13.6' );
			expect( bcv.parse( 'Ps 13:6' ).reversify( 'NAB' ) ).to.equal( 'Ps.13.6' );
			expect( bcv.parse( 'Ps 66 NAB' ).reversify( 'default' ) ).to.equal( 'Ps.66.1-Ps.66.20' );
			expect( bcv.parse( 'Ps 66' ).reversify( 'NAB' ) ).to.equal( 'Ps.66.2-Ps.66.20' );
			expect( bcv.parse( 'Ps 66:2 NAB' ).reversify( 'default' ) ).to.equal( 'Ps.66.1-Ps.66.2' );
			expect( bcv.parse( 'Ps 66:1' ).reversify( 'NAB' ) ).to.equal( 'Ps.66.2' );
			expect( bcv.parse( 'Ps 66:2' ).reversify( 'NAB' ) ).to.equal( 'Ps.66.2' );
		});
	});
});
