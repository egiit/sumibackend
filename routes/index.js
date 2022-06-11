import express from 'express';
import { Login, Logout } from '../controllers/auth/Login.js';
import userRoute from './user.route.js';
import { refreshToken } from '../controllers/auth/RefreshToken.js';

const router = express.Router();

router.post('/login', Login);
router.delete('/logout', Logout);
router.use('/user', userRoute);
router.get('/token', refreshToken);

router.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 400));
});

router.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something Wrong!!';
  res.status(statusCode).json({ message: err });
});

export default router;
