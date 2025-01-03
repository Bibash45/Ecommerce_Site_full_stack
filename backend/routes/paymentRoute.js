const express = require("express");
const { requireSignin } = require("../Endpoints middleware/endpointProtectoin");

const {
  initializeEsewa,
  completeEsewa,
  FailedUrl,
} = require("../controllers/esewaController");

const router = express.Router();

router.route("/payment/completeEsewa").get(completeEsewa);
router.route("/payment/failedEsewa").get(FailedUrl);
router.route("/payment/initializeEsewa").post(requireSignin, initializeEsewa);

module.exports = router;
