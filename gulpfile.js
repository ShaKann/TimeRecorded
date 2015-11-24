/******************************************************************************
 * Gulpfile
 * Be sure to run `npm install` for `gulp` and the following tasks to be
 * available from the command line. All tasks are run using `gulp taskName`.
 ******************************************************************************/

// node module imports
var gulp = require('gulp'),
  webpack = require('webpack'),
  minimist = require('minimist'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync'),
  shmock = require('shmock'),
  tsConfig = require("tsconfig-glob"),
  express = require("express"),
  delay = require('express-delay'),
  reload = browserSync.reload;



var IONIC_DIR = "node_modules/ionic-framework/dist/"
//var IONIC_DIR = "node_modules/ionic2/dist/"

var RESPONSE =
  [
    { "Bindings": ["[http] *:80:"], "SiteAddresses": ["http://http://127.0.0.1/"], "Id": 1, "State": "Started", "Name": "Default Web Site" },
    { "Bindings": ["[http] *:555:", "[https] *:443:"], "SiteAddresses": ["http://www.test.org:81", "https://http://127.0.0.1:555"], "Id": 2, "State": "Started", "Name": "Test" },
    { "Bindings": ["[http] *:7777:"], "SiteAddresses": ["http://http://127.0.0.1:7777"], "Id": 3, "State": "Started", "Name": "Test" }
  ];

gulp.task("mock", function (done) {
  var app = express();
  
  // Add headers
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

  app.get('/sites', function (req, res) {
    setInterval(function() {
          res.end(JSON.stringify(RESPONSE));
      }, 2000);
  });
  
  var server = app.listen(9000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    done();
  });
});

/***
 * GLob files
 */
gulp.task("tsconfig-glob", function () {
  return tsConfig({
    configPath: ".",
    cwd: process.cwd(),
    indent: 2
  });
});

/******************************************************************************
 * watch
 * Build the app, and rebuild when source files change.
 * Also starts a local web server.
 ******************************************************************************/
gulp.task('watch', ['sass', 'fonts'], function (done) {
  watch('www/app/**/*.scss', function () {
    gulp.start('sass');
  });
  compile(true, function () {
    gulp.start('serve');
    done();
  });
});


/******************************************************************************
 * build
 * Build the app once, without watching for source file changes.
 ******************************************************************************/
gulp.task('build', ['sass', 'fonts'], function (done) {
  compile(false, done);
});

/******************************************************************************
 * serve
 * Start a local web server serving the 'www' directory.
 * The default is http://localhost:8100. Use the optional '--port'
 * flag to specify a different port.
 ******************************************************************************/
gulp.task('serve', ['mock'], function () {
  browserSync({
    server: {
      baseDir: 'www',
    },
    port: flags.port,
    files: [
      'www/**/*.html'
    ],
    notify: false
  });
});


/******************************************************************************
 * sass
 * Convert Sass files to a single bundled CSS file. Uses auto-prefixer
 * to automatically add required vendor prefixes when needed.
 ******************************************************************************/
gulp.task('sass', function () {
  var autoprefixerOpts = {
    browsers: [
      'last 2 versions',
      'iOS >= 7',
      'Android >= 4',
      'Explorer >= 10',
      'ExplorerMobile >= 11'
    ],
    cascade: false
  };

  return gulp.src('www/app/app.scss')
    .pipe(sass({
      includePaths: [IONIC_DIR + 'src/scss'],
    }))
    .on('error', function (err) {
      console.error(err.message);
      this.emit('end');
    })
    .pipe(autoprefixer(autoprefixerOpts))
    .pipe(gulp.dest('www/build/css'))
    .pipe(reload({ stream: true }));
});


/******************************************************************************
 * fonts
 * Copy Ionic font files to build directory.
 ******************************************************************************/
gulp.task('fonts', function () {
  return gulp.src([
    IONIC_DIR + 'fonts/**/*.ttf',
    IONIC_DIR + 'fonts/**/*.woff'
  ])
    .pipe(gulp.dest('www/build/fonts'));
});


/******************************************************************************
 * clean
 * Delete previous build files.
 ******************************************************************************/
gulp.task('clean', function (done) {
  var del = require('del');
  del(['www/build'], done);
});



/******************************************************************************
 * Compile
 ******************************************************************************/
function compile(watch, cb) {
  // prevent gulp calling done callback more than once when watching
  var firstTime = true;

  // load webpack config
  var config = require('./webpack.config.js');

  // https://github.com/webpack/docs/wiki/node.js-api#statstojsonoptions
  var statsOptions = {
    'colors': true,
    'modules': true,
    'chunks': false,
    'exclude': ['node_modules']
  }

  // run (one time compile) or watch
  // https://github.com/webpack/docs/wiki/node.js-api
  var compilerFunc = (watch ? 'watch' : 'run');
  var compilerFuncArgs = [compileHandler];
  watch && compilerFuncArgs.unshift(null); // watch takes config obj as first arg

  // Call compiler.run(compileHandler) or compiler.watch(null, compileHandler)
  var compiler = webpack(config);
  compiler[compilerFunc].apply(compiler, compilerFuncArgs);

  function compileHandler(err, stats) {
    if (firstTime) {
      firstTime = false;
      cb();
    } else {
      reload();
    }

    // print build stats and errors
    console.log(stats.toString(statsOptions));
  }
}


// command line flag config
var flagConfig = {
  string: 'port',
  default: { port: 8100 }
};
var flags = minimist(process.argv.slice(2), flagConfig);
