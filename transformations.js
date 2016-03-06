/*

Reversify transformations
=========================

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

// Convert the C and V numbers into characters with the format C:V-C:V
function make_range_string( entity )
{
	return String.fromCharCode( entity.start.c, 58, entity.start.v, 45, entity.end.c, 58, entity.end.v );
}

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
	var entity_range = make_range_string( entity );
	if ( entity.start.b === 'Gen' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Gen 31:55
			if ( ( !to_default ? /\x1F:7| :/ : / :/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 31, v: 55, count: 1 });
			}
		}
	}
	if ( entity.start.b === 'Exod' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Exod 7:26
			if ( ( to_default ? /\x07:[\x1A-\x1D]|\b:/ : /\b:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 7, v: 26, count: 4 });
			}
			// Chapter break Exod 21:37
			if ( ( to_default ? /\x15:%|\x16:/ : /\x16:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 21, v: 37, count: 1 });
			}
		}
	}
	if ( entity.start.b === 'Lev' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Lev 5:20
			if ( ( to_default ? /\x05:[\x14-\x1A]|\x06:/ : /\x06:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 5, v: 20, count: 7 });
			}
		}
	}
	if ( entity.start.b === 'Num' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Num 16:36
			if ( ( !to_default ? /\x10:[\$-2]|\x11:/ : /\x11:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 16, v: 36, count: 15 });
			}
			// Chapter break Num 29:40
			if ( ( !to_default ? /\x1D:\(|\x1E:/ : /\x1E:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 29, v: 40, count: 1 });
			}
		}
	}
	if ( entity.start.b === 'Deut' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Deut 12:32
			if ( ( !to_default ? /\f: |\r:/ : /\r:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 12, v: 32, count: 1 });
			}
			// Chapter break Deut 22:30
			if ( ( !to_default ? /\x16:\x1E|\x17:/ : /\x17:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 22, v: 30, count: 1 });
			}
			// Chapter break Deut 28:69
			if ( ( to_default ? /\x1C:E|\x1D:/ : /\x1D:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 28, v: 69, count: 1 });
			}
		}
	}
	if ( entity.start.b === '1Sam' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break 1Sam 23:29
			if ( ( !to_default ? /\x17:\x1D|\x18:/ : /\x18:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 23, v: 29, count: 1 });
			}
		}
	}
	if ( entity.start.b === '2Sam' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break 2Sam 18:33
			if ( ( !to_default ? /\x12:!|\x13:/ : /\x13:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 18, v: 33, count: 1 });
			}
		}
	}
	if ( entity.start.b === '1Kgs' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break 1Kgs 4:21
			if ( ( !to_default ? /\x04:[\x15-"]|\x05:/ : /\x05:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 4, v: 21, count: 14 });
			}
		}
	}
	if ( entity.start.b === '2Kgs' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break 2Kgs 11:21
			if ( ( !to_default ? /\x0B:\x15|\f:/ : /\f:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 11, v: 21, count: 1 });
			}
		}
	}
	if ( entity.start.b === '1Chr' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break 1Chr 5:27
			if ( ( to_default ? /\x05:[\x1B-\)]|\x06:/ : /\x06:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 5, v: 27, count: 15 });
			}
		}
	}
	if ( entity.start.b === '2Chr' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break 2Chr 1:18
			if ( ( to_default ? /\x01:\x12|\x02:/ : /\x02:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 1, v: 18, count: 1 });
			}
			// Chapter break 2Chr 13:23
			if ( ( to_default ? /\r:\x17|\x0E:/ : /\x0E:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 13, v: 23, count: 1 });
			}
		}
	}
	if ( entity.start.b === 'Neh' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Neh 3:33
			if ( ( to_default ? /\x03:[!-&]|\x04:/ : /\x04:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 3, v: 33, count: 6 });
			}
			// Chapter break Neh 9:38
			if ( ( !to_default ? /\t:&|\n:/ : /\n:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 9, v: 38, count: 1 });
			}
		}
	}
	if ( entity.start.b === 'Job' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Job 40:25
			if ( ( to_default ? /\(:[\x19- ]|\):/ : /\):/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 40, v: 25, count: 8 });
			}
		}
	}
	if ( entity.start.b === 'Ps' )
	{
		if ( translation === 'nab' )
		{
			// Psalm heading 1 verse(s) @ 3, 4, 5, 6, 7, 8, 9, 12, 13, 18, 19, 20, 22, 30, 31, 34, 36, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 49, 53, 55, 56, 57, 58, 59, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 72, 75, 76, 77, 80, 81, 83, 84, 85, 88, 89, 92, 102, 108, 109, 140, 142
			if ( /[\x03\x04\x05\x06\x07\b\t\f\r\x12\x13\x14\x16\x1E\x1F"\$&\'\(\)\*,-\.\/015789:;=>\?@ABCDEFHKLMPQSTUXY\\flm\x8C\x8E]:/.test( entity_range ) )
			{
				do_psalm_heading({ to_default: to_default, entity: entity, count: 1 });
				entity_range = make_range_string( entity );
			}
			// Psalm heading 2 verse(s) @ 51, 52, 54, 60
			if ( /[346<]:/.test( entity_range ) )
			{
				do_psalm_heading({ to_default: to_default, entity: entity, count: 2 });
				entity_range = make_range_string( entity );
			}
		}
	}
	if ( entity.start.b === 'Eccl' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Eccl 4:17
			if ( ( to_default ? /\x04:\x11|\x05:/ : /\x05:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 4, v: 17, count: 1 });
			}
		}
	}
	if ( entity.start.b === 'Song' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Song 6:13
			if ( ( !to_default ? /\x06:\r|\x07:/ : /\x07:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 6, v: 13, count: 1 });
			}
		}
	}
	if ( entity.start.b === 'Is' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Is 8:23
			if ( ( to_default ? /\b:\x17|\t:/ : /\t:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 8, v: 23, count: 1 });
			}
		}
	}
	if ( entity.start.b === 'Jer' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Jer 8:23
			if ( ( to_default ? /\b:\x17|\t:/ : /\t:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 8, v: 23, count: 1 });
			}
		}
	}
	if ( entity.start.b === 'Ezek' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Ezek 20:45
			if ( ( !to_default ? /\x14:[--1]|\x15:/ : /\x15:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 20, v: 45, count: 5 });
			}
		}
	}
	if ( entity.start.b === 'Dan' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Dan 5:31
			if ( ( !to_default ? /\x05:\x1F|\x06:/ : /\x06:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 5, v: 31, count: 1 });
			}
		}
	}
	if ( entity.start.b === 'Hos' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Hos 1:10
			if ( ( !to_default ? /\x01:[\n-\x0B]|\x02:/ : /\x02:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 1, v: 10, count: 2 });
			}
			// Chapter break Hos 11:12
			if ( ( !to_default ? /\x0B:\f|\f:/ : /\f:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 11, v: 12, count: 1 });
			}
			// Chapter break Hos 13:16
			if ( ( !to_default ? /\r:\x10|\x0E:/ : /\x0E:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 13, v: 16, count: 1 });
			}
		}
	}
	if ( entity.start.b === 'Jonah' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Jonah 1:17
			if ( ( !to_default ? /\x01:\x11|\x02:/ : /\x02:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 1, v: 17, count: 1 });
			}
		}
	}
	if ( entity.start.b === 'Mic' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Mic 4:14
			if ( ( to_default ? /\x04:\x0E|\x05:/ : /\x05:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === true, entity: entity, c: 4, v: 14, count: 1 });
			}
		}
	}
	if ( entity.start.b === 'Nah' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Nah 1:15
			if ( ( !to_default ? /\x01:\x0F|\x02:/ : /\x02:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 1, v: 15, count: 1 });
			}
		}
	}
	if ( entity.start.b === 'Zech' )
	{
		if ( translation === 'nab' )
		{
			// Chapter break Zech 1:18
			if ( ( !to_default ? /\x01:[\x12-\x15]|\x02:/ : /\x02:/ ).test( entity_range ) )
			{
				do_chapter_break({ early: to_default === false, entity: entity, c: 1, v: 18, count: 4 });
			}
		}
	}
	// Handle deleted verses
	if ( entity.start.c === entity.end.c && entity.start.v > entity.end.v )
	{
		return null;
	}
	return entity;
};
