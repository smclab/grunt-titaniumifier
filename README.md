grunt-titaniumifier
===================

[![Build Status](https://img.shields.io/travis/smclab/grunt-titaniumifier.svg?style=flat-square)](https://travis-ci.org/smclab/grunt-titaniumifier)
[![npm](https://img.shields.io/npm/v/grunt-titaniumifier.svg?style=flat-square)](https://www.npmjs.com/package/grunt-titaniumifier)
[![Gitter](https://img.shields.io/badge/GITTER-Join%20chat%20%E2%86%92-1DCE73.svg?style=flat-square)](https://gitter.im/smclab/titaniumifier?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Get a Titanium CommonJS Module out of your Node.js package with [Titaniumifier](https://github.com/smclab/titaniumifier) using Grunt!

Read the [documentation of `titaniumifier`][wiki] to understand what you can do with it.


Getting Started
---------------

This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-titaniumifier --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-titaniumifier');
```

The "titaniumifier" task
------------------------

In your project's Gruntfile, add a section named `titaniumifier` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  titaniumifier: {
    "module": {
      options: {
        // You can create a CommonJS module **without** the
        // dependencies bundled
        bare: false,
        // Specifying bundle:true you will have a bundled JS file alongside the
        // zipfile, so you can distribute it as a single file
        bundle: false,
        // If you don’t even need the zipfile (why??!) you can exclude it from
        // the building process
        module: true
      }
    }
  },
});
```

Most of the configuration must happen on the `package.json` file, please see the [documentation of `titaniumifier`][wiki] to see what you can do.

[wiki]: https://github.com/smclab/titaniumifier/wiki

Credits
-------

Humbly made by the spry ladies and gents at SMC.


License
-------

This library, *grunt-titaniumifier*, is free software ("Licensed Software"); you can
redistribute it and/or modify it under the terms of the [GNU Lesser General
Public License](http://www.gnu.org/licenses/lgpl-2.1.html) as published by the
Free Software Foundation; either version 2.1 of the License, or (at your
option) any later version.

This library is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; including but not limited to, the implied warranty of MERCHANTABILITY,
NONINFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
Public License for more details.

You should have received a copy of the [GNU Lesser General Public
License](http://www.gnu.org/licenses/lgpl-2.1.html) along with this library; if
not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth
Floor, Boston, MA 02110-1301 USA
