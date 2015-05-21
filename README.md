[![Build Status](https://travis-ci.org/svjunic/csv2json.svg)](https://travis-ci.org/svjunic/csv2json)

# csv2json
This module returns the CSV file in Json file or object.

input.csv
```
user,field1,field2:field2Child1,field2:field2Child2,field3:field3Child:field3ChildChild
sv.junic1,field1Value,field2-1Value,field2-2Value,100
sv.junic1,field1Value,field2-1Value,field2-2Value,100
sv.junic1,field1Value,field2-1Value,field2-2Value,100
sv.junic1,field1Value,field2-1Value,field2-2Value,100
sv.junic1,field1Value,field2-1Value,field2-2Value,100
sv.junic1,field1Value,field2-1Value,field2-2Value,100
```

output.json
```
[{"user":"sv.junic1","field1":"field1Value","field2":{"field2Child1":"field2-1Value","field2Child2":"field2-2Value"},"field3":{"field3Child":{"field3ChildChild":"100"}}},{"user":"sv.junic1","field1":"field1Value","field2":{"field2Child1":"field2-1Value","field2Child2":"field2-2Value"},"field3":{"field3Child":{"field3ChildChild":"100"}}},{"user":"sv.junic1","field1":"field1Value","field2":{"field2Child1":"field2-1Value","field2Child2":"field2-2Value"},"field3":{"field3Child":{"field3ChildChild":"100"}}},{"user":"sv.junic1","field1":"field1Value","field2":{"field2Child1":"field2-1Value","field2Child2":"field2-2Value"},"field3":{"field3Child":{"field3ChildChild":"100"}}},{"user":"sv.junic1","field1":"field1Value","field2":{"field2Child1":"field2-1Value","field2Child2":"field2-2Value"},"field3":{"field3Child":{"field3ChildChild":"100"}}},{"user":"sv.junic1","field1":"field1Value","field2":{"field2Child1":"field2-1Value","field2Child2":"field2-2Value"},"field3":{"field3Child":{"field3ChildChild":"100"}}}]
```

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
