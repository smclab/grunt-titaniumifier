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
      },
      "renamed": {
        files: { './test/build': 'test/fake-module' },
        options: {
          as: "renamed-module"
        }
      }
    },

    unzip: {
      "module": {
        src: [
          'test/build/fake-module-commonjs-1.2.3.zip',
          'test/build/renamed-module-commonjs-1.2.3.zip'
        ],
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
      },
      "droid": {
        options: {
          command: 'build',
          logLevel: 'trace',
          projectDir: './test/fake-app',
          platform: 'android',
          deviceId: grunt.option('device-id')
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

  grunt.registerTask('setup:app', [ 'clean:app', 'test:build', 'unzip:module' ]);

  grunt.registerTask('test:ios', [ 'setup:app', 'titanium:ios' ]);
  grunt.registerTask('test:droid', [ 'setup:app', 'titanium:droid' ]);

  grunt.registerTask('default', [ 'jshint', 'test:build' ]);

};
