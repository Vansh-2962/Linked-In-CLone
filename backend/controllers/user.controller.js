import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getSuggestedConnections = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("connections");
    const suggestedUser = await User.find({
      _id: { $ne: req.user._id, $nin: user.connections },
    })
      .select("name username profilePicture headline")
      .limit(3);
    res.status(200).json(suggestedUser);
  } catch (error) {
    console.log("Error in suggestedUser function : ", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getPublicProfile function : ", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "username",
      "headline",
      "about",
      "location",
      "profilePicture",
      "bannerImg",
      "skills",
      "experience",
      "education",
    ];
    const updatedData = {};
    for (const field of allowedFields) {
      if (req.body[field]) {
        updatedData[field] = req.body[field];
      }
    }
    if (req.body.profilePicture) {
      const result = await cloudinary.uploader.upload(req.body.profilePicture);
      updatedData.profilePicture = result.secure_url;
    }
    if (req.body.bannerImg) {
      const result = await cloudinary.uploader.upload(req.body.bannerImg);
      updatedData.bannerImg = result?.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedData },
      { new: true }
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateProfile function : ", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};
