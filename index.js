/*

Reversify
=========

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

var _ = require( 'lodash' );

var transformations = require( './transformations.js' );
var translations = require( './translations.json' );

// Export a function to insert our code into bible-passage-reference-parser
module.exports = function( bcv_parser )
{
	_.merge( bcv_parser.bcv_parser.prototype.translations, translations );
	bcv_parser.bcv_parser.prototype.regexps.translations = new RegExp( '(' + Object.keys( bcv_parser.bcv_parser.prototype.translations.aliases ).join( '|' ) + ')\\b', 'gi' );
	bcv_parser.bcv_parser.prototype.reversify = reversify;
};

// This function returns an OSIS value, so all calls to osis() should be replaced with this
function reversify( to_translation )
{
	var bcv = this;

	// Normalise the requested translation
	to_translation = to_translation ? to_translation.toLowerCase() : 'default';
	to_translation = bcv.translations.aliases[ to_translation ] ? bcv.translations.aliases[ to_translation ].alias : 'default';

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

		// Go through each individual reference
		return group.entities.map( function( entity )
		{
			if ( group_translation !== 'default' )
			{
				entity = transformations( entity, group_translation, true );
			}
			if ( to_translation !== 'default' )
			{
				entity = transformations( entity, to_translation, false );
			}
			if ( entity.deleted )
			{
				return '';
			}
			var start_osis = entity.start.b + '.' + entity.start.c + '.' + entity.start.v;
			var end_osis = entity.start.b + '.' + entity.end.c + '.' + entity.end.v;
			return start_osis === end_osis ? start_osis : start_osis + '-' + end_osis;
		}).join( ',' );
	});

	return entity_groups.join( ',' ).replace( /^,|,(?=,)|,$/g, '' );
}
