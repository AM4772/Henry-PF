const { Router } = require("express");
const {
  getUserByUsername,
  getUserById,
  createUser,
  getUsers,
  modifyUsers,
  deleteUser,
  getFavourites
} = require("../controllers/UsersControllers");

const { validateUsersPost } = require("../utils/validations/userValidations");

const router = Router();

router.get("/", async (req, res) => {
  const { username } = req.query;

  try {
    if (username) {
      let userFound = await getUserByUsername(username.toLowerCase());
      userFound
        ? res.json(userFound)
        : res.status(404).json({ message: `Username ${username} not found` });
    } else {
      let dbUsers = await getUsers();
      dbUsers
        ? res.json(dbUsers)
        : res.status(404).json({ message: "No users found" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:ID", async (req, res) => {
  const { ID } = req.params;
  try {
    if (ID) {
      if (isNaN(ID)) {
        return res.status(400).json({ message: "ID must be a number" });
      }
      let user = await getUserById(ID);
      user
        ? res.json(user)
        : res.status(404).json({ message: `User with ID ${ID} not found` });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:ID/favourites", async (req, res) => {
  const { ID } = req.params;
  try {
    if (ID) {
      if (isNaN(ID)) {
        return res.status(400).json({ message: "ID must be a number" });
      }
      let user = await getFavourites(ID);
      user
        ? res.json(user)
        : res.status(404).json({ message: `User with ID ${ID} not found` });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const validate = await validateUsersPost(req.body);
    if (!validate) {
      const newUser = await createUser(req.body);
      newUser
        ? res.status(201).json({ message: "Successfully registered" })
        : res.status(400).json({ message: `Error creating user` });
    } else {
      res.status(400).json(validate);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.put("/:ID", async (req, res) => {
  const { ID } = req.params;
  try {
    if (ID) {
      const validate = await validateUsersPost(req.body);
      if (!validate) {
        const modified = await modifyUsers(req.body, ID);
        modified
          ? res.status(200).json({ message: "User modified successfully" })
          : res.status(400).json({ message: `Error modifying user` });
      } else {
        res.status(400).json(validate);
      }
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.delete("/:ID", async (req, res) => {
  const { ID } = req.params;
  try {
    const deletedUser = await deleteUser(ID);
    deletedUser
      ? res.status(201).json({ message: "User deleted successfully" })
      : res.status(400).json({ message: `Error deleting user with id ${ID}` });
  } catch (err) {
    res.status(400).json(err.message);
  }
});
module.exports = router;
