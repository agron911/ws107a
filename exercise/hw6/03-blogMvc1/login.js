import Router from 'koa-router'
import loginController from '../controllers/loginController'
const router = new Router();
router.post('/',loginController.loginPost); //對post方法的/login進行處理，呼叫登入管理控制器
router.get('/',loginController.loginGet); //對get方法的/login進行處理
export default router;