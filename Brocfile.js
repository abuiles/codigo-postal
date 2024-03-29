/* global require, module */
var csso = require('broccoli-csso');
var env = require('broccoli-env').getEnv();
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var push = Array.prototype.push;
var p = require('ember-cli/lib/preprocessors');
var preprocessCss = p.preprocessCss;

var legacyFilesToAppend = [
  'jquery.js',
  'handlebars.js'
];

if (env == 'production') {
  legacyFilesToAppend = legacyFilesToAppend.concat('ember-prod/index.js');
} else {
  legacyFilesToAppend = legacyFilesToAppend.concat('ember.js');
}

legacyFilesToAppend = legacyFilesToAppend.concat(
  'ic-ajax/dist/named-amd/main.js',
  'app-shims.js',
  'ember-resolver.js',
  'ember-load-initializers.js',
  'gmaps.js',
  '_gmaps-shim.js'
);

var app = new EmberApp(env, {
  name: require('./package.json').name,

  legacyFilesToAppend: legacyFilesToAppend,

  // AKA whitelisted modules
  ignoredModules: [
    'ember',
    'ember/resolver',
    'ember/load-initializers',
    'ic-ajax',
  ],

  // hack we can hopefully remove as the addon system improves
  importWhitelist: {
    'ember': ['default'],
    'ember/resolver': ['default'],
    'ember/load-initializers': ['default'],
    'ember-qunit': [
      'globalize',
      'moduleFor',
      'moduleForComponent',
      'moduleForModel',
      'test',
      'setResolver'
    ],
    'ic-ajax': [
      'request'
    ],
    'qunit': ['default'],
    'GMaps': ['default']
  },

  // hack
  getEnvJSON: require('./config/environment')
});

if (env !== 'production') {
  push.apply(app.ignoredModules, [
    'qunit',
    'ember-qunit'
  ]);

  push.apply(app.legacyFilesToAppend, [
    'test-shims.js',
    'ember-qunit/dist/named-amd/main.js'
  ]);
}

EmberApp.prototype.styles = function() {
  var styles =  preprocessCss(this.appAndDependencies(), this.name + '/styles', '/assets');

  if (this.env === 'production') {
    styles = csso(styles);
  }

  return styles;
};
module.exports = app.toTree();
