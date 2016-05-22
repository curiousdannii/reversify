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
	function do_one_ref( ref, verse_test )
	{
		// Split the verse
		if ( opt.split )
		{
			if ( ref.c === opt.c && verse_test )
			{
				ref.v += count;
			}
		}
		// Join them back together
		else
		{
			if ( ref.c === opt.c && ref.v >= opt.v + 1 )
			{
				ref.v -= count;
			}
		}
	}

	var count = opt.count || 1;
	if ( opt.split )
	{
		opt.v -= opt.psalm_heading || 0;
	}
	do_one_ref( opt.entity.start, opt.entity.start.v > opt.v );
	do_one_ref( opt.entity.end, opt.entity.end.v >= opt.v );
}

// Split a verse in two across a chapter break
function do_verse_split_across_chapters( opt )
{
	function do_one_ref( ref, verse_test )
	{
		// Split the verse
		if ( opt.split )
		{
			if ( ref.c === opt.c && verse_test )
			{
				ref.c++;
				ref.v = 1;
			}
			else if ( ref.c === opt.c + 1 )
			{
				ref.v++;
			}
		}
		// Join them back together
		else
		{
			if ( ref.c === opt.c + 1 && ref.v === 1 )
			{
				ref.c = opt.c;
				ref.v = opt.v;
			}
			if ( ref.c === opt.c + 1 )
			{
				ref.v--;
			}
		}
	}

	do_one_ref( opt.entity.start, opt.entity.start.v > opt.v );
	do_one_ref( opt.entity.end, opt.entity.end.v >= opt.v );
}

// Handle verses which are completely deleted
function do_delete( opt )
{
	function do_one_ref( ref )
	{
		// Account for the missing verses
		if ( opt.to_default )
		{
			if ( ref.c === opt.c && ref.v >= opt.v )
			{
				ref.v += opt.count;
			}
		}
		// Delete the verses
		else
		{
			if ( ref.c === opt.c )
			{
				if ( ref.v >= opt.v && ref.v < opt.v + opt.count )
				{
					ref.deleted = 1;
				}
				else if ( ref.v > opt.v )
				{
					ref.v -= opt.count;
				}
			}
		}
	}

	var start = opt.entity.start, end = opt.entity.end;
	do_one_ref( start );
	do_one_ref( end );

	// Mark deleted entries
	if ( start.deleted && end.deleted )
	{
		opt.entity.deleted = 1;
	}
	// Fix broken ranges
	else if ( start.deleted )
	{
		start.v = opt.v;
	}
	else if ( end.deleted )
	{
		end.v = opt.v - 1;
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
