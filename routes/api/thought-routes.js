const router = require('express').Router();

const {
  getThoughts,
  getThoughtsById,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller')

// GET all thoughts
router
  .route('/').get(getThoughts);

// GET user by id
router
  .route('/:userId')
  .post(addThought);

// GET thought by Id, PUT thought by id
router
  .route('/:thoughtId')
  .put(updateThought)
  .get(getThoughtsById);

// GET a user's thought by Id, delete thought
router
  .route('/:userId/:thoughtId')
  .delete(deleteThought);

// GET Thought reactions
router
  .route('/:thoughtId/reactions')
  .put(addReaction);

// GET reaction Id
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;