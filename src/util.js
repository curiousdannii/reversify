/*

Reversify util functions (for use in macros)
============================================

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

var bcv_parser = require( 'bible-passage-reference-parser/js/en_bcv_parser' ).bcv_parser.prototype;

// Data for sharing between macros
global.data = {};

// Parse a reference into verse-in-book numbers
var ref_pattern = /^(\d+):(\d+)(-((\d+):)?(\d+))?$/;
function parse_ref( ref, translation )
{
	var matches = ref_pattern.exec( ref );
    var result = {
        label: ref,
        start: {
            c: +matches[1],
            v: +matches[2],
        },
        end: {
            c: +matches[5] || +matches[1],
            v: +matches[6] || +matches[2],
        },
    };

	// Make regexes for matching verses
	if ( result.start.c !== result.end.c )
	{
		throw new Error( 'Transforms ranging over multiple chapters are not yet supported' );
	}
	// C:[V-V]
	result.pattern = String.fromCharCode( result.start.c, 58, 91, result.start.v, 45, result.end.v, 93 );
	result.pattern_start = '^' + result.pattern;
	result.pattern_end = result.pattern + '$';
    //result.start.vib = verse_in_book( translation, data.book, result.start.c, result.start.v );
    //result.end.vib = verse_in_book( translation, data.book, result.end.c, result.end.v );
	return result;
}

// Calculate the verse number in the whole of a book
function verse_in_book( translation, book, chapter, verse )
{
    var chapters = bcv_parser.translations[ translation ].chapters;
	var c = 0;
	var v = 0;
	while ( c + 1 < chapter )
	{
		v += chapters[ book ][ c ];
		c++;
	}
	return v + verse;
}

module.exports = {
    parse_ref: parse_ref,
    verse_in_book: verse_in_book,
};
