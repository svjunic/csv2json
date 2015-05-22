var fs = require('fs');
var csv = require('csv');
var Iconv = require('iconv').Iconv;
var conv = new Iconv('cp932','utf-8');
var _ = require('lodash');


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
 * @return {String} 出力したデータ内容
 */
module.exports = function( input, option ){

  var debug, pretty, delimitter, outputJsonPath;
  var reg;

  if( _.isObject( option ) ) {
    // debug
    if( option.debug ) {
      debug = true;
    } else {
      debug = false
    }

    // pretty
    if( option.pretty ) {
      pretty = true;
    } else {
      pretty = false
    }

    // outputJsonPath
    if( _.isString( option.outputJsonPath ) ) {
      outputJsonPath = option.outputJsonPath;
    }

    // delimitter
    if( _.isObject( option ) && typeof _.isString( option.delimitter ) && option.delimitter !== '' ) {
      delimitter = option.delimitter;
    }
  }

  // 区切り文字
  if( _.isUndefined( delimitter ) ) {
    delimitter = ':';
  }

  reg = RegExp( delimitter );



  /**
   * main
   * メインプロセス
   * @return {Object} Promiseオブジェクト
   */
  function main() {

    return new Promise( function( resolve, reject ){

      _dumpCsv( input )
        .then( function ( data ) {
          var dataValue = data[0];
          var dataName = dataValue.shift();
      
          _.forEach( dataName, function ( value, key, object ) {
            if( reg.test( value ) ) {
              dataName[ key ] = value.split( delimitter ).reverse();
            }
          });
      
          var createJson =  _.map( dataValue, function ( values ) {
            var newData = {};
      
            _.forEach( values, function ( value, key, object ) {
              var hash = dataName[key];
              if( _.isArray( hash ) ) {
                  newData = _.merge( newData, _deepProperty( hash, value ) )
                } else {
                  newData[ dataName[key] ] = value;
                }
              });
              if( debug ) console.log( newData );
              return newData;
            });
      
          var str;
          if( !pretty ) {
            str = JSON.stringify( createJson );
          } else {
            str = JSON.stringify( createJson, null, '    ' );
          }

          if( _.isString( outputJsonPath ) && outputJsonPath !== '' ) {
            fs.writeFile( outputJsonPath, str );
          }

          resolve( createJson );
        });
    });
  }
  

  /**
   * _deepProperty
   *
   * @param {String} path 読み込むcsvのパス
   * @return {Promise} Promiseオブジェクト
   *
   * @example
   * _deepProperty( [ 'a','b','c' ], "mogeta" )
   * output: { a: { b: { c: "mogeta" } } }
   */
  function _dumpCsv( path ) {
  
    var promise = new Promise( function ( resolve, reject ) {
      var json_array = [];
  
      fs.readFile( path, function(err, sjisBuf) {
        var buf = conv.convert(sjisBuf);
        if( debug ) console.log( 'CSV Loading:' + path + ' *=-');
        csv.parse(buf.toString(),{comment:'#'}, function(err, data) {
          json_array.push( data );
          resolve( json_array );
        });
      });
    })
  
    return promise;
  }

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
  function _deepProperty( hash, newValue ) {
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

  return main();
}

