'use strict';
var argv = require('optimist')
      .default('write', false)
      .argv,
    releaseType = process.env.RELEASE_TYPE || 'prerelease';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> Brightcove  */\n',
    
    /* Build Stuff */
    clean: {
      files: ['*.tar.gz', 'build', 'dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        nonull: true,
        src: ['node_modules/videojs-contrib-ads/src/videojs.ads.js',
              'node_modules/videojs-overlay/lib/videojs-overlay.js',
              'node_modules/videojs-seek-events/lib/videojs-seek-events.js',
              'lib/videojs-onceux.js',
              'lib/vmap-parser.js',
              'lib/absolute-timeline.js',
              'lib/ad-tracking.js',
              'lib/default-overlays.js',
              'lib/controls.js'],
        dest: 'build/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'build/videojs-onceux.css': [
            'lib/*.css',
            'node_modules/videojs-contrib-ads/src/videojs.ads.css'
          ]
        },
      },
      minify: {
        expand: true,
        cwd: 'build/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/',
        ext: '.min.css'
      }
    },

    /*Testing Stuff*/
    jshint: {
      gruntfile: {
        options: {
          node: true
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['lib/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js', '!test/vmapData/**']
      }
    },
    qunit: {
      files: 'test/**/*.html'
    },
    blanket_qunit: {
      all: {
        options: {
          urls: ['test/index.html?coverage=true&gruntReport'],
          threshold: 70
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    },

    /* CI Stuff */
    copy: {
      version: {
        files: [
          { expand: true, cwd: 'dist', src: ['*'], dest: 'dist/<%= pkg.version %>/' }
        ]
      }
    },
    compress: {
      package: {
        options: {
          archive: '<%= pkg.name %>.tgz',
          mode: 'tgz'
        },
        cwd: 'dist',
        expand: true,
        src: ['**']
      }
    },
    release: {
      options: {
        npm: false
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default',['clean', 'jshint', 'concat', 'qunit', 'uglify', 'cssmin']);
  grunt.registerTask('version', 'This should only be called by Team City!', ['default', 'release:' + releaseType]);
  grunt.registerTask('package', ['default', 'copy:version', 'compress:package']);
  grunt.registerTask('test',['clean', 'jshint', 'concat', 'qunit']);
  grunt.registerTask('debug',['clean', 'concat', 'qunit']);
  grunt.registerTask('cover',['clean', 'concat', 'blanket_qunit']);
};