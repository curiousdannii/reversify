/*

Reversify transformations
=========================

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

function do_chapter_break( opt )
{
	function do_one_ref( ref )
	{
		// Insert the break early
		if ( opt.early )
		{
			if ( ref.c === opt.c && ref.v >= opt.v )
			{
				ref.c++;
				ref.v -= opt.v - 1;
			}
			else if ( ref.c === opt.c + 1 )
			{
				ref.v += opt.count;
			}
		}
		else
		{
			if ( ref.c === opt.c + 1 )
			{
				ref.v -= opt.count;
				if ( ref.v < 1 )
				{
					ref.c--;
					ref.v += opt.v + opt.count - 1;
				}
			}
		}
	}

	do_one_ref( opt.entity.start );
	do_one_ref( opt.entity.end );
}

module.exports = function( entity, translation, to_default )
{
	// Convert the C and V numbers into characters with the format C:V-C:V
	var entity_range = String.fromCharCode( entity.start.c, 58, entity.start.v, 45, entity.end.c, 58, entity.end.v );
