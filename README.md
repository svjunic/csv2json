[![Build Status](https://travis-ci.org/svjunic/csv2jsonic.svg?branch=master)](https://travis-ci.org/svjunic/csv2jsonic)

# csv2jsonic
This module returns the CSV file in Json file or object.

## npm

```
npm install csv2jsonic
```

## example

```
// require
var csv2jsonic = require('csv2jsonic')();

// option setup
csv2jsonic.setup( { outputJsonPath: './test/json/parameter1.json' } );

return csv2jsonic.loadCSV( './test/csv/parameter2.csv' )
  .then( function ( data ) {
    // complete save json
    console.log( data );
    // [{"user":"sv.junic1","field1":"field1-1Value","field2":{"field2Child1":"field2-1Value","field2Child2":"field2-2Value"},"field3":{"field3Child":{"field3ChildChild":"100"}}}]
  });
```

## Method

### loadCSV
```
// require
var csv2jsonic = require('../csv2jsonic.js')();

// option setup
csv2jsonic.setup( { outputJsonPath: './test/json/parameter1.json' } );

return csv2jsonic.loadCSV( './test/csv/parameter2.csv' )
  .then( function ( data ) {
    // complete save json
    consone.log( data );
    // [{"user":"sv.junic1","field1":"field1-1Value","field2":{"field2Child1":"field2-1Value","field2Child2":"field2-2Value"},"field3":{"field3Child":{"field3ChildChild":"100"}}}]
  });
```

### convert
Convert an array of CSV format to the object of Json format.
```
var testdata = [
  [ "user","field1","field2:mogeta" ],
  [ "sv.junic1","field1Value","field2Value" ]
];
var csv2jsonic = require('../csv2jsonic.js')();
console.log( csv2jsonic.convert( array ) );
// => { user:"sv.junic1", field1:"field1Value", field2:{ mogeta: "field2Value" } }
```

##  setup option

### debug
Type: `Boolean`
Default: false

### charset
Type: `String`
Default: cp932 // shift_jis

Can be utf-8.

### pretty
Type: `Boolean`
Default: false

### delimitter
Type: `String`
Default: '|'

### outputJsonPath
Type: `String`
Default: ''


input
```
user,field1,field2:field2Child1,field2:field2Child2,field3:field3Child:field3ChildChild
sv.junic1,field1Value,field2-1Value,field2-2Value,100
sv.junic1,field1Value,field2-1Value,field2-2Value,100
```

output
```
[
    {
        "user": "sv.junic1",
        "field1": "field1Value",
        "field2": {
            "field2Child1": "field2-1Value",
            "field2Child2": "field2-2Value"
        },
        "field3": {
            "field3Child": {
                "field3ChildChild": "100"
            }
        }
    },
    {
        "user": "sv.junic1",
        "field1": "field1Value",
        "field2": {
            "field2Child1": "field2-1Value",
            "field2Child2": "field2-2Value"
        },
        "field3": {
            "field3Child": {
                "field3ChildChild": "100"
            }
        }
    }
]
```
