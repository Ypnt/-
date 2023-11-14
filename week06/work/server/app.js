const Koa = require('koa');
const static = require('koa-static');
const path = require('path');
const Router = require('koa-router');
const fs = require('fs');
const koaBody = require('koa-body');

// 文件数据
let fileData = null;

const app = new Koa();
const router = new Router();

async function init() {
  var data = await fs.readFileSync('./data/data.json', 'utf-8');
  if (!data) fileData = [];
  else fileData = JSON.parse(data);
}
app.use(koaBody());
init();

// 可修改目录为client打包后的目录，注意路径；或者修改webpack.conf让client打包后的文件夹为public
// app.use(static(path.resolve(__dirname,"../client/build")));
app.use(static(path.resolve(__dirname, './public')));

// 获取初始列表
router.get('/api/todo/list', async (ctx, next) => {
  var data = await fs.readFileSync('./data/data.json', 'utf-8');
  if (!data) fileData = [];
  else fileData = JSON.parse(data);
  ctx.body = fileData;
});

// 创建新todo
router.post('/api/todo/create', async (ctx, next) => {
  var data = ctx.request.body;
  fileData = fileData.concat([data]);
  fs.writeFile('./data/data.json', JSON.stringify(fileData), (err) => {
    if (err) throw err;
    console.log('创建todo' + JSON.stringify(data));
  });
  ctx.body = {
    success: true,
    type: 'create',
  };
});

// 删除指定todo
router.post('/api/todo/delete', async (ctx, next) => {
  var id = JSON.parse(ctx.request.body);
  fileData = fileData.filter((item) => item['id'] !== id);
  fs.writeFile('./data/data.json', JSON.stringify(fileData), (err) => {
    if (err) throw err;
    console.log('删除todo,id为:' + id);
  });
  ctx.body = {
    success: true,
    type: 'dlt',
  };
});

// 更新是否完成todo
router.post('/api/todo/update', async (ctx, next) => {
  var id = JSON.parse(ctx.request.body);
  fileData = fileData.map((item) => {
    if (item['id'] === id) {
      item['finished'] = !item['finished'];
      return item;
    } else return item;
  });
  fs.writeFile('./data/data.json', JSON.stringify(fileData), (err) => {
    if (err) throw err;
    console.log('修改todo状态,id为:' + id);
  });
  ctx.body = {
    success: true,
    type: 'updata',
  };
});

app.use(router.routes());

app.listen(3001);

console.log('starting 127.0.0.1:3001');
