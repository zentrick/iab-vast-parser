import gulp from 'gulp'
import gutil from 'gulp-util'
import loadPlugins from 'gulp-load-plugins'
import { Instrumenter } from 'isparta'
import del from 'del'
import seq from 'run-sequence'
import yargs from 'yargs'
import globule from 'globule'
import stableStringify from 'json-stable-stringify'
import fsp from 'fs-promise'
import path from 'path'
import marshal from './test/lib/marshal'

const COVERAGE_THRESHOLDS = { global: 80 }
const { CIRCLECI, CIRCLE_TEST_REPORTS, COVERALLS } = process.env

const $ = loadPlugins()
const argv = yargs
  .string('grep')
  .boolean('bail')
  .argv

const runIntegrationTests = () => gulp.src(['test/lib/setup.js', 'test/integration/**/*.js'], { read: false })
  .pipe($.mocha({
    reporter: CIRCLECI ? 'mocha-junit-reporter' : 'spec',
    reporterOptions: CIRCLECI ? {
      mochaFile: `${CIRCLE_TEST_REPORTS}/junit/test-results-${process.version}.xml`
    } : {},
    grep: argv.grep,
    bail: argv.bail,
    compilers: ['js:babel-core/register']
  }))

const buildExpected = async (filePath, expPath, parse) => {
  const data = await fsp.readFile(filePath, 'utf8')
  const parsed = parse(data)
  const marshaled = marshal(parsed)
  const stringified = stableStringify(marshaled, { space: 2 })
  await fsp.outputFile(expPath, stringified, 'utf8')
  gutil.log('Created', gutil.colors.magenta(expPath))
}

gulp.task('clean', () => del('lib'))

gulp.task('build', ['clean'], () => {
  return gulp.src('src/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['es2015'],
      babelrc: false
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('lib'))
})

gulp.task('lint', () => {
  return gulp.src('{src,test}/**/*.js')
    .pipe($.standard())
    .pipe($.standard.reporter('default', {
      breakOnError: false
    }))
})

gulp.task('test:integration', runIntegrationTests)

gulp.task('coverage:instrument', () => {
  return gulp.src('src/**/*.js')
    .pipe($.istanbul({
      instrumenter: Instrumenter
    }))
    .pipe($.istanbul.hookRequire())
})

gulp.task('coverage', ['coverage:instrument'], () => {
  return runIntegrationTests()
    .pipe($.istanbul.writeReports())
    .pipe($.istanbul.enforceThresholds({ thresholds: COVERAGE_THRESHOLDS }))
})

gulp.task('coveralls', () => {
  if (!COVERALLS) {
    return
  }
  return gulp.src('coverage/lcov.info')
    .pipe($.coveralls())
})

gulp.task('test', (cb) => seq('lint', 'coverage', 'coveralls', cb))

gulp.task('watch', () => gulp.watch('src/**/*', ['build']))

gulp.task('write-exp', async () => {
  const parse = require('./src/').default
  const fixturesRoot = path.resolve(__dirname, 'test/fixtures')
  const expectedRoot = path.resolve(__dirname, 'test/integration/expected')
  const fixtures = globule.find({ cwd: fixturesRoot, src: '**/*.xml' })
  await Promise.all(fixtures.map((relPath) => {
    const filePath = path.join(fixturesRoot, relPath)
    const expPath = path.join(expectedRoot, gutil.replaceExtension(relPath, '.json'))
    return buildExpected(filePath, expPath, parse)
  }))
})

gulp.task('default', ['build'], () => gulp.start('watch'))
