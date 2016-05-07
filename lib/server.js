/**
 * Created by Administrator on 2016/5/6.
 */

var superagent = require('superagent'),
    getIPAdress = require('../lib/ipAdress'),
    express = require('express'),
    app = express();

var url = 'http://www.dafangya.com.cn';
//app.use(require('body-parser')());

var bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

function server(port,domain) {
    var headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With",
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
        "X-Powered-By": ' 3.2.1',
        "Content-Type": "application/json;charset=utf-8"
    };
    var url = domain || 'http://www.dafangya.com.cn';
    var port = port || 8010;
    var ip = 'http://' + getIPAdress() + ':' + port,
        localIp = 'http://127.0.0.1:'+ port;
    var repurl = domain ? "*" : "/h5/*";

    app.all(repurl, function(req, res, next) {
        //res.writeHead(200,headers);
        console.log(('\n [Request URL] ' + localIp + req.url).gray);
        console.log((' [Request Method] ' + req.method).gray);
        // console.log(req.body);
        if(req.url == '/favicon.ico'){
            return;
        }
        //console.time(' [Time]'.gray);
        //post
        superagent[req.method.toLocaleLowerCase()](url + req.url)
            .send(req.body)
            .timeout(3000)
            .end(function (err, data) {
                if (err) {
                    //console.log(err);
                    if(data){
                        console.log((' [Error Code] ' + data.status + ' Method Not Allowed').red);
                        res.writeHead(err.status, headers);
                    }else{
                        console.log((' [Error Status] '+ url + ' 请求超时').red);
                    }
                    //console.timeEnd(' [Time]'.gray);
                    console.log((' ['+ new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ' UTC]')).gray);
                    res.end(req.url);
                    return;
                }
                console.log((' [Scuess Code] ' + data.status + ' OK').yellow);
                console.log((' ['+ new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ' UTC]')).gray);
                res.writeHead(data.status, headers);
                if (data.ok) {
                    res.end(data.text);
                }
            });
    });

    app.listen(port, function () {
        console.log('\n [INFO] Origin '.green  + url +'/');
        console.log('\n [INFO] Browse '.green  + localIp +'/');
        console.log('\n [INFO] Or browse '.green + ip +'/ \n --------------------------------------------------------------------');

    });
}

module.exports = server;