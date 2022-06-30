import express from 'express';
import { Login, Logout } from '../controllers/auth/Login.js';
import { getDept, getDeptById } from '../controllers/setup/Dept.js';
import { refreshToken } from '../controllers/auth/RefreshToken.js';
import getMenu from '../controllers/setup/Menu.js';
import userRoute from './user.route.js';
import userAccesRoute from './userAccess.route.js';
import sewOutputProdRoute from './production/sewingprod.route.js';
import packProdRoute from './production/packingProd.route.js';

const router = express.Router();

router.post('/login', Login);
router.delete('/logout', Logout);
router.use('/user', userRoute);
router.get('/token', refreshToken);
router.get('/dept', getDept);
router.get('/dept/:id', getDeptById);
router.get('/menu', getMenu);
router.use('/useraccess', userAccesRoute);
router.use('/sewing', sewOutputProdRoute);
router.use('/packing', packProdRoute);

router.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 400));
});

router.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something Wrong!!';
  res.status(statusCode).json({ message: err });
});

export default router;
