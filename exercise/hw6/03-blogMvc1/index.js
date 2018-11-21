import Router from 'koa-router'
import homeRouter from './home'
import loginRouter from './login'
import registRouter from './regist'
const router = new Router();
//登入響應路由
router.use('/login',loginRouter.routes(),loginRouter.allowedMethods());
//註冊響應路由
router.use('/',homeRouter.routes(),homeRouter.allowedMethods());
//主頁響應路由
router.use('/regist',registRouter.routes(),registRouter.allowedMethods());
export default router;