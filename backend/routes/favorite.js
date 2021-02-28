const { Router } = require("express");

const router = Router();

const { toggle, get } = require("../controllers/favorite");
const { verifyUser } = require("../middlewares/userAuth");

router.post("/favorites/:destinationId", verifyUser, toggle);

router.get("/favorites", verifyUser, get);

module.exports = router;
