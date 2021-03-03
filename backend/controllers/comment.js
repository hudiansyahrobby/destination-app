const { Comment } = require("../models");

exports.create = async (req, res) => {
  const { destinationId } = req.params;
  const { rating, content } = req.body;
  const { id: userId } = req.user.dataValues;

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
          "You have commented on this destination, please edit your commment instead",
      });
    }

    const newComment = {
      rating,
      content,
      destinationId,
      userId,
    };

    const _newComment = await Comment.create(newComment);

    return res
      .status(201)
      .json({ comment: _newComment, message: "Comment added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const { destinationId, commentId } = req.params;
  const { rating, content } = req.body;
  const { id: userId } = req.user.dataValues;
  try {
    const comment = await Comment.findByPk(commentId);

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
      isEdited: true,
    };

    const [_, _updatedComment] = await Comment.update(updatedComment, {
      where: {
        id: commentId,
      },
      returning: true,
      plain: true,
    });
    return res.status(200).json({
      message: "Comment updated successfully",
      comment: _updatedComment,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  const { commentId } = req.params;
  const { id: userId } = req.user.dataValues;

  try {
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(400).json({ message: "Comment not found" });
    }

    if (comment.userId !== userId) {
      return res
        .status(400)
        .json({ message: "Can't delete comment that is not yours" });
    }

    await Comment.destroy({
      where: {
        id: commentId,
      },
    });

    return res.status(200).json({
      message: "Comment deleted successfully",
      comment,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
