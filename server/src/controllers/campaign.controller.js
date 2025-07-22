const campaignservice = require("../services/campaign.service");
const catchAsync = require("../uitiles/catch");

const createCampaign = async (req, res) => {
  try {
    console.log(req.body);
    const campaignData = await campaignservice.createNewCampaign(req);
    res.status(201).json({
      campaignData,
      message: "Campaign created successfully",
      information: "Waiting for Approvel",
    });
  } catch (error) {
    catchAsync(error, res);
  }
};

const getCampaigns = async (req, res) => {
  try {
    const campaigns = await campaignservice.getAllCampaigns(req);
    res.status(200).json(campaigns);
  } catch (error) {
    catchAsync(error, res);
  }
};

const getCampaignsById = async (req, res) => {
  try {
    const campaignById = await campaignservice.getCampaignsById(req);
    res.status(200).json(campaignById);
  } catch (error) {
    catchAsync(error, res);
  }
};

const updateCampaign = async (req, res) => {
  try {
    const campaign = await campaignservice.updateCampaign(
      req.params.id,
      req.user._id,
      req.body
    );

    res
      .status(200)
      .json({ message: "Campaign updated successfully", campaign });
  } catch (error) {
    catchAsync(error, res);
  }
};

const deleteCampaign = async (req, res) => {
  try {
    const deleteData = await campaignservice.deleteCampaign(
      req.params.id,
      req.user._id
    );
    res.status(201).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    catchAsync(error, res);
  }
};

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignsById,
  updateCampaign,
  deleteCampaign,
};
