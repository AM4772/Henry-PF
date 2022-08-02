const { Router } = require('express');
const {
  getUserByUsername,
  getUserById,
  createUser,
  getUsers,
  modifyUsers,
  deleteUser,
  suspendUser,
  manualEnabled,
} = require('../controllers/UsersControllers');

const { validateUsersPost } = require('../utils/validations/userValidations');

const {
  getFavourites,
  deleteFavourites,
  addFavourites,
} = require('../controllers/FavouritesControllers');
const {
  getCartItem,
  addCartItem,
  deleteCartItem,
} = require('../controllers/CartControllers');
const { verifyLogin } = require('../utils/verifyLogin/verifyUserLogin');

const router = Router();

//----------------------------FAVS--------------------------------------
//----------------------------------------------------------------------
router.get('/:ID/favourites', async (req, res) => {
  const { ID } = req.params;
  try {
    if (ID) {
      if (isNaN(ID)) {
        return res.status(400).json({ message: 'ID must be a number' });
      }
      const favourites = await getFavourites(ID);
      res.json(favourites);
    }
  } catch (err) {
    res.status(400).json('DATABASE ERROR');
  }
});
router.post('/:ID/favourites', async (req, res) => {
  const { ID } = req.params;
  const userID = ID;
  const bookID = req.body.ID;

  try {
    if (isNaN(userID) && isNaN(bookID)) {
      return res.status(400).json({ message: 'ID must be a number' });
    }
    const favourites = await addFavourites(parseInt(bookID), parseInt(userID));
    favourites
      ? res
          .status(200)
          .json({ data: favourites, message: 'Favorite added successfully' })
      : res.status(400).json({ message: `Failed to add favorite` });
  } catch (err) {
    res.status(400).json('DATABASE ERROR');
  }
});

router.delete('/:ID/favourites', async (req, res) => {
  const { ID } = req.params;
  const userID = ID;
  const bookID = req.body.ID;

  const delFavourites = await deleteFavourites(
    parseInt(bookID),
    parseInt(userID)
  );
  delFavourites
    ? res
        .status(200)
        .json({ message: 'Favorite deleted successfully', data: delFavourites })
    : res.status(400).json({ message: `Failed to delete favorite` });
}),
  //----------------------------CART------------------------------------
  //----------------------------------------------------------------------

  router.get('/:ID/cart', async (req, res) => {
    const { ID } = req.params;
    try {
      if (ID) {
        if (isNaN(ID)) {
          return res.status(400).json({ message: 'ID must be a number' });
        }
        const cartItem = await getCartItem(ID);
        res.json(cartItem);
      }
    } catch (err) {
      res.status(400).json('DATABASE ERROR');
    }
  });
router.post('/:ID/cart', async (req, res) => {
  const { ID } = req.params;
  const userID = ID;
  const bookID = req.body.ID;

  try {
    if (isNaN(userID) && isNaN(bookID)) {
      return res.status(400).json({ message: 'ID must be a number' });
    }
    const itemAdded = await addCartItem(parseInt(bookID), parseInt(userID));
    itemAdded
      ? res
          .status(200)
          .json({ message: 'Item added successfully', data: itemAdded })
      : res.status(400).json({ message: `Failed to add item` });
  } catch (err) {
    res.status(400).json('DATABASE ERROR');
  }
});

router.delete('/:ID/cart', async (req, res) => {
  const { ID } = req.params;
  const userID = ID;
  const bookID = req.body.ID;

  const delCartItem = await deleteCartItem(parseInt(bookID), parseInt(userID));
  delCartItem === 0
    ? res.status(400).json({ message: 'Nothing to remove', data: delCartItem })
    : delCartItem
    ? res
        .status(200)
        .json({ message: 'Item deleted successfully', data: delCartItem })
    : res.status(400).json({ message: `Failed to delete item` });
}),
  //----------------------------Auth0-----------------------------------
  //----------------------------------------------------------------------
  router.post('/auth0', async (req, res) => {
    try {
      const newUser = await createUser(req.body);
      newUser
        ? res
            .status(201)
            .json({ data: newUser, message: 'Successfully registered' })
        : res.status(400).json({ message: `Error creating user` });
    } catch (err) {
      res.status(400).json('DATABASE ERROR');
    }
  });

router.post('/auth0/login', async (req, res) => {
  try {
    const newUser = await verifyLogin(req.body);
    newUser
      ? res
          .status(201)
          .json({ data: newUser, message: 'Successfully registered' })
      : res.status(400).json({ message: `Error creating user` });
  } catch (err) {
    res.status(400).json('DATABASE ERROR');
  }
});

//----------------------------USERS-----------------------------------
//----------------------------------------------------------------------
router.get('/', async (req, res) => {
  const { username } = req.query;

  try {
    if (username) {
      const userFound = await getUserByUsername(username.toLowerCase());

      userFound
        ? res.json(userFound)
        : res.status(404).json({ message: `Username ${username} not found` });
    } else {
      const dbUsers = await getUsers();
      dbUsers
        ? res.json(dbUsers)
        : res.status(404).json({ message: 'No users found' });
    }
  } catch (err) {
    res.status(400).json('DATABASE ERROR');
  }
});

router.get('/:ID', async (req, res) => {
  const { ID } = req.params;
  try {
    if (ID) {
      if (isNaN(ID)) {
        return res.status(400).json({ message: 'ID must be a number' });
      }
      const user = await getUserById(ID);
      user
        ? res.json(user)
        : res.status(404).json({ message: `User with ID ${ID} not found` });
    }
  } catch (err) {
    res.status(400).json('DATABASE ERROR');
  }
});

router.post('/', async (req, res) => {
  try {
    const validate = await validateUsersPost(req.body);
    if (!validate) {
      const newUser = await createUser(req.body);
      newUser
        ? res.status(201).json({ message: 'Successfully registered' })
        : res.status(400).json({ message: `Error creating user` });
    } else {
      res.status(400).json(validate);
    }
  } catch (err) {
    res.status(400).json('DATABASE ERROR');
  }
});

router.put('/:ID', async (req, res) => {
  const { ID } = req.params;
  const { suspended, enabled } = req.query;

  try {
    if (ID) {
      if (suspended) {
        const userSuspended = await suspendUser(ID);
        if (userSuspended === 1) {
          return res.status(200).send({
            message: 'User banned permanently',
            resason: 'Too many suspensions',
          });
        } else if (userSuspended === 2) {
          return res.status(404).send({
            message: 'User not found',
          });
        }
        return res.status(200).send(userSuspended);
      } else if (enabled) {
        const userEnabled = await manualEnabled(ID);
        return userEnabled
          ? res.status(200).send(userEnabled)
          : res.status(404).send({
              message: 'User not found',
            });
      }

      const validate = await validateUsersPost(req.body);
      if (!validate) {
        const modified = await modifyUsers(req.body, ID);

        modified
          ? res
              .status(200)
              .json({ message: 'User modified successfully', data: modified })
          : res.status(400).json({ message: `Error modifying user` });
      } else {
        res.status(400).json(validate);
      }
    }
  } catch (err) {
    res.status(400).json('DATABASE ERROR');
  }
});

router.delete('/:ID', async (req, res) => {
  const { ID } = req.params;
  try {
    const deletedUser = await deleteUser(ID);
    deletedUser
      ? res.status(201).json({ message: 'User deleted successfully' })
      : res.status(400).json({ message: `Error deleting user with id ${ID}` });
  } catch (err) {
    res.status(400).json('DATABASE ERROR');
  }
});

module.exports = router;
