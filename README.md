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
    ------api文件夹:涉及请求相关的
    ------assets文件夹：里面放置一些静态资源（一般共享的），放在aseets文件夹里面静态资源，在webpack打包的时候，会进行编译
    ------components文件夹：一般放置非路由组件获取全局组件
    ------mock文件夹：模拟数据
    ------icons这个文件夹的里面放置了一些svg矢量图
    ------router文件夹：与路由相关的
    -----store文件夹：与vuex相关的
    -----style文件夹：与样式相关的
    ------utils文件夹：一些对外暴露的工具函数模块
    ------views文件夹：里面放置的是路由组件


App.vue:根组件
main.js：入口文件
```

# 技术选型
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688566486784.png)

# 前端路由
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688565370066.png)

# 前台首页
home子组件：分类导航、轮播图、今日推荐、猜你喜欢等
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688457596364.png)
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688457639572.png)

# Search路由
1.搜索查询条件参数理解与准备 2.组件动态数据显示 3.根据分类和关键字进行搜索 4.根据品牌进行搜索 5.根据属性进行搜索 6.排序搜索 7.自定义分页组件
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688457721546.png)

# 产品详情
展示产品的信息数据
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688457877686.png)

# 购物流程
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688457943539.png)
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688457971969.png)
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688458000495.png)
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688458049181.png)

# 登录注册
注册/登陆请求后组件的响应处理 
登陆后自动携带token数据
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688458067598.png)
![image](https://github.com/Streafd/DeomImg/blob/master/qiantai/1688458135468.png)
测试用的账号和密码:
账号:13700000000 密码:111111
有错误就重新注册

# 导航和路由守卫
```bash
router.beforeEach(async (to, from, next) => {
  //token字符串
  let token = store.state.user.token
  //用户信息
  let user = store.state.user.userInfo.name
  if (token) {
    //已登录，不能再前往登录路由
    if (to.path == '/login') {
      next('/home')
    } else {
      //登录了，去的不是login
      //如果有用户名,则直接放行
      if (user) {
        next()
      } else {
        //没有用户信息，派发actions仓库存储用户信息在跳转
        try {
          //获取用户信息在首页展示
          await store.dispatch('user/getuserInfo')
          //放行
          next()
        } catch (error) {
          //token失效了获取不到用户信息，需要清除存储的token，
          await store.dispatch('user/userLogout')
          next('/login')
        }
      }
    }
  } else {
    //未登录
    next()
  }
})
```
