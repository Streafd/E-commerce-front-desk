```bash
# 克隆项目
git clone https://github.com/Streafd/-.git

# 安装依赖
npm install

# 启动服务
npm run serve
```


# 文件介绍
```bash
build
     ----index.js webpack配置文件【很少修改这个文件】
mock
    ----mock数据的文件夹【模拟一些假的数据mockjs实现的】，因为咱们实际开发的时候，利用的是真是接口

node_modules
     ------项目依赖的模块

public
     ------ico图标,静态页面，publick文件夹里面经常放置一些静态资源，而且在项目打包的时候webpack不会编译这个文件夹，原封不动的打包到dist文件夹里面

src
    -----程序员源代码的地方
    ------api文件夹:涉及请求相关的
    ------assets文件夹：里面放置一些静态资源（一般共享的），放在aseets文件夹里面静态资源，在webpack打包的时候，会进行编译
    ------components文件夹：一般放置非路由组件获取全局组件
    ------icons这个文件夹的里面放置了一些svg矢量图
    ------router文件夹：与路由相关的
    -----store文件夹：一定是与vuex相关的
    -----style文件夹：与样式相关的
    ------utils文件夹：一些对外暴露的js文件
    ------views文件夹：里面放置的是路由组件

App.vue:根组件
main.js：入口文件
```

# 后台路由
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623151630.png)


# 前台首页
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688457596364.png)
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688457639572.png)
# 产品列表
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688457721546.png)

# 产品详情
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688457877686.png)
# 购物车
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688457943539.png)
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688457971969.png)
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688458000495.png)
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688458049181.png)

# 登录注册
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688458067598.png)
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688458135468.png)

