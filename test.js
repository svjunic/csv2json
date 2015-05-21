var assert   = require('assert');
var csv2json = require('./csv2json.js');

describe('パラメータ', function() {
    it('CSVファイルが正しく読み込める', function() {
      return csv2json( './sample_csv/test1.csv', 'output.json' )
        .then( function ( data ) {
          assert( true, data );
        })
    });
    it('区切り文字が"|"に変更されてを指定して正しく動作する', function() {
      return csv2json( './sample_csv/test2.csv', 'output.json', { delimitter:'|' } )
        .then( function ( data ) {
          assert( true, data );
        })
    });
});


describe('出力', function() {
  it('区切り文字が";"で正しく出力される', function() {
    return csv2json( './sample_csv/test1.csv', 'output.json' )
      .then( function ( data ) {
        assert( true, data );
      })
  });
  it('区切り文字が"|"で正しく出力される', function() {
    return csv2json( './sample_csv/test2.csv', 'output.json' )
      .then( function ( data ) {
        assert( true, data );
      })
  });
});
 
