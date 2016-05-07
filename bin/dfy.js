#!/usr/bin/env node

var program = require('commander'),
    express = require('express'),
    app = express(),
    gs = require('../lib/generateStructure');
    //wf = require('../lib/withoutFile');

function range(val) {
    return val.split('..').map(Number);
}
function list(val) {
    return val.split(',');
}
program
    .version(require('../package.json').version)
    .usage('[options]');

program
    .command('init [options]')
    .description('scaffold with specifed template.')
    .action(function(name){
        gs(name);
    });

program
    .command('server [options]')
    .description('launch a server')
    .action(function(name){
        if(name == 'start'){
           //启动服务器
        }
    });

program.parse(process.argv);
var pname = program.args[0];

if(!pname) program.help();
