const { Router } = require("express");
const router = Router();

const {
  createCampaign,
  getCampaigns,
  getCampaignsById,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaign.controller");

const { authenticateToken } = require("../middleware/authToken");

// const multipleStorage = require("../middleware/multiplemulter");
// const singlemulter = require("../middleware/singlemulter");
const upload = require("../middleware/singlemulter");

router.post("/", authenticateToken, upload, createCampaign);
router.get("/", getCampaigns);
router.get("/:id", getCampaignsById);
router.put("/:id", authenticateToken, updateCampaign);
router.delete("/:id", authenticateToken, deleteCampaign);

module.exports = router;
