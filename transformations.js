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
	if ( entity.start.b === 'Gen' )
	{
		// Chapter break Gen 32:1 => 31:55
		if ( translation === 'nab' && ( entity.end.c === 32 || ( to_default ? / :\x01/ : /\x1F:7/ ).test( entity_range ) ) )
        {
        	if ( to_default )
			{
				if ( /^ :\x01/.test( entity_range ) )
				{
					entity.start.c = 31;
					entity.start.v -= -54;
				}
				if ( / :\x01$/.test( entity_range ) )
				{
					entity.end.c = 31;
					entity.end.v -= -54;
				}
				else if ( entity.end.c === 32 )
				{
					entity.end.v -= 1;
				}
			}
			else
			{
				if ( /^\x1F:7/.test( entity_range ) )
				{
					entity.start.c = 32;
					entity.start.v += -54;
				}
				if ( /\x1F:7$/.test( entity_range ) )
				{
					entity.end.c = 32;
					entity.end.v += -54;
				}
				else if ( entity.end.c === 32 )
				{
					entity.end.v += 1;
				}
			}
        }
	}
	if ( entity.start.b === 'Exod' )
	{
		// Chapter break Exod 7:26-29 => 8:1-4
		if ( translation === 'nab' && ( entity.end.c === 8 || ( to_default ? /\x07:[\x1A-\x1D]/ : /\b:[\x01-\x04]/ ).test( entity_range ) ) )
        {
        	if ( to_default )
			{
				if ( /^\x07:[\x1A-\x1D]/.test( entity_range ) )
				{
					entity.start.c = 8;
					entity.start.v -= 25;
				}
				if ( /\x07:[\x1A-\x1D]$/.test( entity_range ) )
				{
					entity.end.c = 8;
					entity.end.v -= 25;
				}
				else if ( entity.end.c === 8 )
				{
					entity.end.v += 4;
				}
			}
			else
			{
				if ( /^\b:[\x01-\x04]/.test( entity_range ) )
				{
					entity.start.c = 7;
					entity.start.v += 25;
				}
				if ( /\b:[\x01-\x04]$/.test( entity_range ) )
				{
					entity.end.c = 7;
					entity.end.v += 25;
				}
				else if ( entity.end.c === 8 )
				{
					entity.end.v -= 4;
				}
			}
        }
		// Chapter break Exod 21:37 => 22:1
		if ( translation === 'nab' && ( entity.end.c === 22 || ( to_default ? /\x15:%/ : /\x16:\x01/ ).test( entity_range ) ) )
        {
        	if ( to_default )
			{
				if ( /^\x15:%/.test( entity_range ) )
				{
					entity.start.c = 22;
					entity.start.v -= 36;
				}
				if ( /\x15:%$/.test( entity_range ) )
				{
					entity.end.c = 22;
					entity.end.v -= 36;
				}
				else if ( entity.end.c === 22 )
				{
					entity.end.v += 1;
				}
			}
			else
			{
				if ( /^\x16:\x01/.test( entity_range ) )
				{
					entity.start.c = 21;
					entity.start.v += 36;
				}
				if ( /\x16:\x01$/.test( entity_range ) )
				{
					entity.end.c = 21;
					entity.end.v += 36;
				}
				else if ( entity.end.c === 22 )
				{
					entity.end.v -= 1;
				}
			}
        }
	}
	if ( entity.start.b === 'Lev' )
	{
		// Chapter break Lev 5:20-26 => 6:1-7
		if ( translation === 'nab' && ( entity.end.c === 6 || ( to_default ? /\x05:[\x14-\x1A]/ : /\x06:[\x01-\x07]/ ).test( entity_range ) ) )
        {
        	if ( to_default )
			{
				if ( /^\x05:[\x14-\x1A]/.test( entity_range ) )
				{
					entity.start.c = 6;
					entity.start.v -= 19;
				}
				if ( /\x05:[\x14-\x1A]$/.test( entity_range ) )
				{
					entity.end.c = 6;
					entity.end.v -= 19;
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
	if ( entity.start.b === 'Num' )
	{
		// Chapter break Num 17:1-15 => 16:36-50
		if ( translation === 'nab' && ( entity.end.c === 17 || ( to_default ? /\x11:[\x01-\x0F]/ : /\x10:[\$-2]/ ).test( entity_range ) ) )
        {
        	if ( to_default )
			{
				if ( /^\x11:[\x01-\x0F]/.test( entity_range ) )
				{
					entity.start.c = 16;
					entity.start.v -= -35;
				}
				if ( /\x11:[\x01-\x0F]$/.test( entity_range ) )
				{
					entity.end.c = 16;
					entity.end.v -= -35;
				}
				else if ( entity.end.c === 17 )
				{
					entity.end.v -= 15;
				}
			}
			else
			{
				if ( /^\x10:[\$-2]/.test( entity_range ) )
				{
					entity.start.c = 17;
					entity.start.v += -35;
				}
				if ( /\x10:[\$-2]$/.test( entity_range ) )
				{
					entity.end.c = 17;
					entity.end.v += -35;
				}
				else if ( entity.end.c === 17 )
				{
					entity.end.v += 15;
				}
			}
        }
		// Chapter break Num 30:1 => 29:40
		if ( translation === 'nab' && ( entity.end.c === 30 || ( to_default ? /\x1E:\x01/ : /\x1D:\(/ ).test( entity_range ) ) )
        {
        	if ( to_default )
			{
				if ( /^\x1E:\x01/.test( entity_range ) )
				{
					entity.start.c = 29;
					entity.start.v -= -39;
				}
				if ( /\x1E:\x01$/.test( entity_range ) )
				{
					entity.end.c = 29;
					entity.end.v -= -39;
				}
				else if ( entity.end.c === 30 )
				{
					entity.end.v -= 1;
				}
			}
			else
			{
				if ( /^\x1D:\(/.test( entity_range ) )
				{
					entity.start.c = 30;
					entity.start.v += -39;
				}
				if ( /\x1D:\($/.test( entity_range ) )
				{
					entity.end.c = 30;
					entity.end.v += -39;
				}
				else if ( entity.end.c === 30 )
				{
					entity.end.v += 1;
				}
			}
        }
	}
	if ( entity.start.b === 'Deut' )
	{
		// Chapter break Deut 13:1 => 12:32
		if ( translation === 'nab' && ( entity.end.c === 13 || ( to_default ? /\r:\x01/ : /\f: / ).test( entity_range ) ) )
        {
        	if ( to_default )
			{
				if ( /^\r:\x01/.test( entity_range ) )
				{
					entity.start.c = 12;
					entity.start.v -= -31;
				}
				if ( /\r:\x01$/.test( entity_range ) )
				{
					entity.end.c = 12;
					entity.end.v -= -31;
				}
				else if ( entity.end.c === 13 )
				{
					entity.end.v -= 1;
				}
			}
			else
			{
				if ( /^\f: /.test( entity_range ) )
				{
					entity.start.c = 13;
					entity.start.v += -31;
				}
				if ( /\f: $/.test( entity_range ) )
				{
					entity.end.c = 13;
					entity.end.v += -31;
				}
				else if ( entity.end.c === 13 )
				{
					entity.end.v += 1;
				}
			}
        }
		// Chapter break Deut 23:1 => 22:30
		if ( translation === 'nab' && ( entity.end.c === 23 || ( to_default ? /\x17:\x01/ : /\x16:\x1E/ ).test( entity_range ) ) )
        {
        	if ( to_default )
			{
				if ( /^\x17:\x01/.test( entity_range ) )
				{
					entity.start.c = 22;
					entity.start.v -= -29;
				}
				if ( /\x17:\x01$/.test( entity_range ) )
				{
					entity.end.c = 22;
					entity.end.v -= -29;
				}
				else if ( entity.end.c === 23 )
				{
					entity.end.v -= 1;
				}
			}
			else
			{
				if ( /^\x16:\x1E/.test( entity_range ) )
				{
					entity.start.c = 23;
					entity.start.v += -29;
				}
				if ( /\x16:\x1E$/.test( entity_range ) )
				{
					entity.end.c = 23;
					entity.end.v += -29;
				}
				else if ( entity.end.c === 23 )
				{
					entity.end.v += 1;
				}
			}
        }
		// Chapter break Deut 28:69 => 29:1
		if ( translation === 'nab' && ( entity.end.c === 29 || ( to_default ? /\x1C:E/ : /\x1D:\x01/ ).test( entity_range ) ) )
        {
        	if ( to_default )
			{
				if ( /^\x1C:E/.test( entity_range ) )
				{
					entity.start.c = 29;
					entity.start.v -= 68;
				}
				if ( /\x1C:E$/.test( entity_range ) )
				{
					entity.end.c = 29;
					entity.end.v -= 68;
				}
				else if ( entity.end.c === 29 )
				{
					entity.end.v += 1;
				}
			}
			else
			{
				if ( /^\x1D:\x01/.test( entity_range ) )
				{
					entity.start.c = 28;
					entity.start.v += 68;
				}
				if ( /\x1D:\x01$/.test( entity_range ) )
				{
					entity.end.c = 28;
					entity.end.v += 68;
				}
				else if ( entity.end.c === 29 )
				{
					entity.end.v -= 1;
				}
			}
        }
	}
	if ( entity.start.b === 'Song' )
	{
		// Chapter break Song 7:1 => 6:13
		if ( translation === 'nab' && ( entity.end.c === 7 || ( to_default ? /\x07:\x01/ : /\x06:\r/ ).test( entity_range ) ) )
        {
        	if ( to_default )
			{
				if ( /^\x07:\x01/.test( entity_range ) )
				{
					entity.start.c = 6;
					entity.start.v -= -12;
				}
				if ( /\x07:\x01$/.test( entity_range ) )
				{
					entity.end.c = 6;
					entity.end.v -= -12;
				}
				else if ( entity.end.c === 7 )
				{
					entity.end.v -= 1;
				}
			}
			else
			{
				if ( /^\x06:\r/.test( entity_range ) )
				{
					entity.start.c = 7;
					entity.start.v += -12;
				}
				if ( /\x06:\r$/.test( entity_range ) )
				{
					entity.end.c = 7;
					entity.end.v += -12;
				}
				else if ( entity.end.c === 7 )
				{
					entity.end.v += 1;
				}
			}
        }
	}
	if ( entity.start.b === 'Jonah' )
	{
		// Chapter break Jonah 2:1 => 1:17
		if ( translation === 'nab' && ( entity.end.c === 2 || ( to_default ? /\x02:\x01/ : /\x01:\x11/ ).test( entity_range ) ) )
        {
        	if ( to_default )
			{
				if ( /^\x02:\x01/.test( entity_range ) )
				{
					entity.start.c = 1;
					entity.start.v -= -16;
				}
				if ( /\x02:\x01$/.test( entity_range ) )
				{
					entity.end.c = 1;
					entity.end.v -= -16;
				}
				else if ( entity.end.c === 2 )
				{
					entity.end.v -= 1;
				}
			}
			else
			{
				if ( /^\x01:\x11/.test( entity_range ) )
				{
					entity.start.c = 2;
					entity.start.v += -16;
				}
				if ( /\x01:\x11$/.test( entity_range ) )
				{
					entity.end.c = 2;
					entity.end.v += -16;
				}
				else if ( entity.end.c === 2 )
				{
					entity.end.v += 1;
				}
			}
        }
	}
	if ( entity.start.b === 'Mic' )
	{
		// Chapter break Mic 4:14 => 5:1
		if ( translation === 'nab' && ( entity.end.c === 5 || ( to_default ? /\x04:\x0E/ : /\x05:\x01/ ).test( entity_range ) ) )
        {
        	if ( to_default )
			{
				if ( /^\x04:\x0E/.test( entity_range ) )
				{
					entity.start.c = 5;
					entity.start.v -= 13;
				}
				if ( /\x04:\x0E$/.test( entity_range ) )
				{
					entity.end.c = 5;
					entity.end.v -= 13;
				}
				else if ( entity.end.c === 5 )
				{
					entity.end.v += 1;
				}
			}
			else
			{
				if ( /^\x05:\x01/.test( entity_range ) )
				{
					entity.start.c = 4;
					entity.start.v += 13;
				}
				if ( /\x05:\x01$/.test( entity_range ) )
				{
					entity.end.c = 4;
					entity.end.v += 13;
				}
				else if ( entity.end.c === 5 )
				{
					entity.end.v -= 1;
				}
			}
        }
	}
	return entity;
};
