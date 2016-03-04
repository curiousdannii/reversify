/*

Reversify transformations
=========================

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

var util = require( './util.js' );

module.exports = function( bcv )
{
    return function( translation, entity, to_default )
    {
        // Convert the C and V numbers into characters with the format C:V-C:V
        var entity_range = String.fromCharCode( entity.start.c, 58, entity.start.v, 45, entity.end.c, 58, entity.end.v );
var bookname = /*

Reversify transformations
=========================

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/
'Lev';
if (entity.start.b === 'Lev') {
    var // Chapter break: 5:20-26 => 6:1-7
    from$2 = JSON.parse('{"label":"5:20-26","start":{"c":5,"v":20},"end":{"c":5,"v":26},"pattern":"\\u0005:[\\u0014-\\u001a]","pattern_start":"^\\u0005:[\\u0014-\\u001a]","pattern_end":"\\u0005:[\\u0014-\\u001a]$"}');
    var to$2 = JSON.parse('{"label":"6:1-7","start":{"c":6,"v":1},"end":{"c":6,"v":7},"pattern":"\\u0006:[\\u0001-\\u0007]","pattern_start":"^\\u0006:[\\u0001-\\u0007]","pattern_end":"\\u0006:[\\u0001-\\u0007]$"}');
    if (translation === 'nab' && (to_default ? new RexExp(from$2.pattern) : new RexExp(to$2.pattern)).test(entity_range)) {
        if (!to_default) {
            entity.start.c = to.start.c;
            entity.end.c = to.end.c;
            if (new RexExp(from.pattern_start).test(entity_range)) {
                entity.start.v += to.start.v - from.start.v;
            }
            if (new RexExp(from.pattern_end).test(entity_range)) {
                entity.end.v += to.end.v - from.end.v;
            }
        } else {
            entity.start.c = from.start.c;
            entity.end.c = from.end.c;
            if (new RexExp(to.pattern_start).test(entity_range)) {
                entity.start.v += from.start.v - to.start.v;
            }
            if (new RexExp(to.pattern_end).test(entity_range)) {
                entity.end.v += from.end.v - to.end.v;
            }
        }
    }
}
    };
};

var verse_in_book = util.verse_in_book;
