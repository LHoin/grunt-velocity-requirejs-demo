# Grunt-Velocity前端开发环境部署说明


## 前提

需要nodejs，版本 >0.10

如无nodejs环境，请到官方网站（[http://nodejs.org](http://nodejs.org)）下载、安装

## 步骤

1. 安装grunt-cli

		npm install -g grunt-cli

1. 安装项目依赖包

		npm install

	生产环境运行以下命令

		npm install -production

	碰到网络不好的时候，依赖包可能安装失败，请删除 `node_modules` 重新安装

1. 运行grunt本地服务器

		grunt server

1. 其他命令

		// 编译全站
		grunt build

		/**
		 * --gruntfile: 指定Gruntfile.js文件的位置，在项目根目录外运行Grunt会用到该参数
		 * --node-modules: 指定开发环境依赖包的位置，只需要指定到node_modules父目录即可
		 *				   使用该参数便于在同一机器上运行多个分支时共享依赖包
		 */
		grunt --gruntfile=/home/webapp/src/Gruntfile.js --node-modules=/home/zhi.zhong

		/**
		 * server命令参数
		 *   --host: 指定自动打开浏览器的域名，默认值：localhost
		 *   --port: 指定自动打开浏览器的端口号，默认值：9001
		 */
		 grunt server --host=www.yourdomain.com --port=9002


## 多个工程共享node_modules

为了以后多分支开发方便，可以将 `node_modules` 移动到项目外(比如 `/home/zhi.zhong` )，启动时加上参数 `--node-modules=/home/zhi.zhong` ，指定node\_modules的位置即可

全局路径，也就是带上参数 -g 的安装模式。这个命令会把模块安装在 $PREFIX/lib/node_modules 下，可通过命令 npm root -g 查看全局模块的安装目录。 package.json 里定义的bin会安装到 $PREFIX/bin 目录下，如果模块带有 man page 会安装到 $PREFIX/share/man 目录下

## 目录说明
    ├─package.json  //grunt依赖包配置文件
    ├─pom.xml       //pom文件，设置了maven包信息
    ├─.gitignore
    ├─Gruntfile.js  //grunt配置文件
    ├─node_modules  //依赖包存放目录
    ├─prd           //编译输出目录
    ├─config  
	│   ├─app.js           //项目整体配置
	│   ├─jshintrc.js      //jshint语法配置
	│   ├─chunks.js      //全站js文件打包配置
	│   ├─router-api.js     //异步请求与url对应关系配置
	│   ├─router-template.js//模拟数据URL配置
	│   └─usemin.js      //usemin配置，依赖module.js，一般不需要修改
    ├─app           //pad版程序代码
	│   ├─data      //本地测试数据
	│   │   ├─api   //页面初始化数据
	│  │   └─page  //异步接口数据
	│   ├─css
	│   ├─js
	│   └─vm        //vm模板
    └─.tmp          //运行时生成临时文件

## 打包说明
支持2种打包方式：

1. html代码注释自我描述打包，不需要任何配置
2. requireJS配置打包，[查看配置文件](/blob/master/config/chunks.js)

### css

	<!-- build:css /static/css/common.css -->
	<link rel="stylesheet" href="/static/css/common.css"/>
	<link type="text/css" rel="stylesheet" href="/static/css/ebooking.css">
	<!-- endbuild -->

**代码功能说明**

`build:css`：指明编译方式

将`/static/css/common.css`和`/static/css/ebooking.css`文件打包成`/static/css/common.css`一个文件

### js

	<!-- build:js /static/js/common.js -->
	<script src="/static/js/underscore.js"></script>
	<script src="/static/js/zepto.js"></script>
	<script src="/static/js/zepto.extend.js"></script>
	<script src="/static/js/zepto.mockjax.js"></script>
	<!-- endbuild -->

**代码功能说明**

`build:js`：指明编译方式

将`/static/js/underscore.js`等4个文件打包成`/static/js/common.js`一个文件

## LESS的使用
less文件存为 `.less` 后缀，引用时还是使用 `.css`后缀，例如下面的文件对应着 `/static/css/test.less`

	<link rel="stylesheet" href="/static/css/test.css"/>


## 模拟数据的使用

1. 模拟数据文件保存路径需要和vm模板路径一一对应
2. 模拟数据文件其实是一个js模块化文件，支持js编程，传入参数保护 req 和 res，
在req中能获取到请求参数、cookie等信息，在res中能控制返回状态码、消息体、数据格式等信息

模拟数据分为2类

- 页面初始化数据
- 异步接口数据

### 页面初始化数据
这类数据会随着页面模板一起加载，放在 `/app/data/page/xxx.js`

### 页面初始化数据
这类数据通过AJAX请求加载，放在 `/app/data/api/xxx.js`

## background.less的用法
多页面网站建议使用css sprite合并图片，不建议采用图片css内联
