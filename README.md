# Vue-SSR-
手撸Vue服务端渲染

### SSR诞生的原因:
<code>
  由于单页应用的流行, 目前很多项目都是采用单页应用,
  但是单页应用存在着弊端：
  1.SEO优化:（浏览器渲染）
  单页应用浏览器是异步加载数据,大部分爬虫是无法获取到这些数据的
  2.复杂单页:
  单页应用业务庞大复杂起来, 对于渲染的计算会变大, 那么对于低端设备是不友好的, 也就是首屏渲染会变慢
</code>

### SSR正式被提出:
<code>
  渲染代码在服务端执行后，返回渲染后的HTML字符串给浏览器端,使得搜索引擎能被爬虫获取,并且降低首屏渲染时间(因为服务器的设备条件自己是能控制的)
</code>

### 开始造轮子

  1. 准备两份webpack配置选项, 一份是浏览器端, 一份是服务器端
  2. 浏览器:
  ```
    按照正常配置完成,用于服务器端返回的HTML字符串里的JS调用
  ```
  3. 服务器:
  ```
    1.webpack配置的不同(以Node express为例):
      (1). target: 'node' 环境就是node, 所以不需要把Node.js的原生模块打包进去
      (2). libraryTarget: 'commonjs2' 因为是Node, 所以导出的数据是CommonJS
      (3). externals: [nodeExternals()] 第三方依赖包不需要再服务器端上安装
      (4). css loader使用ignore-loader: 服务端不需要加载css文件
    2.webpack入口文件
      和浏览器渲染不同, SSR需要的是HTML字符串, 所以导出的渲染格式应该是字符串而不是DOM
    3.通过express开启路由配置(通配符), 将打包后的SSR配置执行,放入到response里的HTML字符串里(HTML字符串会引用浏览器打包后的js), 最后浏览器访问路由的时候会获取到对应模板, 通过输入的URL,添加到Vue-router里, 获取到相对应的组件, 并呈现在页面中
  ```

  [VueSSR实例可以参考这份配置](https://github.com/vuejs/vue-hackernews-2.0/blob/master/server.js)