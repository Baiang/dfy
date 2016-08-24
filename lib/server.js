/**
 * Created by Administrator on 2016/5/6.
 */

var http = require('http'),
	urlparse = require('url'),
    superagent = require('superagent'),
    dateFormat = require('../lib/dateFormat'),
    getIPAdress = require('../lib/ipAdress'),
    express = require('express'),
    app = express();

var url = 'http://www.dafangya.com.cn';
//app.use(require('body-parser')());
Date.prototype.format = dateFormat;

var bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

function server(port,domain) {
    var url = domain || 'http://www.dafangya.com.cn'; //cli 开启指定域名
    var port = port || 8010;
    var ip = 'http://' + getIPAdress() + ':' + port,
        localIp = 'http://127.0.0.1:'+ port;
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        // X-Requested-With, Content-Type, authorization
        res.header("Access-Control-Allow-Headers", "Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-Requested-With");
    	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header('Access-Control-Expose-Headers','ETag, Www-Authenticate, X-Www-Authenticate');
    	res.header("X-Powered-By",' 3.2.1');
        // console.log(req.body);
        if(req.url == '/favicon.ico'){
            return;
        }

        var pathurl = req.headers['accept'].split(',')[0];
        if(pathurl && (/^(\w+:\/\/)?\w+(\.\w+)+.*$/.test(pathurl))){
            url = pathurl; //ajax指定开启域名
        }else{
        	url = domain || 'http://www.dafangya.com.cn'
        }
        var authorization = req.headers['authorization'] || '';
        //post
        superagent[req.method.toLocaleLowerCase()](url + req.url)
            .send(req.body)
            .set('authorization', authorization)
            .timeout(3000)
            .end(function (err, data) {
                if(/^(\w+:\/\/)?\w+(\.\w+)+.*$/.test(pathurl)){
                    var infourl = pathurl + urlparse.parse(req.url).pathname; //ajax指定开启域名
                }else if(domain){
                    var infourl = domain + urlparse.parse(req.url).pathname; //ajax指定开启域名
                }else{
                    var infourl = 'http://www.dafangya.com.cn' + urlparse.parse(req.url).pathname; //ajax指定开启域名
                }
                console.log(('\n [Request URL] ' + infourl).gray);
                console.log((' [Request Method] ' + req.method).gray);
                              //使用方法 
				var now = new Date(); 
				var nowStr = now.format("yyyy-MM-dd hh:mm:ss");
                if (err) {
                    //console.log(err);
                    if(data){
                        console.log((' [Error Code] '+ data.status + ' ' + http.STATUS_CODES[data.status]).red);
                        res.sendStatus(err.status);
                    }else{
                        console.log((' [Error Status] '+ url + ' 请求超时').red);
                    }
                    //console.timeEnd(' [Time]'.gray);
                    console.log((' [' + nowStr + ']').gray);
                    res.end(req.url);
                    return;
                }
                console.log((' [Scuess Code] '+ data.status + ' ' + http.STATUS_CODES[data.status]).yellow);
                console.log((' [' + nowStr + ']').gray);
                // res.sendStatus(data.status);

                if (data.ok) {
                    if(authorization){
                        res.header('www-authenticate', data.headers['www-authenticate']);
                        res.header('x-www-authenticate', data.headers['x-www-authenticate']);
                    }
                    if(typeof data.text == 'object'){
                    	res.header('Content-Type', 'application/json;charset=utf-8');
                    	res.json(data.text);
                    }else{
                        //plain
                    	res.header('Content-Type', 'text/html;charset=utf-8');
                    	res.end(data.text);//data.text
                    }
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
