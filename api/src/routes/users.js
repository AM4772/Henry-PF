const { Router } = require("express");
const {
  getUserByUsername,
  getUserById,
  createUser,
  getUsers,
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
        : res.status(404).json(`Username ${username} not found`);
    } else {
      let dbUsers = await getUsers();
      dbUsers ? res.json(dbUsers) : res.status(404).json("No users found");
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
        return res.status(400).json("ID must be a number");
      }
      let user = await getUserById(ID);
      user
        ? res.json(user)
        : res.status(404).json(`User with ID ${ID} not found`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const validate = validateUsersPost(req.body);
    if (validate) {
      const newUser = await createUser(req.body);
      newUser
        ? res.status(201).json("User created successfully")
        : res.status(400).json(`Error creating user`);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
