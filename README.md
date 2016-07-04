# Reversify

[![npm](https://img.shields.io/npm/v/reversify.svg)](https://www.npmjs.com/package/reversify)
[![Travis build status](https://img.shields.io/travis/curiousdannii/reversify.svg)](https://travis-ci.org/curiousdannii/reversify)
[![dependencies status](https://img.shields.io/david/curiousdannii/reversify.svg)](https://david-dm.org/curiousdannii/reversify)
[![devDependencies status](https://img.shields.io/david/dev/curiousdannii/reversify.svg)](https://david-dm.org/curiousdannii/reversify#info=devDependencies)

A plugin for [bible-passage-reference-parser](https://www.npmjs.com/package/bible-passage-reference-parser) to change versification systems.

Copyright (c) 2016 Dannii Willis, MIT licenced

## Usage

```
var bcv_parser = require( 'bible-passage-reference-parser/js/en_bcv_parser' );

// Install the plugin
require( 'reversify' )( bcv_parser );
var bcv = new bcv_parser.bcv_parser();

bcv.parse( 'Lev 5:21 NAB' ).reversify( 'default' );
// Lev.6.2
```

## Supported translations

 - CEB (incomplete support outside the Protestant Canon)
 - ESV
 - GNT (Good News)
 - HCSB
 - KJV, NKJV
 - NAB, NABRE (except for Daniel)
 - NASB
 - NET
 - NIV, NRIV, TNIV
 - NJPS
 - NLT
 - NRSV
