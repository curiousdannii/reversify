/*

Reversify transformation generator functions
============================================

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

var _ = require( 'lodash' );
var fs = require( 'fs' );
var jsesc = require( 'jsesc' );

// Escape non-ASCII and RegExp special characters
function char( code )
{
	return _.escapeRegExp( jsesc( String.fromCharCode( code ) ) ).replace( /\\\\/g, '\\' );
}

var data = {};

// Create a RegExp, and cleanup any repeated character classes
function regex( pattern )
{
	return new RegExp( pattern.replace( /\[([^-]+)-([^-]+)\]/g, ( match, a, b ) => a === b ? a : match ) );
}

// Parse a single verse reference
function parse_ref( ref )
{
	var cv = ref.split( ':' );
	return {
		label: ref,
		c: +cv[0],
		v: +cv[1],
	};
}

module.exports.topntail = ( func ) => {
    console.log( fs.readFileSync( './src/header.js', 'utf8' ) );

	console.log( `module.exports = function( entity, translation, to_default )
{
	var chapters;` );

	func();

	console.log( `	// Handle deleted verses
	if ( entity.start.c === entity.end.c && entity.start.v > entity.end.v )
	{
		return null;
	}
	return entity;
};` );
};

module.exports.makebook = ( name, func ) => {
	data.book = name;
	data.trans_check = null;
	console.log( `	if ( entity.start.b === '${ name }' )
	{` );
	func();
	console.log( `		}
	}` );
};

module.exports.maketransformation = ( type, translations, args ) =>
{
    var trans_check = translations.length > 1 ? `${ JSON.stringify( translations ) }.indexOf( translation ) > -1` : `translation === '${ translations[0] }'`;
	if ( data.trans_check !== trans_check )
	{
		if ( data.trans_check != null )
		{
			console.log( `		}` );
		}
		data.trans_check = trans_check;
		console.log( `		if ( ${ trans_check } )
		{` );
	}
	console.log( `			${ transforms[type].func.apply( null, args ) }` );
};

var transforms = {
    chapter_break: {
        func: ( direction, break_at, count ) => {
			var dir_from = direction === 'from';
			break_at = parse_ref( break_at );
			return `// Chapter break ${ data.book } ${ break_at.label }
			if ( entity.start.c === ${ break_at.c } || entity.start.c === ${ break_at.c + 1 } || entity.end.c === ${ break_at.c } || entity.end.c === ${ break_at.c + 1 } )
			{
				do_chapter_break({ early: to_default === ${ dir_from }, entity: entity, c: ${ break_at.c }, v: ${ break_at.v }, count: ${ count } });
			}`;
        },
    },
	psalm_heading: {
		func: ( count, chapters ) => {
			var chap_regex = regex( `[${ chapters.map( c => char( c ) ).join( '' ) }]:` );

			return `// Psalm heading ${ count } verse(s)
			chapters = ${ JSON.stringify( chapters ) };
			if ( chapters.indexOf( entity.start.c ) >= 0 || chapters.indexOf( entity.end.c ) >= 0 )
			{
				do_psalm_heading({ to_default: to_default, entity: entity, count: ${ count } });
			}`;
		},
	},
};
