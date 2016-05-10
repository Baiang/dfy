dfy
==========================

[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000)]() [![Github Releases](https://img.shields.io/github/downloads/atom/atom/latest/total.svg?maxAge=2592000)]()

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



###启动服务器代理server [options][options]

> 最近在做大房鸭H5v2.0项目开发，由于页面大量使用ajax请求进行视图渲染及业务处理，而跨域问题，只能采取请求本地静态json文件进行模拟。导致不同的业务逻辑处理返回的数据一致，无法清晰掌握当前的处理的信息状态，并且拉长项目开发时间，就此诞生了"dfy前端工具"。

在数据提供方没有提供对JSONP协议或者 window.name协议的支持，也没有对其它域开放访问权限时，可以通过执行`dfy server start`来进行"数据交互"、**"DOM**元素处理"。



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
* -d, --domain <domain name>：指定域名，(默认域名www.dafangya.com.cn)




#### AJAX请求，支持GET、POST请求方式

一般环境下，本地域下的页面需要请求baidu.com下的资源文件getUsers.php时，直接发送一个指向 baidu.com/getUsers.php的Ajax请求肯定是会被浏览器阻止。

启动`dfy server start -d www.baidu.com`，会自动映射服务资源的模型数据对象，与本地无缝数据交换。

![20160507105740](http://o6sjqwtpl.bkt.clouddn.com/20160509101452.png)

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

可以在本地ajax指定请求域名，无需命令行操作

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



#### 提供外网测试

外网测试域名139.196.31.129:8010，默认请求www.dafangya.com域名



#### [@flamingtop](https://github.com/flamingtop) 贡献2种方法：

1. 在host文件强制目标域名指向测试机ip，或者
2. 关掉浏览器same origin policy，如 chromium-browser -user-data-dir --disable-web-security

