const { Router } = require('express');
const router = Router();

const {
  getAllReviews,
  getReviewUser,
  getReviewBook,
  validateReview,
  createReview,
  modifyReview,
  deleteReview,
} = require('../controllers/ReviewsControllers');

router.get('/', async (req, res) => {
  try {
    let reviews = await getAllReviews();
    if (reviews) {
      return reviews[0] === undefined
        ? res.status(200).json({ message: 'Cannot get reviews' })
        : reviews
        ? res.json(reviews)
        : res.status(200).json({ message: 'Cannot get reviews' });
    }
    return res.status(200).json({ message: 'Cannot get reviews' });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.get('/book/:ID', async (req, res) => {
  const { ID } = req.params;
  try {
    if (isNaN(ID)) {
      return res.status(400).json({ message: 'ID must be a number' });
    }
    let reviewBook = await getReviewBook(ID);
    reviewBook
      ? res.json(reviewBook)
      : res.status(404).json({ message: 'Review not found with id ' + ID });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.get('/user/:ID', async (req, res) => {
  const { ID } = req.params;
  try {
    if (isNaN(ID)) {
      return res.status(400).json({ message: 'ID must be a number' });
    }
    let reviewUser = await getReviewUser(ID);
    reviewUser
      ? res.json(reviewUser)
      : res.status(404).json({ message: 'Review not found with id ' + ID });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const validate = await validateReview(req.body);
    if (!validate) {
      const newReview = await createReview(req.body);
      newReview
        ? res.status(201).json({ message: 'Review created successfully' })
        : res.status(400).json({ message: `Error creating review` });
    } else {
      res.status(400).json(validate);
    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.put('/:ID', async (req, res) => {
  const { ID } = req.params;
  const { report, user } = req.query;
  try {
    if (ID) {
      if (report) {
        const modified = await modifyReview(req.body, ID, report, user);
        return modified
          ? res.status(200).json({ message: 'Review modified successfully' })
          : res.status(400).json({ message: `Error modifying review` });
      }
      const validate = await validateReview(req.body);
      if (!validate) {
        const modified = await modifyReview(req.body, ID, report);
        modified
          ? res.status(200).json({ message: 'Review modified successfully' })
          : res.status(400).json({ message: `Error modifying review` });
      } else {
        res.status(400).json(validate);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

router.delete('/:ID', async (req, res) => {
  const { ID } = req.params;
  try {
    if (isNaN(ID)) {
      return res.status(400).json({ message: 'ID must be a number' });
    }
    const delReview = await deleteReview(ID);
    delReview
      ? res.status(201).json({ message: 'Review deleted successfully' })
      : res
          .status(400)
          .json({ message: `Error deleting review with id ${ID}` });
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

module.exports = router;
