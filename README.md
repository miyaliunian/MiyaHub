# MiyaHub

> koa实现：评论管理后台
>
> 有了这个你还需要看后端的脸色吗
>
> 写这个的初衷：回顾node技术栈，为啥用KOA而不用Express,因为Express不能很好的处理异步函数，而KOA在处理异步函数时具有天生的优势，因为KOA的源码再处理中间件时，是通过dispatch调用的 而dispatch内部则是Promsie。另外此项目不包含展示页面，接口调用成功 直接看数据库就行了 相信各位大佬 都能自己实现绚丽的前端页面
>
>   

## 掘金

> 此项目的详细在掘金，地址：
>
> https://juejin.cn/post/7008418805428781063

## 技术栈

> KOA、dotenv、jsonwebtoken、koa-bodyparser、koa-router、mysql2

## 项目特点

> - 用户注册时，对password进行MD5加盐加密 可以直接移植到真实项目中
> - 前端工程化：项目中的动态参数都写在了.env文件，项目结构代码完全按照前端开发规范编写
> - 实现了JWT，可以直接移植到实际的开发中
>   - 在我们的实际场景业务开发中，我们也是通过token验证人员，

## 项目业务流程

> - 用户注册
> - 用户登录： 用户登录成功后，会返回此用户的用户名、密码、token
>   - 在后续的业务流程中，需要携带此token
> - 发表动态
>   - 将token放到header中Authorization字段中
> - 对发表的动态进行评论
> - 对评论编辑
> - 对评论的删除
> - 创建标签页

## JWT

> 执行登录之后的业务场景时需要携带token
>
> ![](./screenshot/WX20210916-141003@2x.png)

## 构建步骤 

> ### 本地创建Mysql数据库，版本无所谓
>
> ### 将sql文件夹中beans_flight.sql建表语句插入到数据库中
>
> ### 修改根目录下的.env 数据库配置文件

## 启动项目

> npm run start 或者 yarn start

## API接口

> 将工程内的根目录文件夹下的`apiscript`直接拷贝到postman中 可以看到完整的接口
>
> ![](/Users/doudoufei/准备跳槽到字节/MiyaHub/screenshot/WX20210917-105929@2x.png)