//表示当 packager 阶段所有的文件都分配某些属性

// fis.match('::packager', {
//   spriter: fis.plugin('csssprites')
// });

// 所有被标注为图片的文件添加 hash
/*fis.match('::image', {
  useHash: true
});*/

// fis.match('*', {
//   useHash: false
// });

/*fis.match('::package', { //可对页面散列文件进行合并
  postpackager: fis.plugin('loader')
});*/


fis.match('*.html', {
    //npm i fis-optimizer-html-minifier
  //invoke fis-optimizer-html-minifier
  optimizer: fis.plugin('html-minifier')
});
// 
/* fis.match('*.js', {
   optimizer: fis.plugin('uglify-js')
 });
*/

 fis.match('*.css', {
   useSprite: true,
   optimizer: fis.plugin('clean-css')
 });

 fis.match('*.png', {
   optimizer: fis.plugin('png-compressor')
 });
/*fis.match('/start/{zepto.min,backbone.min}.js', {
  packTo: '/static/js/main.js'
});*/


/*fis.match('/lib/{zepto.min,touch,fx,/swiper/swiper.min,underscore-min,backbone-min}.js', {
  packTo: '/static/js/base.min.js'
});


fis.match('/lib/backbone-min.js', {
  packOrder: 100
});*/
fis.match('{css/**.*,lib/**.js,sass/**.*,offline/**.*,js/**.*}', {
  useMap: false 
});

fis.match('/lib/{zepto.min,touch,fx,/swiper/swiper.min,underscore-min,backbone-min}.js', {
    packTo: '/lib/base.min.js',
    useMap: true
});
fis.match('{/js/index/main}.js', {
    useHash: true,
    useMap: true,
    release: '/produce/$0'
});
fis.match('lib/swiper/swiper.min.css', {
    useHash: true,
    release: '/produce/$0'
});
fis.match('css/page/publish/*.css', {
    useHash: true,
    useMap: true,
    release: '/produce/$0'
});/*
fis.match('lib/**.js', {
    useMap: false
});*/
fis.match('/lib/backbone-min.js', {
  packOrder: 100 //packOrder 在低版本不支持 ，升级 fis3-packager-map 解决通过插件配置打包规则忽略文件属性 packOrder
});
// html加 hash
fis.match('html/index/*.html', {
  useHash: true,
  useMap: true, //分配到此属性的资源出现在静态资源表中，默认对 js、css 等文件默认加入了静态资源表中；
  release: '/produce/$0'
});

//资源从构建中去除 FIS3 会读取全部项目目录下的资源，如果有些资源不想被构建，通过以下方式排除。
fis.set('project.ignore', [
  'offline/**',
  'node_modules/**'
]);

//Deploy 插件
fis.match('**', {
  deploy: [
    fis.plugin('dfy-zip'),
 
    fis.plugin('local-deliver', {
      to: './output'
    })
    //fis.plugin('local-deliver') // 发布到本地，由 -d 参数制定目录
  ]
})

//某些资源不产出
/*
fis.match('*.scss', {
  // 设置 release 为 FALSE，不再产出此文件
  release: false
})
*/



/*

fis.match('lib/{backbone-min}.js', {
  packTo: '/static/js/backbone.min.js'
});*/

/*fis.match('::package', {
  postpackager: fis.plugin('loader')
});*/
//资源自动合并
//
/*fis.match('::packager', { //fis3-postpackager-loader 说明http://npm.taobao.org/package/fis3-postpackager-loader
  postpackager: fis.plugin('loader', {
    allInOne: true
  })
});*/

fis.match('*.scss', {
  rExt: '.css',
  parser: fis.plugin('node-sass', {
    // options... 
  })
})

