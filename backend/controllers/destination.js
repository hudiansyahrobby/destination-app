const { getPagination } = require("../helpers/getPagination");
const { getPaginationData } = require("../helpers/getPaginationData");
const { getSort } = require("../helpers/getSort");
const { Destination } = require("../models");
const { Op } = require("sequelize");

exports.create = async (req, res) => {
  const { name, city, province, description, image } = req.body;

  try {
    const destination = await Destination.findOne({
      where: { name, city, province },
    });

    if (destination) {
      return res.status(400).json({ message: "Destination is exist" });
    }

    const newDestination = {
      name,
      city,
      province,
      description,
      image,
    };

    await Destination.create(newDestination);

    return res
      .status(201)
      .json({ message: "Destination has successsfully created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.get = async (req, res) => {
  const { page, size, title, sort } = req.query;

  const titleCondition = title ? { name: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);
  const orderBy = !!sort ? getSort(sort) : ["createdAt", "DESC"];

  try {
    const response = await Destination.findAndCountAll({
      where: titleCondition,
      limit,
      offset,
      order: [orderBy],
    });

    const destinations = getPaginationData(response, page, limit);

    return res.status(200).json({ destinations });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getDetail = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const destination = await Destination.findByPk(id);

    if (!destination) {
      return res.status(400).json({ message: "Destination not found" });
    }

    return res.status(400).json({ destination });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Destination.update(req.body, {
      where: { id },
    });

    if (!updated) {
      return res
        .status(400)
        .json({ message: "Error updating, destination not found" });
    }

    return res
      .status(400)
      .json({ message: "Destination successfully updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    const destination = await Destination.destroy({
      where: { id },
    });

    if (!destination) {
      return res
        .status(400)
        .json({ message: "Error deleting, destination not found" });
    }

    return res
      .status(400)
      .json({ message: "Destination successfully deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
