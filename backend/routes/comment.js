const { Router } = require("express");

const router = Router();

const { create, update, remove, get } = require("../controllers/comment");
const { verifyUser } = require("../middlewares/userAuth");

router.post("/comments", verifyUser, create);

router.get("/comments/", verifyUser, get);

router.put("/comments/:id", verifyUser, update);

router.delete("/comments/:id", verifyUser, remove);

module.exports = router;
