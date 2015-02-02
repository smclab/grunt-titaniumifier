'use strict';

var chalk = require('chalk');
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

    copy: {
      "dependencies": {
        files: {
          './test/fake-app/Resources/should.js': require.resolve('should/should'),
          './test/fake-app/Resources/ti-mocha.js': require.resolve('ti-mocha/ti-mocha')
        }
      }
    },

    titaniumifier: {
      "module": {
        files: { './test/build': 'test/fake-module' },
        options: {
          bare: false,
          bundle: true,
          module: true
        }
      },
      "bare-module": {
        files: { './test/build': 'test/fake-module' },
        options: {
          bare: true,
          bundle: false,
          module: true
        }
      }
    },

    unzip: {
      "module": {
        src: [
          'test/build/renamed-module-commonjs-1.2.3.zip'
        ],
        dest: 'test/fake-app'
      }
    },

    titanium: {
      options: {
        command: 'build',
        logLevel: (grunt.option('log-level') || 'info'),
        projectDir: './test/fake-app',
        success: '[TESTS ALL OK]',
        failure: '[TESTS WITH FAILURES]'
      },
      "ios": {
        options: {
          platform: 'ios'
        }
      },
      "droid": {
        options: {
          platform: 'android',
          deviceId: grunt.option('device-id')
        }
      }
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-titanium');
  grunt.loadNpmTasks('grunt-zip');

  grunt.registerTask('check:build', function () {
    var failures = [
      'renamed-module-commonjs-1.2.3-bare.zip',
      'renamed-module-commonjs-1.2.3.zip',
      'renamed-module.js'
    ].reduce(function (failures, zipfile) {
      if (grunt.file.isFile(path.resolve('test/build/', zipfile))) {
        grunt.log.ok("File " + chalk.cyan(zipfile) + " correctly generated");
        return failures;
      }
      else {
        grunt.log.error("File " + chalk.cyan(zipfile) + " not generated");
        return failures + 1;
      }
    }, 0);

    if (failures) {
      grunt.fail.fatal(failures + " file(s) had issues");
    }
  });

  grunt.registerTask('test:build', [ 'clean:test', 'titaniumifier', 'check:build' ]);

  grunt.registerTask('setup:app', [ 'clean:app', 'test:build', 'unzip:module', 'copy:dependencies' ]);

  grunt.registerTask('test:ios', [ 'setup:app', 'titanium:ios' ]);
  grunt.registerTask('test:droid', [ 'setup:app', 'titanium:droid' ]);

  grunt.registerTask('default', [ 'jshint', 'test:build' ]);

};
