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
		var matt_1_1 = bcv.parse( 'Matthew 1:1' );
		expect( matt_1_1.reversify( 'default' ).osis() ).to.equal( 'Matt.1.1' );
		expect( matt_1_1.reversify( 'esv' ).osis() ).to.equal( 'Matt.1.1' );
	});
});
