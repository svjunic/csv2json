var assert   = require('assert');
var csv2json = require('./csv2json.js');

// パラメータ系テスト
describe('パラメータ', function() {
    it('CSVファイルが正しく読み込める', function() {
      return csv2json( './sample_csv/parameter.test1.csv', 'output.json' )
        .then( function ( data ) {
          assert( true );
        })
    });
    it('区切り文字が"|"に変更されてを指定して正しく動作する', function() {
      return csv2json( './sample_csv/parameter.test2.csv', 'output.json', { delimitter:'|' } )
        .then( function ( data ) {
          assert( true );
        });
    });
});


// 文字コード系テスト（簡易）
describe('違う文字コードでも正しく動作するか', function() {
  it('UTF-8', function( done ) {
    csv2json( './sample_csv/fileformat.test1.csv', 'output.json' )
      .then( function ( data ) {
        assert( data[0].user   === 'sv.junic1' );
        assert( data[0].field1 === 'field1-1Value' );
        assert( data[0].field2.field2Child1 === 'field2-1Value' );
        assert( data[0].field2.field2Child2 === 'field2-2Value' );
        assert( data[0].field3.field3Child.field3ChildChild === '100' );
        done();
      });
  });
  it('Shift-JIS', function() {
    csv2json( './sample_csv/fileformat.test2.csv', 'output.json' )
      .then( function ( data ) {
        assert( data[0].user   === 'sv.junic1' );
        assert( data[0].field1 === 'field1-1Value' );
        assert( data[0].field2.field2Child1 === 'field2-1Value' );
        assert( data[0].field2.field2Child2 === 'field2-2Value' );
        assert( data[0].field3.field3Child.field3ChildChild === '100' );
        done();
      })
  });
});
 

// 出力内容テスト
describe('出力内容テスト', function() {
  it('区切り文字が";"で正しく出力される', function() {
    csv2json( './sample_csv/fileformat.test1.csv', 'output.json', { delimitter:'|' } )
      .then( function ( data ) {
        assert( data[0].user   === 'sv.junic1' );
        assert( data[0].field1 === 'field1-1Value' );
        assert( data[0].field2.field2Child1 === 'field2-1Value' );
        assert( data[0].field2.field2Child2 === 'field2-2Value' );
        assert( data[0].field3.field3Child.field3ChildChild === '100' );
        done();
      })
  });
  it('区切り文字が"|"で正しく出力される', function() {
    csv2json( './sample_csv/fileformat.test1.csv', 'output.json', { delimitter:'|' } )
      .then( function ( data ) {
        assert( data[0].user   === 'sv.junic1' );
        assert( data[0].field1 === 'field1-1Value' );
        assert( data[0].field2.field2Child1 === 'field2-1Value' );
        assert( data[0].field2.field2Child2 === 'field2-2Value' );
        assert( data[0].field3.field3Child.field3ChildChild === '100' );
        done();
      })
  });
});
 
