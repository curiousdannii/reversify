/*

Reversify transformations
=========================

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

// Insert an early chapter break
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

// Split a chapter clean in two
function do_chapter_split( opt )
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
			else if ( ref.c > opt.c )
			{
				ref.c++;
			}
		}
		else
		{
			if ( ref.c > opt.c )
			{
				ref.c--;
				if ( ref.c === opt.c )
				{
					ref.v += opt.v - 1;
				}
			}
		}
	}

	do_one_ref( opt.entity.start );
	do_one_ref( opt.entity.end );
}

// Split a verse in two
function do_verse_split( opt )
{
	// Insert the break
	var entity = opt.entity;
	if ( opt.split )
	{
		opt.v -= opt.psalm_heading || 0;
		if ( entity.start.c === opt.c && entity.start.v > opt.v )
		{
			entity.start.v++;
		}
		if ( entity.end.c === opt.c && entity.end.v >= opt.v )
		{
			entity.end.v++;
		}
	}
	// Join them back together
	else
	{
		if ( entity.start.c === opt.c && entity.start.v >= opt.v + 1 )
		{
			entity.start.v--;
		}
		if ( entity.end.c === opt.c && entity.end.v >= opt.v + 1 )
		{
			entity.end.v--;
		}
	}
}

// Handle Psalm headings which have been made their own verse
function do_psalm_heading( opt )
{
	if ( opt.to_default )
	{
		opt.entity.start.v -= opt.count;
		if ( opt.entity.start.v < 1 )
		{
			opt.entity.start.v = 1;
		}
		opt.entity.end.v -= opt.count;
	}
	else
	{
		opt.entity.start.v += opt.count;
		opt.entity.end.v += opt.count;
	}
}
