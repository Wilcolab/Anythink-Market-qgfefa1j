/**
 * Comments API Router
 * Handles all comment-related HTTP endpoints for posts
 * @module api/comments
 * @requires express
 * @requires mongoose
 */

/**
 * Get all comments for a specific post
 * @route GET /post/:postId
 * @param {string} req.params.postId - The ID of the post to fetch comments for
 * @returns {Object[]} Array of comment objects with populated author username
 * @returns {string} comment._id - The comment ID
 * @returns {string} comment.author - Author object with username
 * @returns {string} comment.post - The post ID
 * @throws {Error} 500 - Failed to fetch comments
 */

/**
 * Delete a comment by ID
 * @route DELETE /:commentId
 * @param {string} req.params.commentId - The ID of the comment to delete
 * @returns {Object} Success message object
 * @returns {string} message - "Comment deleted successfully"
 * @throws {Error} 404 - Comment not found
 * @throws {Error} 500 - Failed to delete comment
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

// Get all comments for a specific post
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate("author", "username");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

//endpoint to delete a comment
router.delete("/:commentId", async (req, res) => {  
    try {  
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
});
