/*

Reversify
=========

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

// Export a function to insert out code into bible-passage-reference-parser
module.exports = function( bcv_parser )
{
    bcv_parser.bcv_parser.prototype.reversify = reversify;
};

// The main reversify function
function reversify( translation )
{
    return this;
}
