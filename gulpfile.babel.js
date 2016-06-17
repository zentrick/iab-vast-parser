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

const COVERAGE_THRESHOLDS = {global: 80}

const $ = loadPlugins()

const plumb = () => $.if(!process.env.CI, $.plumber({
  errorHandler: $.notify.onError('<%= error.message %>')
}))

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
    .pipe($.standard.reporter('default', {breakOnError: false}))
})

gulp.task('pre-coverage', () => {
  return gulp.src('src/**/*.js')
    .pipe($.istanbul({instrumenter: Instrumenter}))
    .pipe($.istanbul.hookRequire())
})

gulp.task('coverage', ['pre-coverage'], () => {
  return gulp.src(['test/lib/setup.js', 'test/{unit,integration}/**/*.js', '!**/_*.js'], {read: false})
    .pipe(plumb())
    .pipe($.mocha({reporter: 'spec'}))
    .pipe($.istanbul.writeReports())
    .pipe($.istanbul.enforceThresholds({thresholds: COVERAGE_THRESHOLDS}))
})

gulp.task('coveralls', () => {
  if (!process.env.COVERALLS) {
    return
  }
  return gulp.src('coverage/lcov.info')
    .pipe($.coveralls())
})

gulp.task('test', (cb) => seq('lint', 'coverage', 'coveralls', cb))

gulp.task('build', (cb) => seq('test', 'clean', 'transpile', cb))

const buildExp = async (filePath, expPath, parse) => {
  const data = await fsp.readFile(filePath, 'utf8')
  const parsed = parse(data)
  const marshaled = marshal(parsed)
  const stringified = stableStringify(marshaled, {space: 2})
  await fsp.outputFile(expPath, stringified, 'utf8')
  gutil.log('Created', gutil.colors.magenta(expPath))
}

gulp.task('write-exp', async () => {
  const parse = require('./src/').default
  const fixturesRoot = path.resolve(__dirname, 'test/fixtures')
  const expectedRoot = path.resolve(__dirname, 'test/integration/expected')
  const fixtures = globule.find({cwd: fixturesRoot, src: '**/*.xml'})
  await Promise.all(fixtures.map((relPath) => {
    const filePath = path.join(fixturesRoot, relPath)
    const expPath = path.join(expectedRoot, gutil.replaceExtension(relPath, '.json'))
    return buildExp(filePath, expPath, parse)
  }))
})

gulp.task('watch', () => gulp.watch('{src,test}/**/*', ['build']))

gulp.task('default', ['build'], () => gulp.start('watch'))
