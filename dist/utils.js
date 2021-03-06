"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var browserSync = require("browser-sync");
var fancy_log_1 = __importDefault(require("fancy-log"));
var argv = require('yargs').argv;
function getProxyUrl(url) {
    return process.env.WP_HOME || url || '';
}
exports.getProxyUrl = getProxyUrl;
function getTheme(theme) {
    return process.env.theme || process.env.THEME || theme;
}
exports.getTheme = getTheme;
function getWatchers() {
    var watchers = {
        icons: false,
        images: false,
        scripts: false,
        styles: false,
        svg: false,
        vendorScripts: false,
    };
    if (argv.watch) {
        argv.watch.split(',').forEach(function (watcher) {
            if (!(watcher in watchers)) {
                fancy_log_1.default.error('--watch argument contains unkonwn entries.  (--watch=icons,images,scripts,styles,svg,vendorScripts)');
            }
            else {
                watchers[watcher] = true;
            }
        });
    }
    return watchers;
}
exports.getWatchers = getWatchers;
function isDev() {
    if (argv.nodev) {
        return false;
    }
    if (argv.dev) {
        return true;
    }
    if (argv.env !== undefined) {
        return argv.env === 'development';
    }
    return process.env.WP_ENV !== undefined ? process.env.WP_ENV === 'development' : false;
}
exports.isDev = isDev;
function reload(done) {
    browserSync.reload();
    done();
}
exports.reload = reload;
