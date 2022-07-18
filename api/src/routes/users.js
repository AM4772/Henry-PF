const { Router } = require("express");
const router = Router();

router.get("/", async (req, res, next) => {
  const { userName } = req.query;

  try {
    if (userName) {
      let searchName = await getUserByUserName(userName);
      if (searchName.length) {
        return res.json(searchName);
      } else {
        return res.status(404).json("Users not found");
      }
    } else {
      let dbUsers = await getUsers();
      res.send(dbUsers);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:ID", async (req, res, next) => {
  const { id } = req.params.ID;
  try {
    if (id) {
      let detailUser = await getUserById(id);
      if (detailUser) {
        return res.json(detailUser);
      } else null;
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { name } = req.body.name;
  const { surname } = req.body.surname;
  const { username } = req.body.username;
  const { mail } = req.body.mail;
  const { password } = req.body.password;
  const { image } = req.body.image;
  const { type } = req.body.type;
  const { enabled } = req.body.enabled;
  const { suspendedTimes } = req.body.suspendedTimes;

  try {
    const newUsers = await createUsers(
      name,
      surname,
      username,
      mail,
      password,
      image,
      type,
      enabled,
      suspendedTimes
    );

    if (newUsers) return res.status(200).json("User created successfully");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
