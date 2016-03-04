/*

Reversify transformation generator functions
============================================

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

var _ = require( 'lodash' );
var jsesc = require( 'jsesc' );

// Escape non-ASCII and RegExp special characters
function escape( code )
{
	return _.escapeRegExp( jsesc( String.fromCharCode( code ) ) ).replace( /\\\\/g, '\\' );
}

var data = {};

// Parse a reference into verse-in-book numbers
var ref_pattern = /^(\d+):(\d+)(-((\d+):)?(\d+))?$/;
function parse_ref( ref )
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
	var pattern = escape( result.start.c ) + ':' + ( result.start.v === result.end.v ? escape( result.start.v ) : `[${ escape( result.start.v ) }-${ escape( result.end.v ) }]` );
    result.regex_match = new RegExp( pattern );
	result.regex_start = new RegExp( '^' + pattern );
	result.regex_end = new RegExp( pattern + '$' );
	pattern
	return result;
}

module.exports.topntail = ( func ) => {
    console.log( `/*

Reversify transformations
=========================

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

module.exports = function( translation, entity, to_default )
{
	// Convert the C and V numbers into characters with the format C:V-C:V
	var entity_range = String.fromCharCode( entity.start.c, 58, entity.start.v, 45, entity.end.c, 58, entity.end.v );` );

	func();

	console.log( `	return entity;
};` );
};

module.exports.makebook = ( name, func ) => {
	data.book = name;
	console.log( `	if ( entity.start.b === '${ name }' )
	{` );
	func();
	console.log( `	}` );
};

module.exports.maketransformation = ( type, translations, from, to ) =>
{
    console.log( `		// ${ transforms[type].label } ${ data.book } ${ from } => ${ to }` );
    from = parse_ref( from );
    to = parse_ref( to );
    var trans_check = translations.length > 1 ? `${ JSON.stringify( translations ) }.indexOf( translation ) > -1` : `translation === '${ translations[0] }'`;
	var chap_check = 'entity.end.c === ' + Math.max( from.end.c, to.end.c );
    console.log( `		if ( ${ trans_check } && ( ${ chap_check } || ( to_default ? ${ from.regex_match } : ${ to.regex_match } ).test( entity_range ) ) )
        {
        	${ transforms[type].func( from, to ) }
        }` );
};

var transforms = {
    chapter_break: {
        label: 'Chapter break',
        func: ( from, to ) => {
			var verse_range = to.end.v - to.start.v + 1;
			var verse_offset = from.start.v - to.start.v;
			var to_higher = to.end.c > from.end.c;
			var higher_chap = Math.max( from.end.c, to.end.c );
            return `if ( to_default )
			{
				if ( ${ from.regex_start }.test( entity_range ) )
				{
					entity.start.c = ${ to.start.c };
					entity.start.v -= ${ verse_offset };
				}
				if ( ${ from.regex_end }.test( entity_range ) )
				{
					entity.end.c = ${ to.start.c };
					entity.end.v -= ${ verse_offset };
				}
				else if ( entity.end.c === ${ higher_chap } )
				{
					entity.end.v ${ to_higher ? '+=' : '-=' } ${ verse_range };
				}
			}
			else
			{
				if ( ${ to.regex_start }.test( entity_range ) )
				{
					entity.start.c = ${ from.start.c };
					entity.start.v += ${ verse_offset };
				}
				if ( ${ to.regex_end }.test( entity_range ) )
				{
					entity.end.c = ${ from.start.c };
					entity.end.v += ${ verse_offset };
				}
				else if ( entity.end.c === ${ higher_chap } )
				{
					entity.end.v ${ to_higher ? '-=' : '+=' } ${ verse_range };
				}
			}`;
        },
    },
};
