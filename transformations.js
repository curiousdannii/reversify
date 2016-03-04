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
	return entity;
};
