'use strict';

var path = require('path');

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
      "test": [ './test/build' ],
      "app": [ './test/fake-app/build', './test/fake-app/modules' ]
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
    },

    unzip: {
      "module": {
        src: 'test/build/fake-module-commonjs-1.2.3.zip',
        dest: 'test/fake-app'
      }
    },

    titanium: {
      "ios": {
        options: {
          command: 'build',
          logLevel: 'trace',
          projectDir: './test/fake-app',
          platform: 'ios'
        }
      }
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-titanium');
  grunt.loadNpmTasks('grunt-zip');

  grunt.registerTask('mkdir:build', function () {
    grunt.file.mkdir('./test/build');
  });

  grunt.registerTask('test:build', [ 'clean:test', 'mkdir:build', 'titaniumifier' ]);

  grunt.registerTask('test:app', [ 'clean:app', 'test:build', 'unzip:module', 'titanium:ios' ]);

  grunt.registerTask('default', [ 'jshint', 'test:build' ]);

};
