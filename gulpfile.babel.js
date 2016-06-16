import gulp from 'gulp'
import gutil from 'gulp-util'
import loadPlugins from 'gulp-load-plugins'
import {Instrumenter} from 'isparta'
import del from 'del'
import globule from 'globule'
import seq from 'run-sequence'
import fsp from 'fs-promise'
import stableStringify from 'json-stable-stringify'
import path from 'path'
import marshal from './test/lib/marshal'

const $ = loadPlugins()

const plumb = () => $.plumber({
  errorHandler: $.notify.onError('<%= error.message %>')
})

const test = (strict = false) => {
  return gulp.src(['test/lib/setup.js', 'test/integration/**/*.js'], {read: false})
    .pipe($.if(!strict, plumb()))
    .pipe($.mocha({reporter: 'spec'}))
}

gulp.task('clean', () => del('lib'))

gulp.task('transpile', () => {
  return gulp.src('src/**/*.js')
    .pipe(plumb())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('lib'))
})

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(plumb())
    .pipe($.standard())
    .pipe($.standard.reporter('default', {
      breakOnError: false
    }))
})

gulp.task('build', (cb) => seq('lint', 'test', 'transpile', cb))

gulp.task('cleanbuild', (cb) => seq('clean', 'build', cb))

gulp.task('pre-coverage', () => {
  return gulp.src('src/**/*.js')
    .pipe($.istanbul({instrumenter: Instrumenter}))
    .pipe($.istanbul.hookRequire())
})

gulp.task('coverage', ['pre-coverage'], () => {
  return test(true)
    .pipe($.istanbul.writeReports())
    .pipe($.istanbul.enforceThresholds({thresholds: {global: 85}}))
})

gulp.task('coveralls', ['coverage'], () => {
  return gulp.src('coverage/lcov.info')
    .pipe($.coveralls())
})

gulp.task('test', test)

gulp.task('write-exp', () => {
  const parse = require('./src/').default

  const fixturesRoot = path.resolve(__dirname, 'test/fixtures')
  const expectedRoot = path.resolve(__dirname, 'test/integration/expected')

  const promises = []
  const errors = []
  for (const relPath of globule.find({cwd: fixturesRoot, src: '**/*.xml'})) {
    const filePath = path.join(fixturesRoot, relPath)
    const expPath = path.join(expectedRoot, gutil.replaceExtension(relPath, '.json'))
    const working = fsp.readFile(filePath, 'utf8')
      .then((data) => parse(data))
      .then((parsed) => marshal(parsed))
      .then((marshaled) => stableStringify(marshaled, {space: 2}))
      .then((data) => fsp.outputFile(expPath, data, 'utf8'))
      .then(() => gutil.log('Created', gutil.colors.magenta(expPath)))
      .catch((err) => {
        gutil.log('Error creating', gutil.colors.magenta(expPath) + ':', err.stack)
        errors.push({path: expPath, error: err})
      })
    promises.push(working)
  }

  return Promise.all(promises)
    .then(() => {
      if (errors.length > 0) {
        throw new gutil.PluginError('write-exp', `Failed to create ${errors.length} file(s)`)
      }
    })
})

gulp.task('watch', () => gulp.watch('{src,test}/**/*', ['cleanbuild']))

gulp.task('default', ['cleanbuild'], () => gulp.start('watch'))
