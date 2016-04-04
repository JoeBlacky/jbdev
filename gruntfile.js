module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['js/dev/*.js'],
        dest: 'js/script.js'
      },
      distscss: {
        src: ['scss/*.scss'],
        dest: 'scss/main.scss'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/dev/main.css': 'scss/main.scss'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'js/<%= pkg.name %>.js' : '<%= concat.dist.dest %>'
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/dev/',
          src: ['**/*.{png,jpg,gif,ico}'],
          dest: 'img/'
        }]
      }
    },
    watch: {
      sass: {
        files: ['scss/**/*.scss', 'scss/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: {
            host: 'localhost',
            port: 35729,
          }
        },
      },
      js: {
        files: 'js/dev/main.js',
        options: {
          livereload: {
            host: 'localhost',
            port: 35729,
          }
        },
      },
      files: '<%= concat.dist.src %>',
      tasks: ['concat', 'uglify', 'sass']
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      prefixed_main: {
        src: 'css/dev/main.css',
        dest: 'css/main.css'
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);

};