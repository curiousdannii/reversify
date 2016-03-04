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
