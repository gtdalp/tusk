fs         = require("fs")
gulp       = require("gulp")
mocha      = require("gulp-mocha")
uglify     = require("gulp-uglify")
sourcemaps = require("gulp-sourcemaps")
buffer     = require("vinyl-buffer")
source     = require("vinyl-source-stream")
browserify = require("browserify")
details    = require("./package.json")
src        = "./src"
lib        = "./lib"
bin        = "./bin"
tests      = "./test"

###
# Build js for browser tests.
###
gulp.task "build", ->
	browserify(
		debug:      true
		entries:    "./lib/index"
		standalone: "tusk"
	)
		.plugin("bundle-collapser/plugin")
		.bundle()
		.pipe(source("tusk.js"))
		.pipe(buffer())
		.pipe(sourcemaps.init(loadMaps: true))
		.pipe(uglify(
			mangle:   true
			compress:
				unused:       true
				sequences:    true
				properties:   true
				dead_code:    true
				conditionals: true
				comparisons:  true
				evaluate:     true
				booleans:     true
				loops:        true
				if_return:    true
				join_vars:    true
				cascade:      true
				drop_console: true
				screw_ie8:    true
		))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(bin))
		.on("error", (err)->
			return unless err
			console.log(err.toString())
			console.log(err.stack)
			@emit("end")
		)

###
# Build js for browser tests.
###
gulp.task "build-test", ->
	browserify(
		entries: ("#{tests}/#{file}" for file in fs.readdirSync("./test") when file.endsWith("Test.coffee"))
		extensions: [".coffee"]
		debug: true
	)
		.ignore("mocha-jsdom")
		.transform("coffee-reactify")
		.bundle()
		.pipe(source("run.js"))
		.pipe(gulp.dest(tests))
		.on("error", (err)->
			return unless err
			console.log(err.toString())
			console.log(err.stack)
			@emit("end")
		)

###
Run tests.
###
gulp.task("test", ->
	gulp.src("#{tests}/*Test.coffee", read: false)
		.pipe(mocha())
)
