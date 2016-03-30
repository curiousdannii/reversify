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

macro chapter
{
    rule { break from default to $translations:str (,) ... @ $break } => {
        gen.maketransformation( 'chapter_break', [ $translations (,) ... ], [ 'from', $break ] );
    }
    rule { break from $translations:str (,) ... to default @ $break } => {
        gen.maketransformation( 'chapter_break', [ $translations (,) ... ], [ 'to', $break ] );
    }
    rule { split from default to $translations:str (,) ... @ $break } => {
        gen.maketransformation( 'chapter_split', [ $translations (,) ... ], [ 'from', $break ] );
    }
    rule { split from $translations:str (,) ... to default @ $break } => {
        gen.maketransformation( 'chapter_split', [ $translations (,) ... ], [ 'to', $break ] );
    }
}
export chapter;

macro verse
{
    rule { split from default to $translations:str (,) ... @ $break } => {
        gen.maketransformation( 'verse_split', [ $translations (,) ... ], [ 'from', $break ] );
    }
    rule { split from $translations:str (,) ... to default @ $break after a psalm heading } => {
        gen.maketransformation( 'verse_split', [ $translations (,) ... ], [ 'to', $break, true ] );
    }
    rule { split from $translations:str (,) ... to default @ $break } => {
        gen.maketransformation( 'verse_split', [ $translations (,) ... ], [ 'to', $break ] );
    }
    rule { split across chapters from default to $translations:str (,) ... @ $break } => {
        gen.maketransformation( 'verse_split_across_chapters', [ $translations (,) ... ], [ 'from', $break ] );
    }
    rule { split across chapters from $translations:str (,) ... to default @ $break } => {
        gen.maketransformation( 'verse_split_across_chapters', [ $translations (,) ... ], [ 'to', $break ] );
    }
}
export verse;

macro psalm
{
    rule { heading $translations:str (,) ... $count $verses @ $chapters (,) ... } => {
        gen.maketransformation( 'psalm_heading', [ $translations (,) ... ], [ $count, [ $chapters (,) ... ] ] );
    }
}
export psalm;
