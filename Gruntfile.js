// #"Last Change: 21-May-2015."

module.exports = function(grunt) {

 'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    esteWatch: {
      options: {
        dirs: [ './', './test' ],
        livereload: {
          enabled: false,
          //extensions: [ 'js' ],
          //port: 35729
        }
      },
      js: function( filepath ) { return [ 'shell' ]; }
    },
    shell: {
      options: {
        stderr: false
      },
      target: {
        //command: 'node app.js'
        command: 'npm test'
      }
    }
  });

  //プラグインの読み
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-este-watch');

  grunt.registerTask("default", ["esteWatch"]);
};
