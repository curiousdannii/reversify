/*

Reversify transformation macros
===============================

Copyright (c) 2016 Dannii Willis
MIT licenced
http://github.com/curiousdannii/reversify

*/

macro book
{
    case { _ $bookname { $x ... } } => {
        var util = require( './util.js' );
        this.data.book = unwrapSyntax( #{ $bookname } );
        return #{
            var bookname = $bookname;
            if ( entity.start.b === $bookname ) { $x ... }
        };
    }
}
export book;

macro generic_transform
{
    case { _ $translations (,) ... $from => $to { $x ... } } => {
        var util = require( './util.js' );
        this.data.translation = unwrapSyntax( #{ $translations ... }[0] );
        var from_obj = util.parse_ref( unwrapSyntax( #{ $from } ), this.data.translation );
        var to_obj = util.parse_ref( unwrapSyntax( #{ $to } ), 'default' );
        //letstx $transform_translation = [ #{ $translations ... }[0] ];

        // Make regexes for matching verses
        /*letstx $from_regex = makeRegex( from.pattern, '', null );
        letstx $to_regex = makeRegex( to.pattern, '', null );*/
        letstx $from_obj = [makeValue( JSON.stringify( from_obj ), null )];
        letstx $to_obj = [makeValue( JSON.stringify( to_obj ), null )];

        var result = #{
            var from = JSON.parse( $from_obj );
            var to = JSON.parse( $to_obj );
            if ( ( ( translation === $translations ) (||) ... ) && ( to_default ? new RexExp( from.pattern ) : new RexExp( to.pattern ) ).test( entity_range ) ) { $x ... }
        };
        result[0].addLineComment( ' ' + this.data.label + ': ' + from_obj.label + ' => ' + to_obj.label );
        return result;
    }
}
export generic_transform;

macro chapter_break
{
    case { _ $translations (,) ... $from => $to } => {
        var util = require( './util.js' );
        this.data.label = 'Chapter break';
        return #{
            generic_transform $translations (,) ... $from => $to
            {
                if ( !to_default )
                {
                    entity.start.c = to.start.c;
                    entity.end.c = to.end.c;
                    if ( new RexExp( from.pattern_start ).test( entity_range ) )
                    {
                        entity.start.v += to.start.v - from.start.v;
                    }
                    if ( new RexExp( from.pattern_end ).test( entity_range ) )
                    {
                        entity.end.v += to.end.v - from.end.v;
                    }
                }
                else
                {
                    entity.start.c = from.start.c;
                    entity.end.c = from.end.c;
                    if ( new RexExp( to.pattern_start ).test( entity_range ) )
                    {
                        entity.start.v += from.start.v - to.start.v;
                    }
                    if ( new RexExp( to.pattern_end ).test( entity_range ) )
                    {
                        entity.end.v += from.end.v - to.end.v;
                    }
                }
            }
        };
    }
}
export chapter_break;
