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
> ![](./screenshot/WX20210917-105929@2x.png)

## 阿里云部署

> 自己购买服务器，然后通过terminal远程连接自己的云服务器
>
> ```shell
> ssh root@47.93.34.95  // ip为云服务器的公网地址
> ```
>
> 然后填写密码

### DNF包管理工具安装NodeJS

> 检查dnf是否可用
>
> ```shell
> dnf --help
> ```
>
> 查看NodeJS是否能被安装
>
> ```shell
> dnf search nodejs
> ```
>
> 如果想详细看下包的信息
>
> ```shell
> dnf info nodejs
> ```
>
> 安装nodejs, 有dnf上的nodejs版本太低了 之后我们还需要安装node的版本管理工具:n
>
> ```shell
> dnf install nodejs
> ```
>
> ```shell
> npm i -g n
> ```
>
> 然后安装最近版本的node
>
> ```shell
> n install lts
> n install latest
> ```
>
> 然后通过n切换版本
>
> ```shell
> n
> ```
>
> 

### DNF包管理工具安装MySQL-Server

> 查找MySQL
>
> ```shell
> dnf search mysql-server
> ```
>
> 查看
>
> ```shell
> dnf info mysql-server
> ```
>
> 安装
>
> ```shell
> dnf install mysql-server	
> ```
>
> 安装成功之后需要启动mysql服务
>
> Active: **active (running)** 表示启动成功
>
> ```shell
> // system control -> systemctl
> systemctl start mysqld
> //查看mysql服务 active表示启动成功
> systemctl status mysqld
> //随着系统一起启动
> systemctl enable mysqld
> ```
>
>
> 由于通过命令行安装是不会设置账号密码 所以需要如下步骤单独设置mysql账号密码
>
> ```shell
> mysql_secure_installation
> //设置的过程中一定要注意运行远程连接
> //设置成功后 在命令行输入查看是否能进入mysql
> mysql -u root -p
> ```
>
> 阿里云服务器开放3306端口
>
> 实例->安全组->配置规则->快速添加
>
> ![image-20210922112205788](/Users/doudoufei/Library/Application Support/typora-user-images/image-20210922112205788.png)
>
> 更新user表开启远程访问
>
> update user set host = '%' where user = 'root';
>
> 然后执行刷新
>
> flush privileges;
>
> 如果产生because of many connection errors，则清理
>
> flush hosts;

### 安装Git

> 安装Git
>
> ```shell
> dnf search git
> ```

### Git Clone 项目

> 从gitHub上拉取项目
>
> 
