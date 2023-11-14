const Koa = require('koa');
const Router = require('koa-router');
const { koaBody } = require('koa-body');
const path = require('path');
const static = require('koa-static');
//引入模块化的子路由
const { roleRouter } = require('./role');
const { accountsRouter } = require('./account');

const app = new Koa();
const router = new Router();
const port = 3001;

app.use(static(path.resolve(__dirname, '../build')));
//密钥
app.keys = ['this is wuhan', 'fristDay'];

/*加载koa-body中间件，使得请求体中的数据可以被正确解析同时被配置到ctx.request.body中，
在后续的路由中可以通过ctx.request.body获取body参数。*/
app.use(koaBody());

//绑定路由
router.use('/api', roleRouter);
router.use('/api', accountsRouter);

app.use(router.routes()).use(router.allowedMethods());

app.listen(port);

console.log(`服务器已启动,当前监听端口为${port},ip为127.0.0.1`);
