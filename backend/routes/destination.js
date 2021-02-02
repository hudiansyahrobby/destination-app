const { Router } = require("express");

const router = Router();

const {
  create,
  get,
  getDetail,
  update,
  remove,
} = require("../controllers/destination");
const { verifyUser, verifyAdmin } = require("../middlewares/userAuth");

router.post("/destinations", verifyUser, verifyAdmin, create);

router.get("/destinations", get);

router.get("/destinations/:id", getDetail);

router.put("/destinations/:id", verifyUser, verifyAdmin, update);

router.delete("/destinations/:id", verifyUser, verifyAdmin, remove);

module.exports = router;
