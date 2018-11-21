import Koa from 'koa'
import bodyParser from 'koa-bodyparser' //用於解析request中body的資料
import session from 'koa-session' //用於session會話服務
import convert from 'koa-convert' //koa2使用koa-session需要先進行convert
import mongoose from 'mongoose' //連線mongodb使用
import config from './config' //程式的配置檔案
import router from './routes/index' //引入路由系統檔案
mongoose.connect(`mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbname}`); //從配置檔案中載入資料連線資料庫
const app = new Koa();
app.keys = [config.appKey];
app.use(convert(session(app)));
// parse request body:
app.use(bodyParser());
// add router middleware:
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
console.log('app started at port 3000...');