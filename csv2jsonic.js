(function(global) {
  "use strict";

  var csv2json = function () {
    'use strict';
  
    var fs = require('fs');
    var csv = require('csv');
    var Iconv = require('iconv').Iconv;
    var conv = null;
    var _ = require('lodash');
    var app = {
      debug         : false,
      charset       : 'Shift_JIS',
      pretty        : false,
      delimitter    : ':',
      reg           : /:/,
      outputJsonPath: '',
  
      setup: function ( option ) {
      
        if( _.isObject( option ) ) {
          // debug
          if( option.debug ) {
            this.debug = true;
          }
      
          // pretty
          if( _.isString( option.charset ) && option.charset !== '' ) {
            switch( option.charset ) {
              case 'Shift_JIS':
                conv = new Iconv('cp932','utf-8');
                break;
              case 'utf-8':
                conv = null;
                break;
              default:
                conv = new Iconv('cp932','utf-8');
                break;
            }
          }
      
          // pretty
          if( option.pretty ) {
            this.pretty = true;
          }
      
          // outputJsonPath
          if( _.isString( option.outputJsonPath ) ) {
            this.outputJsonPath = option.outputJsonPath;
          }
      
          // delimitter
          if( _.isObject( option ) && typeof _.isString( option.delimitter ) && option.delimitter !== '' ) {
            this.delimitter = option.delimitter;
          }
        }
      
        // 区切り文字
        if( _.isUndefined( this.delimitter ) ) {
          this.delimitter = ':';
        }
      
        this.reg = RegExp( this.delimitter );
      },
  
      /**
       * This module returns the CSV file in Json file or object.
       *
       * delimitter: ':' default
       *
       * @param  {String} input 読み込むファイルのパス
       * @param  {Option} option { outputJsonPath:'', delimitter:':', pretty:true }
       *       debug          : コンソールを出力します。
       *       outputJsonPath : 出力するJsonのパス。空文字や文字列でない場合は出力しない。
       *       delimitter     : CSVの区切り文字。１文字以上なければならない
       *       pretty         : Jsonの出力形式。trueをいれると圧縮された状態で出力。
       * @return {Promise} Promiseオブジェクト
       */
      loadCSV: function ( input ) {
        var promise = new Promise( function ( resolve, reject ) {
          app._dumpCsv( input )
            .then( function ( csvArray ) {
              var createJson = app.convert( csvArray[0] );
  
              if( _.isString( app.outputJsonPath ) && app.outputJsonPath !== '' ) {
                var strJson;
                if( app.pretty ) {
                  strJson = JSON.stringify( createJson, null, '    ' );
                } else {
                  strJson = JSON.stringify( createJson );
                }
                fs.writeFile( app.outputJsonPath, strJson);
              }
              resolve( createJson );
            });
          })
        return promise;
      },
  
      /**
       * Convert an array of CSV format to the object of Json format.
       *
       * @param  {Arary} csvArray csv形式を維持した、1行目にプロパティ名を持つ配列
       * @return {String} 出力したデータ内容
       */
      convert: function ( csvArray ) {
        var dataValue = csvArray;
        var dataName = dataValue.shift();
  
        _.forEach( dataName, function ( value, key, object ) {
          if( app.reg.test( value ) ) {
            dataName[ key ] = value.split( app.delimitter ).reverse();
          }
        });
  
        var createJson =  _.map( dataValue, function ( values ) {
          var jsonFormatObject = {};
  
          _.forEach( values, function ( value, key, object ) {
            var hash = dataName[key];
  
            if( _.isArray( hash ) ) {
              jsonFormatObject = _.merge( jsonFormatObject, app._deepProperty( hash, value ) )
            } else {
              jsonFormatObject[ dataName[key] ] = value;
            }
          });
  
          return jsonFormatObject;
        });
  
        if( app.debug ) console.log( createJson );
  
        return createJson;
      },
  
  
      /**
       * _dumpCsv
       *
       * @param {String} path 読み込むcsvのパス
       * @return {Promise} Promiseオブジェクト
       */
      _dumpCsv: function ( path ) {
        var promise = new Promise( function ( resolve, reject ) {
          var json_array = [];
     
          fs.readFile( path, function(err, _buf) {
            var buf;
            if( conv !== null ) {
              buf = conv.convert( _buf );
            } else {
              buf = _buf;
            }
            if( app.debug ) console.log( 'CSV Loading:' + path + ' *=-');
            csv.parse(buf.toString(),{comment:'#'}, function(err, data) {
              json_array.push( data );
              resolve( json_array );
            });
          });
        });
      
        return promise;
      },
  
      /**
       * _deepProperty
       *
       * @param {Array} hash 深い階層のハッシュを作るための配列
       * @return {String} hashを元に作ったオブジェクト
       *
       * @example
       * _deepProperty( [ 'a','b','c' ], "mogeta" )
       * output: { a: { b: { c: "mogeta" } } }
       */
       _deepProperty: function ( hash, newValue ) {
         var result, resultChild;
         _.forEach( hash, function ( value, key, object ) {
           if( typeof result === 'undefined' ) {
             result = {};
             result[value] = newValue
           } else {
             resultChild = result;
             result = {};
             result[value] = resultChild;
           }
         });
         return result;
      }
    }
  
    return app;
  }
  
  module.exports = csv2json;

})((this || 0).self || global);
