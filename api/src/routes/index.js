const { Router } = require("express");

const router = Router();

router.use("/books", require("./books"));
router.use("/users", require("./users"));
router.use("/authors", require("./authors"));
router.use("/categories", require("./categories"));

module.exports = router;
