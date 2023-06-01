// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const productsRouter = require('./products.js');
const reviewsRouter = require('./reviews.js');
const cartRouter = require('./cart.js');
const { restoreUser } = require('../../utils/auth.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/reviews', reviewsRouter);
router.use('/session', cartRouter);


router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });


// GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user: user });
});


router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

router.use(restoreUser);
// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);


module.exports = router;
