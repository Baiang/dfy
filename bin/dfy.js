#!/usr/bin/env node

var program = require('commander'),
    superagent = require('superagent'),
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
    .option("-p, --port <int>", "server listen port")
    .option("-d, --domain <domain name>", "domain name")
    .action(function(name,options){
        if(name == 'start'){
           //启动服务器
            if(options.domain &&  !/^(\w+:\/\/)?\w+(\.\w+)+.*$/.test(options.domain)){
                console.log('\n [ERROR] 请输入正确的域名或ip地址！'.red);
                return;
            }
            server = require('../lib/server')(options.port,options.domain);
        }
    });

program.parse(process.argv);
var pname = program.args[0];

if(!pname) program.help();
