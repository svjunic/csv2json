var fs = require('fs');
var csv = require('csv');
var Iconv = require('iconv').Iconv;
var conv = new Iconv('cp932','utf-8');
var _ = require('lodash');

var q = require('q');

function dumpCsv( path ) {
  var def = q.defer();
  var json_array = [];

  fs.readFile( path, function(err, sjisBuf) {
    var buf = conv.convert(sjisBuf);
    console.log( 'CSV Loading:' + path + ' *=-');
    csv.parse(buf.toString(),{comment:'#'}, function(err, data) {
      json_array.push( data );
      def.resolve( json_array );
    });
  });

  return def.promise;
}

dumpCsv( 'input.csv' )
  .done( function ( data ) {
    var dataValue = data[0];
    var dataName = dataValue.shift();

    // valueが配列の場合は深い階層にJsonを構築するため配列化
    _.forEach( dataName, function ( value, key, object ) {
      if( /:/.test( value ) ) {
        dataName[ key ] = value.split( ':' ).reverse();
      }
    });



    var createJson =  _.map( dataValue, function ( values ) {
      var newData = {};

      _.forEach( values, function ( value, key, object ) {
        var hash = dataName[key];
        if( hash &&
          typeof hash === 'object' &&
          typeof hash.length === 'number' &&
          typeof hash.splice === 'function' &&
          !(hash.propertyIsEnumerable('length')) ) {
            newData = _.merge( newData, deepProperty( hash, value ) )
          } else {
            newData[ dataName[key] ] = value;
          }
        });
        console.log( newData );
        return newData;
      });

    var str = JSON.stringify( createJson );
    fs.writeFile('output.json', str );
  });

function deepProperty( hash, newValue ) {
  var result;
  _.forEach( hash, function ( value, key, object ) {
    if( typeof result === 'undefined' ) {
      result = {};
      result[value] = newValue
    } else {
      resultChild = result;
      result = {};
      result[ value ] = resultChild;
    }
  });
  return result;
}
