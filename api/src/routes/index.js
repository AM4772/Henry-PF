const { Router } = require("express");
const router = Router();

router.use("/books", require("./books"));
router.use("/users", require("./users"));
router.use("/usernames", require("./usernames"));
router.use("/emails", require("./emails"));
router.use("/authors", require("./authors"));
router.use("/categories", require("./categories"));
router.use("/login", require("./login"));
router.use("/reviews", require("./reviews"));
router.use("/payments", require("./payments"));
router.use("/confirm", require("./confirm"));
router.use("/stats", require("./stats"));
router.get("/", (req, res) => {
  res.send(
    "<div>All books: <a href=/books>/books</a></div> <div>Test books query: <a href=/books?title=hobbit>/books?title=hobbit</a></div> <div> Test books by ID: <a href=/books/10 > /books/10</a></div> <div>All users: <a href=/users>/users</a></div><div> Test user query: <a href=/users?username=test>/user?username=test</a></div><div> Test users by ID: <a href=/users/1 > /users/1</a></div> <div> Test username: <a href=/usernames> /usernames</a></div> <div> Test emails: <a href=/emails> /emails</a></div><div> All authors: <a href=/authors>/authors</a></div> <div> All categories: <a href=/categories>/categories</a></div>"
  );
});

module.exports = router;
