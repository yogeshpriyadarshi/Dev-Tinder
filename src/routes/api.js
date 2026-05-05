const express = require('express');
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/profile", require("./profile"));
router.use("/request", require("./request"));
router.use("/connection", require("./connection"));
router.use("/chat", require("./chat"));

module.exports = router;
