'use strict';

var chalk = require('chalk');
var path = require('path');
var titaniumifier = require('titaniumifier');

module.exports = function(grunt) {

  grunt.registerMultiTask('titaniumifier', 'Get a Titanium CommonJS Module out of your Node.js package using Grunt!', function() {

    var done = this.async();

    var options = this.options({
      manifest: undefined,
      package: undefined,
      module: true,
      bare: false,
      bundle: false
    });

    if (this.files.length > 1) {
      grunt.fail.fatal("Too many destinations/sources. Only one can be specified.");
    }

    var file = this.files[0];

    if (!file) {
      file = {
        src: ['.'],
        dest: '.'
      };
    }

    if (file.src.length > 1) {
      grunt.fail.fatal("Too many sources. Only one can be specified");
    }

    var entry = file.src[0];
    var dest = file.dest;

    if (!grunt.file.isDir(dest)) {
      if (grunt.file.exists(dest)) {
        grunt.fail.fatal("Destination must be a directory!");
      }
      else {
        grunt.file.mkdir(dest);
      }
    }

    if (!entry) {
      grunt.fail.fatal("Could not find the desired module to build!");
    }

    entry = path.resolve(entry);
    dest = path.resolve(dest);

    if (grunt.file.isFile(entry)) {
      grunt.fail.fatal("Only a directory can be used as source");
    }

    titaniumifier.packer.build({
      entry: entry,
      noDependencies: options.bare,
      manifest: options.manifest,
      package: options.package
    })
    .tap(function (zip) {
      if (options.module) return zip.writeModule(dest).then(function () {
        grunt.log.ok("Module zip written in " + chalk.cyan(dest));
      });
    })
    .tap(function (zip) {
      if (options.bundle) return zip.writeBundle(dest).then(function () {
        grunt.log.ok("Module bundle written in " + chalk.cyan(dest));
      });
    })
    .done(function () {
      done();
    }, function (err) {
      grunt.fail.fatal(err);
      done(false);
    });

  });

};
