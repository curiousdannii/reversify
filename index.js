/*

Reversify
=========

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

// Export a function to insert our code into bible-passage-reference-parser
module.exports = function( bcv_parser )
{
    bcv_parser.bcv_parser.prototype.reversify = reversify;
};

// This function returns an OSIS value, so all calls to osis() should be replaced with this
function reversify( to_translation )
{
    var bcv = this;

    /// Normalise the requested translation
    to_translation = to_translation ? to_translation.toLowerCase() : 'default';
    to_translation = bcv.translations.aliases[ to_translation ] ? bcv.translations.aliases[ to_translation ].alias : 'default';
    var to_translation_info = bcv.translation_info( to_translation );

    // Go through each group of passages that was parsed
    var entity_groups = bcv.parsed_entities().map( function( group )
    {
        var group_translation = group.translations[0].toLowerCase() || 'default';
        group_translation = bcv.translations.aliases[ group_translation ] ? bcv.translations.aliases[ group_translation ].alias : 'default';

        // Shortcut for when this group has the requested translation
        if ( group_translation === to_translation )
        {
            return group.osis;
        }

        var group_translation_info = bcv.translation_info( group_translation );

        // Go through each individual reference
        return group.entities.map( function( entity )
        {
            var book = entity.start.b;
            var verses, default_verses;

            // The simplest case is when chapters and verses just need to be renumbered
            // Reversify the reference to the default translation
            default_verses = bcv.translations.default.chapters[ book ];
            verses = bcv.translations[ group_translation ].chapters[ book ];
            if ( group_translation !== 'default' && verses )
            {
                renumber_verses( verses, default_verses, entity.start );
                renumber_verses( verses, default_verses, entity.end );
            }
            // Reversify from the default to the requested translation
            verses = bcv.translations[ to_translation ].chapters[ book ];
            if ( to_translation !== 'default' && verses )
            {
                renumber_verses( default_verses, verses, entity.start );
                renumber_verses( default_verses, verses, entity.end );
            }
            var start_osis = book + '.' + entity.start.c + '.' + entity.start.v;
            var end_osis = book + '.' + entity.end.c + '.' + entity.end.v;
            return start_osis === end_osis ? start_osis : start_osis + '-' + end_osis;
        }).join( ',' )
    });

    return entity_groups.join( ',' );
}

// Functions to renumber verses
function renumber_verses( from_verses, to_verses, ref )
{
    // Chapter, verse to verse-in-book
	var chapter_count = 0;
    var vib = 0;
	while ( chapter_count + 1 < ref.c )
	{
		vib += from_verses[ chapter_count ];
		chapter_count++;
	}
	vib += ref.v;
    // Verse-in-book to chapter, verse
    ref.c = 1;
    while ( vib > to_verses[ ref.c - 1 ] )
    {
        vib -= to_verses[ ref.c - 1 ];
        ref.c++;
    }
    ref.v = vib;
}
