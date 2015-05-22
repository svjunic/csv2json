var assert   = require('assert');
var fs = require('fs');
var csv2json = require('../csv2json.js');
var input = '',
    output = '';

// パラメータ系テスト
describe('パラメータ', function() {
    it('CSVファイルが正しく読み込める', function() {
      return csv2json( './test/csv/parameter1.csv', './test/json/parameter1.json' )
        .then( function ( data ) {
          assert( true );
        })
    });
    it('区切り文字が"|"に変更されてを指定して正しく動作する', function() {
      return csv2json( './test/csv/parameter2.csv', './test/json/parameter2.json', { delimitter:'|' } )
        .then( function ( data ) {
          assert( true );
        });
    });
});


// 文字コード系テスト（簡易）
describe('違う文字コードでも正しく動作するか', function() {
  it('UTF-8', function( done ) {
    input = './test/csv/fileformat1.csv';
    output = './test/json/fileformat1.json';
    csv2json( input, { outputJsonPath: output } )
      .then( function ( data ) {
        assert( data[0].user   === 'sv.junic1' );
        assert( data[0].field1 === 'field1-1Value' );
        assert( data[0].field2.field2Child1 === 'field2-1Value' );
        assert( data[0].field2.field2Child2 === 'field2-2Value' );
        assert( data[0].field3.field3Child.field3ChildChild === '100' );
        filecheck( output, function(){ done(); } )
      });
  });
  it('Shift-JIS', function( done ) {
    input = './test/csv/fileformat2.csv';
    output = './test/json/fileformat2.json';
    csv2json( input, { outputJsonPath: output } )
      .then( function ( data ) {
        assert( data[0].user   === 'sv.junic1' );
        assert( data[0].field1 === 'field1-1Value' );
        assert( data[0].field2.field2Child1 === 'field2-1Value' );
        assert( data[0].field2.field2Child2 === 'field2-2Value' );
        assert( data[0].field3.field3Child.field3ChildChild === '100' );
        filecheck( output, function(){ done(); } )
      })
  });
});
 

// 出力内容テスト
describe('出力内容テスト', function() {
  it('区切り文字が";"で正しく出力される', function( done ) {
    input = './test/csv/delimitter1.csv';
    output = './test/json/delimitter1.json';
    csv2json( input, { outputJsonPath:output, delimitter:':' } )
      .then( function ( data ) {
        assert( data[0].user   === 'sv.junic1' );
        assert( data[0].field1 === 'field1-1Value' );
        assert( data[0].field2.field2Child1 === 'field2-1Value' );
        assert( data[0].field2.field2Child2 === 'field2-2Value' );
        assert( data[0].field3.field3Child.field3ChildChild === '100' );
        filecheck( output, function(){ done(); } )
      })
  });
  it('区切り文字が"|"で正しく出力される', function( done ) {
    input = './test/csv/delimitter2.csv';
    output = './test/json/delimitter2.json';
    csv2json( input, { outputJsonPath:output, delimitter:'|' } )
      .then( function ( data ) {
        assert( data[0].user   === 'sv.junic1' );
        assert( data[0].field1 === 'field1-1Value' );
        assert( data[0].field2.field2Child1 === 'field2-1Value' );
        assert( data[0].field2.field2Child2 === 'field2-2Value' );
        assert( data[0].field3.field3Child.field3ChildChild === '100' );
        filecheck( output, function(){ done(); } )
      })
  });
});
 
 

// 出力内容テスト
describe('デバッグ用動作テスト', function() {
  it('Jsonが非圧縮状態で出力される', function( done ) {
    csv2json( './test/csv/debug.csv', './test/json/debug.json', { debug:true, pretty:true } )
      .then( function ( data ) {
        done();
      })
  });
});

function filecheck( filepath, callback ) {
  fs.open( filepath, 'r', 384 /*=0600*/, function(err, fd) {
    // 存在した場合
    fd && fs.close(fd, function(err) {
      if( typeof callback === 'function' ) callback();
    });
  });
}
