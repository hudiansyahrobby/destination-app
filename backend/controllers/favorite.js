const { UserFavorite, User, Destination } = require("../models");

exports.create = async (req, res) => {
  const { destinationId } = req.body;
  const { id: userId } = req.user.dataValues;
  console.log("USER ID", userId);
  try {
    const favoritedItem = await UserFavorite.findOne({
      where: { destinationId, userId },
    });

    console.log("FAVORITED ITEMS", favoritedItem);
    // Delete if the item exist, if not create

    if (favoritedItem) {
      await favoritedItem.destroy();

      return res
        .status(200)
        .json({ message: "Berhasil mengahapus item dari favorit" });
    } else {
      const newFavoriteItem = {
        userId,
        destinationId,
      };
      console.log("ID", newFavoriteItem);
      await UserFavorite.create(newFavoriteItem);
      return res
        .status(201)
        .json({ message: "Berhasil menambah ke favorit item" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.get = async (req, res) => {
  const { id: userId } = req.user.dataValues;

  try {
    const favoritedItems = await User.findAll({
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

    return res.status(200).json({ favoritedItems });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
