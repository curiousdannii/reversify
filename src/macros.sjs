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
    rule { $type:str $translations:str (,) ... $from => $to } => {
        gen.maketransformation( $type, [ $translations (,) ... ], $from, $to );
    }
}
export transformation;
