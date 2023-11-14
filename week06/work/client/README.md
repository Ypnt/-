# client项目说明
===========================

## 环境依赖
vscode 1.77.0
 
===========================

## 使用说明
为项目开启3000端口
```
npm run start
```
项目打包至server/public目录中
```
npm run build
```
 
===========================
 
## 功能说明
实现一个简单的todoList,该todoList可以进行增加,删除,完成状态修改的功能<br>
利用localStorage，如果本地存在数据，则使用本地数据，反之向服务端请求

===========================

## 实现思路
1. 分为上下两部分,上部分为Head下部分为List
2. Head就是一个简单的标题显示
3. List则存在Input输入栏和Todo
4. 在List这个组件中,有一个泛型函数send供Input和Todo使用,Input和Todo可以使用这个函数为端口3001发送请求,还存在一个useEffect函数,用于在初始化时,向端口3001发送请求
5. 接收到端口请求为一个json对象，其中存在success和type，用于返回操作是否成功，以及操作的（删除、更新、添加）

===========================

## 遇到的问题及解决方案
   - 泛型函数的使用不熟练
   - 如何解决跨域的问题?在webpack中设置代理,代理为3001端口
   - 在使用过程中,最开始用于初始化数据的useEffect函数,会执行两次,后面根据老师提示的资料可以知道,是React的锅,在React18的开发文档中提到,在开发者模式中,会对StrictMode组件执行两次,为了检测我们的函数在两次相同执行后结果是否相同,而我在index.tsx中则使用到了 <React.StrictMode>
   - webpack的配置详见文件注释

===========================

## 项目链接
<https://git.wpsit.cn/cug-2023-web-tasks/yangyikai/src/master/week06/work>