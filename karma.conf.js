// Karma configuration
// Generated on Sun Jan 22 2017 17:55:15 GMT+0000 (UTC)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    //For C9
    hostname: process.env.IP,
    port: process.env.PORT,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'requirejs', 'chai', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
      'test-main.js', 
      // {
      //   pattern: 'public/src/js/**/*.js',
      //   included: true
      // }, 
       { pattern: 'public/src/js/core/space-engine/space-engine.class.js',
        included: true
      }, 
    { pattern: "public/src/js/core/gameboard/gameboard.class.js",
        included: true
      }, 
    { pattern: "public/src/js/core/main-app/main.js",
        included: true
      },{
        pattern: 'public/src/js/**/*.spec.js',
        included: false
      }
    ],


    // list of files to exclude
    exclude: [
      '**/*.swp'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*Spec.js': ['browserify']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress'],
    // reporters: ['mocha'],
    reporters: ['dots', 'junit'],
    junitReporter: {
      outputFile: 'test-results.xml'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
