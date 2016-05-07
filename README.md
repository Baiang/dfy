dfy
==========================


大房鸭前端工具，为解决开发中出现问题而诞生。

## 安装插件

全局安装

```bash
npm install -g dfy
```

或者本地安装到项目所在目录。

```bash
npm install dfy
```

##例子

执行`dfy -h`命令，查看帮助文档，有`init`、`server`命令

 

    Usage: dfy [options]

    Commands:

    init [options]              scaffold with specifed template.
    server [options] [options]  launch a server
    
    Options:
    
    -h, --help     output usage information
    -V, --version  output the version number



###创建项目init [options]

创建一个h5项目目录，只需执行`dfy init h5`



###启动跨域服务器server [options][options]

`No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access. `

在本地环境下ajax请求测试服务器数据，后端拒绝的情况下，只需执行`dfy server start`默认端口8010，本地请求地址改成`http://127.0.0.1:8010/`

需要改动端口需要执行`dfy server start -p 8020`



查看help命令，执行`dfy server -h`

```

  Usage: server [options] [options]

  launch a server

  Options:

    -h, --help                  output usage information
    -p, --port <int>            server listen port
    -d, --domain <domain name>  domain name
```

* -p, --port <int>：指定端口，(默认端口8010)
* -d, --domain <domain name>：指定域名，(默认域名www.dafangya.com.cn/h5/)




#### AJAX请求，支持GET、POST请求方式

`dfy server start -d www.baidu.com`

![20160507105740](http://o6sjqwtpl.bkt.clouddn.com/20160507105740.png)

```javascript
	$.ajax({
		url: 'http://127.0.0.1:8010/', //请求本地地址->转到请求百度地址
		type: 'GET',
		data: {
			// name:'wiwi'
		},
		success: function (data) {//请求数据接口进入success回调函数
			console.log(data)
		},
		error: function(data){//请求网页html内容进入error回调函数
			console.log(data.responseText)
		}
	})
```



#### ajax本地域名配置

在本地指定请求哪个数据接口或网页html内容，类似命令行操作

`dfy server start -d http://www.dafangya.com`

```javascript
	$.ajax({
		url: 'http://127.0.0.1:8010/',
		type:'get',
		accepts: {
    		domain: "http://www.dafangya.com" //类似 dfy server start -d [域名] ;
		},
		dataType: "domain",
		data:{
			naem: 'wiwi'
		},
		success: function (data) {
			console.log(data)
		},
		error: function (data) {
			console.log(data)
		}
	})
```

