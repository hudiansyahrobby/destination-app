const { Comment } = require("../models");

exports.create = async (req, res) => {
  const { rating, content, destinationId } = req.body;
  const { id: userId } = req.user.dataValues;

  console.log(typeof rating);
  try {
    const comment = await Comment.findOne({
      where: {
        destinationId,
        userId,
      },
    });

    if (comment) {
      return res.status(400).json({
        message:
          "You have commented on this destination, please update your commment instead",
      });
    }

    const newComment = {
      rating,
      content,
      destinationId,
      userId,
    };
    await Comment.create(newComment);

    return res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.get = async (req, res) => {
  const { id: userId } = req.user.dataValues;
  try {
    const comments = await Comment.findAll({
      where: {
        userId,
      },
    });

    return res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { rating, content, destinationId } = req.body;
  const { id: userId } = req.user.dataValues;
  try {
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(400).json({ message: "Comment not found" });
    }

    if (comment.userId !== userId) {
      return res
        .status(400)
        .json({ message: "This comment doesn't belong to this user" });
    }

    const updatedComment = {
      rating,
      content,
      destinationId,
      userId,
    };

    await Comment.update(updatedComment, {
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user.dataValues;

  try {
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(400).json({ message: "Comment not found" });
    }

    if (comment.userId !== userId) {
      return res
        .status(400)
        .json({ message: "This comment doesn't belong to this user" });
    }

    await Comment.destroy({
      where: {
        id,
      },
    });

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
