const path = require('path');

/**
 * Gulp task configuration object.
 *
 * Environment flags, source/dist paths, and plugin options.
 */

const proto = process.env.NODE_ENV === 'prototype';
const dev = process.env.NODE_ENV === 'development';
const prod = process.env.NODE_ENV === 'production';
const docker = process.env.VIRTUAL_ENV === 'docker';

const sourcePath = path.join('.', 'frontend');
const protoPath = path.join('.', 'prototype');
const sitePath = path.join('.', 'website', '{{ cookiecutter.short_name }}', 'static');

const distPath = proto ? protoPath : sitePath;
const proxyServer = docker ? 'backend:8000' : 'localhost:8000';

const $ = require('gulp-load-plugins')();

module.exports = {
  proto,
  dev,
  prod,
  docker,

  source: {
    fonts: path.join(sourcePath, 'assets', 'fonts'),
    icons: path.join(sourcePath, 'assets', 'icons'),
    images: path.join(sourcePath, 'assets', 'images'),
    js: path.join(sourcePath, 'assets', 'js'),
    pug: path.join(sourcePath, 'templates'),
    root: path.join(sourcePath, 'assets', 'root'),
    sass: path.join(sourcePath, 'assets', 'sass'),
  },

  build: {
    css: path.join(distPath, 'css'),
    fonts: path.join(distPath, 'fonts'),
    includes: path.join('.', 'website', '{{ cookiecutter.short_name }}', 'templates', 'includes', 'svgs'),
    images: path.join(distPath, 'images'),
    js: path.join(distPath, 'js'),
    pug: path.join('.', 'prototype'),
    root: path.join(distPath, 'root'),
  },

  views: path.join('.', 'website', '{{ cookiecutter.short_name }}', 'templates'),

  options: {
    autoprefixer: {
      browsers: ['last 2 versions'],
    },

    browsersync: {
      logPrefix: '£',
      ghostMode: {
        clicks: true,
        forms: true,
        scroll: false,
      },
      server: proto ? { baseDir: protoPath } : false,
      proxy: proto ? false : proxyServer,
      port: '1337',
      open: !docker,
    },

    csswring: {
      preserveHacks: true,
    },

    imagemin: [
      $.imagemin.gifsicle({ interlaced: true }),
      $.imagemin.jpegtran({ progressive: true }),
    ],

    sass: {
      indentedSyntax: false,
      sourceComments: false,
      errLogToConsole: true,
      includePaths: [
        './bower_components/',
        './node_modules/',
      ],
      outputStyle: 'nested',
      imagePath: '../images',
    },

    svgsprite: {
      mode: {
        symbol: {
          dest: './',
          sprite: 'sprite.svg',
        },
      },
    },
  },
};
