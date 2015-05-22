[![Build Status](https://travis-ci.org/svjunic/csv2json.svg?branch=master)](https://travis-ci.org/svjunic/csv2json)

# csv2jsonic
This module returns the CSV file in Json file or object.

## npm

```
npm install csv2jsonic
```

## example

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

##  setup option

### debug
Type: `Boolean`
Default: false

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
