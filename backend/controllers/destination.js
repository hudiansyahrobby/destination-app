const { Op } = require("sequelize");
const fs = require("fs");

const { getPagination } = require("../helpers/getPagination");
const { getPaginationData } = require("../helpers/getPaginationData");
const { getSort } = require("../helpers/getSort");
const { Destination, Comment, User } = require("../models");
const {
  uploadToCloudinary,
  deleteImageOnCloudinary,
} = require("../helpers/initCloudinary");
const { deleteImages } = require("../helpers/deleteImages");
const { getPublicId } = require("../helpers/getPublicId");

exports.create = async (req, res) => {
  const { name, city, province, description, images } = req.body;
  try {
    const destination = await Destination.findOne({
      where: { name, city, province },
    });

    if (destination) {
      deleteImages(images);
      return res.status(400).json({ message: "Destination is exist" });
    }

    // Upload and Delete Images
    const imageURL = [];
    const files = images;
    for (const file of files) {
      const path = `public/${file}`;
      const newPath = await uploadToCloudinary(path);
      imageURL.push(newPath);
      fs.unlinkSync(path);
    }

    const newDestination = {
      name,
      city,
      province,
      description,
      images: imageURL,
    };

    const createdDestination = await Destination.create(newDestination);

    return res.status(201).json({
      message: "Destination has successsfully created",
      destination: createdDestination,
    });
  } catch (error) {
    deleteImages(images);
    return res.status(500).json({ message: error });
  }
};

exports.get = async (req, res) => {
  const { page, size, search, sort } = req.query;

  const searchCondition = search
    ? { name: { [Op.iLike]: `%${search}%` } }
    : null;

  const { limit, offset } = getPagination(page, size);
  const orderBy = !!sort ? getSort(sort) : ["createdAt", "DESC"];

  try {
    const response = await Destination.findAndCountAll({
      where: searchCondition,
      limit,
      offset,
      order: [orderBy],
    });

    const destinations = getPaginationData(response, page, limit);
    return res.status(200).json({ destinations });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

exports.getDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const destination = await Destination.findByPk(id, {
      include: [
        {
          model: Comment,
          attributes: {
            exclude: ["DestinationId", "destinationId", "UserId", "userId"],
          },
          as: "comments",
          include: [
            {
              model: User,
              attributes: ["name"],
              as: "user",
            },
          ],
        },
      ],
    });

    if (!destination) {
      return res.status(400).json({ message: "Destination not found" });
    }

    return res.status(200).json({ destination });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, city, province, description, images } = req.body;

  try {
    const destination = await Destination.findByPk(id);

    if (!destination) {
      return res.status(400).json({ message: "Destination not found" });
    }

    // Delete images on Cloudinary
    const public_ids = getPublicId(destination.images);

    for (const public_id of public_ids) {
      await deleteImageOnCloudinary(public_id);
    }
    // Reupload images on cloudinary

    const imageURL = [];
    const files = images;
    for (const file of files) {
      const path = `public/${file}`;
      const newPath = await uploadToCloudinary(path);
      imageURL.push(newPath);
      fs.unlinkSync(path);
    }

    const updatedDestinationData = {
      name,
      city,
      province,
      description,
      images: imageURL,
    };

    const [_, updatedDestination] = await Destination.update(
      updatedDestinationData,
      {
        where: { id },
        returning: true,
        plain: true,
      }
    );
    return res.status(200).json({
      destination: updatedDestination,
      message: "Destination successfully updated",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    const destination = await Destination.findByPk(id);

    if (!destination) {
      return res
        .status(400)
        .json({ message: "Error deleting, destination not found" });
    }

    const public_ids = getPublicId(destination.images);

    await Destination.destroy({
      where: { id },
    });

    for (const public_id of public_ids) {
      await deleteImageOnCloudinary(public_id);
    }

    return res.status(200).json({
      message: "Destination successfully deleted",
      destination: destination,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
