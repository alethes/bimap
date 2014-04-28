module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"
    coffee:
      compile:
        options:
          bare: true
        files:
          "lib/bimap.js": "src/*.coffee"
          "test/tests.js": ["test/require.coffee", "test/src/*.coffee"]
    coffee_jshint:
      scripts:
        files: "**/*.coffee"
    mochacov:
      test:
        options:
          reporter: 'min'
          bail: true
        all: ['test/*.js']
      coverage:
        options:
          reporter: 'html-cov'
          output: "./coverage/index.html"
          #bail: false
        all: ['test/*.js']
    watch:
      grunt:
        files: "Gruntfile.coffee"
      scripts:
        files: ["src/**/*.coffee", "test/**/*"]
        tasks: ["coffee", "coffee_jshint", "mochacov:test", "mochacov:coverage"]
        options:
          livereload: true
  
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-coffee-jshint"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-mocha-cov"

  grunt.registerTask "default", ["watch"] 