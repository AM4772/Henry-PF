const { Router } = require('express');
const router = Router();

const {
  categoriesStats,
  bookStats,
  userStats,
  paymentsStats,
} = require('../controllers/StatsControllers');

router.get('/', async (req, res) => {
  try {
    const catStats = await categoriesStats();
    const bStats = await bookStats();
    const userStat = await userStats();
    const payStat = await paymentsStats();
    if (catStats && bStats)
      res.json({
        books: bStats,
        categories: catStats,
        users: userStat,
        payments: payStat,
      });
    else {
      res.status(404).json('Cannot get Stats');
    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

module.exports = router;
