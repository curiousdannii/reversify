/*

Reversify transformation macros
===============================

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

macro str {
    case { _ $tok } => {
        return [makeValue( unwrapSyntax( #{ $tok } ), null )];
    }
}

macro data
{
    rule { { $x ... } } => {
        var gen = require( './src/generator.js' );
        gen.topntail( () => { $x ... } );
    }
}
export data;

macro book
{
    rule { $bookname:str { $x ... } } => {
        gen.makebook( $bookname, () => { $x ... } );
    }
}
export book;

macro transformation
{
    rule { chapter_break $direction:str $translations:str (,) ... @ $break $count } => {
        gen.maketransformation( 'chapter_break', [ $translations (,) ... ], [ $direction, $break, $count ] );
    }
}
export transformation;
