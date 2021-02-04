const { Router } = require("express");

const router = Router();

const { create, get } = require("../controllers/favorite");
const { verifyUser } = require("../middlewares/userAuth");

router.post("/favorites", verifyUser, create);

router.get("/favorites", verifyUser, get);

module.exports = router;
