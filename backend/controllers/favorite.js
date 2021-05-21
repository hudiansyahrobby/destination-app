const { UserFavorite, User, Destination } = require("../models");

exports.toggle = async (req, res) => {
  const { destinationId } = req.params;
  const { id: userId } = req.user.dataValues;
  try {
    const favoritedItem = await UserFavorite.findOne({
      where: { destinationId, userId },
    });

    // Delete if the item exist, if not create

    if (favoritedItem) {
      await favoritedItem.destroy();

      return res.status(200).json({
        message: "Successfully deleted from favorite item",
        item: favoritedItem,
      });
    } else {
      const newFavoriteItem = {
        userId,
        destinationId,
      };

      const _newFavoriteItem = await UserFavorite.create(newFavoriteItem);
      return res.status(201).json({
        message: "Successfully added to favorite item",
        item: _newFavoriteItem,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.get = async (req, res) => {
  const { id: userId } = req.user.dataValues;

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ["id", "name", "email"],
      include: [
        {
          model: Destination,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          as: "favorite",
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
