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

module.exports = function( entity, translation, to_default )
{
	var start = entity.start, end = entity.end, book = start.b, chapters;
	if ( book === 'Gen' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Gen 31:55
			if ( start.c === 31 || start.c === 32 || end.c === 31 || end.c === 32 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 31, v: 55, count: 1 });
			}
		}
	}
	if ( book === 'Exod' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Exod 7:26
			if ( start.c === 7 || start.c === 8 || end.c === 7 || end.c === 8 )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 7, v: 26, count: 4 });
			}
		}
		if ( translation === 'njps' )
		{
			// Verse split Exod 20:13
			if ( start.c === 20 || end.c === 20 )
			{
				do_verse_split({ split: to_default === true, entity: entity, c: 20, v: 13, count: 3 });
			}
		}
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Exod 21:37
			if ( start.c === 21 || start.c === 22 || end.c === 21 || end.c === 22 )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 21, v: 37, count: 1 });
			}
		}
	}
	if ( book === 'Lev' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Lev 5:20
			if ( start.c === 5 || start.c === 6 || end.c === 5 || end.c === 6 )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 5, v: 20, count: 7 });
			}
		}
	}
	if ( book === 'Num' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Num 16:36
			if ( start.c === 16 || start.c === 17 || end.c === 16 || end.c === 17 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 16, v: 36, count: 15 });
			}
			// Chapter break Num 29:40
			if ( start.c === 29 || start.c === 30 || end.c === 29 || end.c === 30 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 29, v: 40, count: 1 });
			}
		}
	}
	if ( book === 'Deut' )
	{
		if ( translation === 'njps' )
		{
			// Verse split Deut 5:17
			if ( start.c === 5 || end.c === 5 )
			{
				do_verse_split({ split: to_default === true, entity: entity, c: 5, v: 17, count: 3 });
			}
		}
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Deut 12:32
			if ( start.c === 12 || start.c === 13 || end.c === 12 || end.c === 13 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 12, v: 32, count: 1 });
			}
			// Chapter break Deut 22:30
			if ( start.c === 22 || start.c === 23 || end.c === 22 || end.c === 23 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 22, v: 30, count: 1 });
			}
			// Chapter break Deut 28:69
			if ( start.c === 28 || start.c === 29 || end.c === 28 || end.c === 29 )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 28, v: 69, count: 1 });
			}
		}
	}
	if ( book === '1Sam' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Verse split across a chapter break 1Sam 20:42
			if ( start.c === 20 || start.c === 21 || end.c === 20 || end.c === 21 )
			{
				do_verse_split_across_chapters({ split: to_default === false, entity: entity, c: 20, v: 42 });
			}
			// Chapter break 1Sam 23:29
			if ( start.c === 23 || start.c === 24 || end.c === 23 || end.c === 24 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 23, v: 29, count: 1 });
			}
		}
	}
	if ( book === '2Sam' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break 2Sam 18:33
			if ( start.c === 18 || start.c === 19 || end.c === 18 || end.c === 19 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 18, v: 33, count: 1 });
			}
		}
	}
	if ( book === '1Kgs' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break 1Kgs 4:21
			if ( start.c === 4 || start.c === 5 || end.c === 4 || end.c === 5 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 4, v: 21, count: 14 });
			}
			// Verse split 1Kgs 22:43
			if ( start.c === 22 || end.c === 22 )
			{
				do_verse_split({ split: to_default === false, entity: entity, c: 22, v: 43 });
			}
		}
	}
	if ( book === '2Kgs' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break 2Kgs 11:21
			if ( start.c === 11 || start.c === 12 || end.c === 11 || end.c === 12 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 11, v: 21, count: 1 });
			}
		}
	}
	if ( book === '1Chr' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break 1Chr 5:27
			if ( start.c === 5 || start.c === 6 || end.c === 5 || end.c === 6 )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 5, v: 27, count: 15 });
			}
			// Verse split 1Chr 12:4
			if ( start.c === 12 || end.c === 12 )
			{
				do_verse_split({ split: to_default === false, entity: entity, c: 12, v: 4 });
			}
		}
	}
	if ( book === '2Chr' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break 2Chr 1:18
			if ( start.c === 1 || start.c === 2 || end.c === 1 || end.c === 2 )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 1, v: 18, count: 1 });
			}
			// Chapter break 2Chr 13:23
			if ( start.c === 13 || start.c === 14 || end.c === 13 || end.c === 14 )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 13, v: 23, count: 1 });
			}
		}
	}
	if ( book === 'Neh' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Neh 3:33
			if ( start.c === 3 || start.c === 4 || end.c === 3 || end.c === 4 )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 3, v: 33, count: 6 });
			}
			// Verse split Neh 7:67
			if ( start.c === 7 || end.c === 7 )
			{
				do_verse_split({ split: to_default === true, entity: entity, c: 7, v: 67 });
			}
			// Chapter break Neh 9:38
			if ( start.c === 9 || start.c === 10 || end.c === 9 || end.c === 10 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 9, v: 38, count: 1 });
			}
		}
	}
	if ( book === 'Job' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Job 40:25
			if ( start.c === 40 || start.c === 41 || end.c === 40 || end.c === 41 )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 40, v: 25, count: 8 });
			}
		}
	}
	if ( book === 'Ps' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Psalm heading 1 verse(s)
			chapters = [3,4,5,6,7,8,9,12,13,18,19,20,21,22,30,31,34,36,38,39,40,41,42,44,45,46,47,48,49,53,55,56,57,58,59,61,62,63,64,65,66,67,68,69,70,75,76,77,80,81,83,84,85,88,89,92,102,108,140,142];
			if ( chapters.indexOf( start.c ) >= 0 || chapters.indexOf( end.c ) >= 0 )
			{
				do_psalm_heading({ to_default: to_default, entity: entity, count: 1 });
			}
			// Psalm heading 2 verse(s)
			chapters = [51,52,54,60];
			if ( chapters.indexOf( start.c ) >= 0 || chapters.indexOf( end.c ) >= 0 )
			{
				do_psalm_heading({ to_default: to_default, entity: entity, count: 2 });
			}
			// Verse split Ps 13:6
			if ( start.c === 13 || end.c === 13 )
			{
				do_verse_split({ split: to_default === true, entity: entity, c: 13, v: 6, psalm_heading: 1 });
			}
			// Verse split Ps 66:2
			if ( start.c === 66 || end.c === 66 )
			{
				do_verse_split({ split: to_default === true, entity: entity, c: 66, v: 2, psalm_heading: 1 });
			}
		}
		if ( translation === 'nab' )
		{
			// Psalm heading 1 verse(s)
			chapters = [72,109];
			if ( chapters.indexOf( start.c ) >= 0 || chapters.indexOf( end.c ) >= 0 )
			{
				do_psalm_heading({ to_default: to_default, entity: entity, count: 1 });
			}
			// Verse split Ps 2:11
			if ( start.c === 2 || end.c === 2 )
			{
				do_verse_split({ split: to_default === true, entity: entity, c: 2, v: 11 });
			}
			// Verse split Ps 72:2
			if ( start.c === 72 || end.c === 72 )
			{
				do_verse_split({ split: to_default === true, entity: entity, c: 72, v: 2, psalm_heading: 1 });
			}
			// Verse split Ps 109:2
			if ( start.c === 109 || end.c === 109 )
			{
				do_verse_split({ split: to_default === true, entity: entity, c: 109, v: 2, psalm_heading: 1 });
			}
		}
	}
	if ( book === 'Eccl' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Eccl 4:17
			if ( start.c === 4 || start.c === 5 || end.c === 4 || end.c === 5 )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 4, v: 17, count: 1 });
			}
		}
	}
	if ( book === 'Song' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Song 6:13
			if ( start.c === 6 || start.c === 7 || end.c === 6 || end.c === 7 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 6, v: 13, count: 1 });
			}
		}
	}
	if ( book === 'Isa' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Isa 8:23
			if ( start.c === 8 || start.c === 9 || end.c === 8 || end.c === 9 )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 8, v: 23, count: 1 });
			}
			// Verse split across a chapter break Isa 63:19
			if ( start.c === 63 || start.c === 64 || end.c === 63 || end.c === 64 )
			{
				do_verse_split_across_chapters({ split: to_default === true, entity: entity, c: 63, v: 19 });
			}
		}
	}
	if ( book === 'Jer' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Jer 8:23
			if ( start.c === 8 || start.c === 9 || end.c === 8 || end.c === 9 )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 8, v: 23, count: 1 });
			}
		}
	}
	if ( book === 'Ezek' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Ezek 20:45
			if ( start.c === 20 || start.c === 21 || end.c === 20 || end.c === 21 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 20, v: 45, count: 5 });
			}
		}
	}
	if ( book === 'Dan' )
	{
		if ( translation === 'njps' )
		{
			// Chapter break Dan 3:31
			if ( start.c === 3 || start.c === 4 || end.c === 3 || end.c === 4 )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 3, v: 31, count: 3 });
			}
		}
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Dan 5:31
			if ( start.c === 5 || start.c === 6 || end.c === 5 || end.c === 6 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 5, v: 31, count: 1 });
			}
		}
		if ( translation === 'njps' )
		{
			// Verse split Dan 12:11
			if ( start.c === 12 || end.c === 12 )
			{
				do_verse_split({ split: to_default === true, entity: entity, c: 12, v: 11 });
			}
		}
	}
	if ( book === 'Hos' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Hos 1:10
			if ( start.c === 1 || start.c === 2 || end.c === 1 || end.c === 2 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 1, v: 10, count: 2 });
			}
			// Chapter break Hos 11:12
			if ( start.c === 11 || start.c === 12 || end.c === 11 || end.c === 12 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 11, v: 12, count: 1 });
			}
			// Chapter break Hos 13:16
			if ( start.c === 13 || start.c === 14 || end.c === 13 || end.c === 14 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 13, v: 16, count: 1 });
			}
		}
	}
	if ( book === 'Joel' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter split Joel 2:28
			if ( start.c >= 2 || end.c >= 2 )
			{
				do_chapter_split({ early: to_default === false, entity: entity, c: 2, v: 28 });
			}
		}
	}
	if ( book === 'Jonah' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Jonah 1:17
			if ( start.c === 1 || start.c === 2 || end.c === 1 || end.c === 2 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 1, v: 17, count: 1 });
			}
		}
	}
	if ( book === 'Mic' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Mic 4:14
			if ( start.c === 4 || start.c === 5 || end.c === 4 || end.c === 5 )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 4, v: 14, count: 1 });
			}
		}
	}
	if ( book === 'Nah' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Nah 1:15
			if ( start.c === 1 || start.c === 2 || end.c === 1 || end.c === 2 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 1, v: 15, count: 1 });
			}
		}
	}
	if ( book === 'Zech' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter break Zech 1:18
			if ( start.c === 1 || start.c === 2 || end.c === 1 || end.c === 2 )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 1, v: 18, count: 4 });
			}
		}
	}
	if ( book === 'Mal' )
	{
		if ( translation === 'nab' || translation === 'njps' )
		{
			// Chapter split Mal 3:19
			if ( start.c >= 3 || end.c >= 3 )
			{
				do_chapter_split({ early: to_default === true, entity: entity, c: 3, v: 19 });
			}
		}
	}
	if ( book === 'Acts' )
	{
		if ( translation === 'nab' )
		{
			// Verse split Acts 10:48
			if ( start.c === 10 || end.c === 10 )
			{
				do_verse_split({ split: to_default === false, entity: entity, c: 10, v: 48 });
			}
			// Verse split Acts 19:40
			if ( start.c === 19 || end.c === 19 )
			{
				do_verse_split({ split: to_default === true, entity: entity, c: 19, v: 40 });
			}
		}
	}
	if ( book === '2Cor' )
	{
		if ( translation === 'ceb' || translation === 'hcsb' || translation === 'nab' || translation === 'nrsv' )
		{
			// Verse split 2Cor 13:12
			if ( start.c === 13 || end.c === 13 )
			{
				do_verse_split({ split: to_default === true, entity: entity, c: 13, v: 12 });
			}
		}
	}
	if ( book === '3John' )
	{
		if ( translation === 'hcsb' || translation === 'kjv' )
		{
			// Verse split 3John 1:14
			if ( start.c === 1 || end.c === 1 )
			{
				do_verse_split({ split: to_default === true, entity: entity, c: 1, v: 14 });
			}
		}
	}
	if ( book === 'Rev' )
	{
		if ( translation === 'ceb' || translation === 'hcsb' || translation === 'nab' || translation === 'nlt' || translation === 'nrsv' )
		{
			// Verse split Rev 12:17
			if ( start.c === 12 || end.c === 12 )
			{
				do_verse_split({ split: to_default === false, entity: entity, c: 12, v: 17 });
			}
		}
	}
	if ( book === 'Tobit' )
	{
		if ( translation === 'nab' )
		{
			// Verse split Tobit 7:16
			if ( start.c === 7 || end.c === 7 )
			{
				do_verse_split({ split: to_default === false, entity: entity, c: 7, v: 16 });
			}
		}
		if ( translation === 'ceb' || translation === 'nab' )
		{
			// Verse split Tobit 13:16
			if ( start.c === 13 || end.c === 13 )
			{
				do_verse_split({ split: to_default === false, entity: entity, c: 13, v: 16 });
			}
		}
	}
	if ( book === 'PrAzar' )
	{
		if ( translation === 'ceb' )
		{
			// Verse split PrAzar 1:29
			if ( start.c === 1 || end.c === 1 )
			{
				do_verse_split({ split: to_default === true, entity: entity, c: 1, v: 29 });
			}
		}
	}
	if ( book === '2Macc' )
	{
		if ( translation === 'nab' )
		{
			// Verse split 2Macc 12:45
			if ( start.c === 12 || end.c === 12 )
			{
				do_verse_split({ split: to_default === false, entity: entity, c: 12, v: 45 });
			}
		}
	}
	// Handle deleted verses
	if ( start.c === end.c && start.v > end.v )
	{
		return null;
	}
	return entity;
};
