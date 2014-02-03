'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: true,
      },
      all: [
        'Gruntfile.js',
        'tasks/**/*.js'
      ]
    },

    clean: {
      "test": [ './test/build' ]
    },

    titaniumifier: {
      "module": {
        files: { './test/build': 'test/fake-module' },
        options: {
          bare: false
        }
      },
      "bare-module": {
        files: { './test/build': 'test/fake-module' },
        options: {
          bare: true
        }
      }
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('mkdir:test', function () {
    grunt.file.mkdir('./test/build');
  });

  grunt.registerTask('test', [ 'clean:test', 'mkdir:test', 'titaniumifier' ]);

  grunt.registerTask('default', [ 'jshint', 'test' ]);

};
