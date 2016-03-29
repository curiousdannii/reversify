/*

Reversify transformation generator functions
============================================

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

var fs = require( 'fs' );

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
	var start = entity.start, end = entity.end, book = start.b, chapters;` );

	func();

	console.log( `	// Handle deleted verses
	if ( start.c === end.c && start.v > end.v )
	{
		return null;
	}
	return entity;
};` );
};

module.exports.makebook = ( name, func ) => {
	data.book = name;
	data.trans_check = null;
	console.log( `	if ( book === '${ name }' )
	{` );
	func();
	console.log( `		}
	}` );
};

module.exports.maketransformation = ( type, translations, args ) =>
{
	var trans_check = translations.map( trans => `translation === '${ trans }'` ).join( ' || ' );
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
			break_at = parse_ref( break_at );
			return `// Chapter break ${ data.book } ${ break_at.label }
			if ( start.c === ${ break_at.c } || start.c === ${ break_at.c + 1 } || end.c === ${ break_at.c } || end.c === ${ break_at.c + 1 } )
			{
				do_chapter_break({ early: to_default === ${ direction === 'from' }, entity: entity, c: ${ break_at.c }, v: ${ break_at.v }, count: ${ count } });
			}`;
        },
    },
    chapter_split: {
        func: ( direction, break_at ) => {
			break_at = parse_ref( break_at );
			return `// Chapter split ${ data.book } ${ break_at.label }
			if ( start.c >= ${ break_at.c } || end.c >= ${ break_at.c } )
			{
				do_chapter_split({ early: to_default === ${ direction === 'from' }, entity: entity, c: ${ break_at.c }, v: ${ break_at.v } });
			}`;
        },
    },
    verse_split: {
        func: ( direction, break_at, psalm_heading ) => {
			break_at = parse_ref( break_at );
			return `// Verse split ${ data.book } ${ break_at.label }
			if ( start.c === ${ break_at.c } || end.c === ${ break_at.c } )
			{
				do_verse_split({ split: to_default === ${ direction === 'from' }, entity: entity, c: ${ break_at.c }, v: ${ break_at.v }${ psalm_heading ? ', psalm_heading: 1' : '' } });
			}`;
        },
    },
    verse_split_across_chapters: {
        func: ( direction, break_at ) => {
			break_at = parse_ref( break_at );
			return `// Verse split across a chapter break ${ data.book } ${ break_at.label }
			if ( start.c === ${ break_at.c } || start.c === ${ break_at.c + 1 } || end.c === ${ break_at.c } || end.c === ${ break_at.c + 1 } )
			{
				do_verse_split_across_chapters({ split: to_default === ${ direction === 'from' }, entity: entity, c: ${ break_at.c }, v: ${ break_at.v } });
			}`;
        },
    },
	psalm_heading: {
		func: ( count, chapters ) => {
			return `// Psalm heading ${ count } verse(s)
			chapters = ${ JSON.stringify( chapters ) };
			if ( chapters.indexOf( start.c ) >= 0 || chapters.indexOf( end.c ) >= 0 )
			{
				do_psalm_heading({ to_default: to_default, entity: entity, count: ${ count } });
			}`;
		},
	},
};
