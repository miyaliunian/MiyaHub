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

> 1. 注册接口
>
>    ```javascript
>    // 接口以post方式调用
>    http://localhost:8000/users/
>    // 如果调用成功 会返回如下结构的返回值
>    {
>        "fieldCount": 0,
>        "affectedRows": 1,
>        "insertId": 4,
>        "info": "",
>        "serverStatus": 2,
>        "warningStatus": 0
>    }
>    ```
>
>    
>
> 2. 登录接口
>
>    ```javascript
>    // 接口以post方式调用
>    http://localhost:8000/login 
>    //如果调用成功，会返回如下接口的返回值
>    {
>        "id": 3,
>        "name": "前端逗逗飞",
>        "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IuWJjeerr-mAl-mAl-mjniIsImlhdCI6MTYzMTc3MDk3NCwiZXhwIjoxNjMxODU3Mzc0fQ.TDTTW2f7nBX4Hrbtii40f8xRCbK6QFl05WuCWB2yh0nwYLa1pMCXz6RkhSPspDyb7iyqYirGcAdZQ2_yDrg42yBsEhyQPijRi8rQdtssnDR0cVaREnF5CMveQndyjRBOldcT8yH6TDAQVqkX8PR95dwLO5dtxkK9-VgU7ZbSAoo"
>    }
>    ```
>
>    
>
> 3. 动态发布接口
>
>    ```javascript
>    //接口以为post方式调用
>    http://localhost:8000/moment
>    //入参为
>    {
>      "name": "前端逗逗飞",
>      "password": "123456",
>      "content": "快手，直到春节前，这个名字还只是在知乎上被黑地体无完肤的一个软件，当然，并不是唯一一个，不过这并不重要。春节的时候，我回到乡下的农村，乡下信号极差，只能勉强看微信，村里有一个公共WiFi，至少还能连上网，一群年轻人就在那里蹭WiFi，不断用方言点评着某个美女的身材多好看，某个人又做了什么蠢事，哪个游戏主播多厉害，语言粗俗，声音还很肆无忌惮。我对他们全无好感，不过就在旁边默默拿着手机看着番剧，音量也不敢调太大，怕伤耳朵。这时候其中一"
>    }
>    //如果调用成功，会返回如下结构返回值
>    {
>        "fieldCount": 0,
>        "affectedRows": 1,
>        "insertId": 21,
>        "info": "",
>        "serverStatus": 2,
>        "warningStatus": 0
>    }
>    ```
>
>    
>
> 4. 评论接口
>
>    ```javascript
>    //接口以PATCH方式调用 
>    //将动态的的id拼接到url中
>    http://localhost:8000/comment/4
>    //入参为
>    {
>        "content": "最新修改的评论"
>    }
>    //如果调用成功，会返回如下结构返回值
>    {
>        "fieldCount": 0,
>        "affectedRows": 1,
>        "insertId": 0,
>        "info": "Rows matched: 1  Changed: 0  Warnings: 0",
>        "serverStatus": 2,
>        "warningStatus": 0,
>        "changedRows": 0
>    }
>    ```
>
>    
>
> 5. 评论回复接口
>
>    ```javascript
>    //接口以post方式调用 
>    //将动态的的id拼接到url中
>    http://localhost:8000/comment/4/reply
>    //入参
>    {
>        "momentId": 19,  //评论的id
>        "content": "评论的回复"
>    }
>    //如果调用成功，会返回如下结构返回值
>    {
>        "fieldCount": 0,
>        "affectedRows": 1,
>        "insertId": 0,
>        "info": "Rows matched: 1  Changed: 0  Warnings: 0",
>        "serverStatus": 2,
>        "warningStatus": 0,
>        "changedRows": 0
>    }
>    ```
>
>    
>
> 6. 评论删除接口
>
>    ```javascript
>    //接口以为delete方式调用
>    //要删除的那条评论id拼接到url中
>    http://localhost:8000/comment/6
>    //如果调用成功，会返回如下结构返回值
>    {
>        "fieldCount": 0,
>        "affectedRows": 1,
>        "insertId": 0,
>        "info": "Rows matched: 1  Changed: 0  Warnings: 0",
>        "serverStatus": 2,
>        "warningStatus": 0,
>        "changedRows": 0
>    }
>    ```
>
> 