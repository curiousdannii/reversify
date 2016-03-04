/*

Reversify transformations
=========================

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

module.exports = function( translation, entity, to_default )
{
    // Convert the C and V numbers into characters with the format C:V-C:V
    var entity_range = String.fromCharCode( entity.start.c, 58, entity.start.v, 45, entity.end.c, 58, entity.end.v );
	if ( entity.start.b = 'Lev' )
	{
		// Chapter break 5:20-26 => 6:1-7
		if ( translation === 'nab' && ( entity.end.c === 6 || ( to_default ? /\x05:[\x14-\x1A]/ : /\x06:[\x01-\x07]/ ).test( entity_range ) ) )
        {
        	if ( to_default )
			{
				if ( /^\x05:[\x14-\x1A]/.test( entity_range ) )
				{
					entity.start.c = 6;
					entity.start.v += -19;
				}
				if ( /\x05:[\x14-\x1A]$/.test( entity_range ) )
				{
					entity.end.c = 6;
					entity.end.v += -19;
				}
				else if ( entity.end.c === 6 )
				{
					entity.end.v += 7;
				}
			}
			else
			{
				if ( /^\x06:[\x01-\x07]/.test( entity_range ) )
				{
					entity.start.c = 5;
					entity.start.v += 19;
				}
				if ( /\x06:[\x01-\x07]$/.test( entity_range ) )
				{
					entity.end.c = 5;
					entity.end.v += 19;
				}
				else if ( entity.end.c === 6 )
				{
					entity.end.v -= 7;
				}
			}
        }
	}
	return entity;
};
