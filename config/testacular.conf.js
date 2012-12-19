basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'app/js/vendor/angular.js',
  'app/js/vendor/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  'app/js/vendor/jquery-*.js',
  'app/js/**/*.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
