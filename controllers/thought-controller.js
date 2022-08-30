const { Thought, User } = require('../models');

const thoughtController = {
  getThoughts(req, res) {
    Thought.find({})
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        res.status(400).json(err);
      });
  },
  getThoughtsById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with that id' })
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => {
        res.status(400).json(err);
      })
  },

  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
        );
      })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.thoughtId }, body, { runValidators: true, new: true })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No user found with this Id' });
        }
        res.json(thoughtData);
      })
      .catch(err => res.json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          res.status(404).json({ message: 'No thought found with this ID.' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(userserData => {
        if (!userserData) {
          res.status(404).json({ message: 'No user found with this ID.' });
          return;
        }
        res.json(userserData);
      })
      .catch(err => res.json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this ID. ' });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.json(err));
  },

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought with this Id' });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.json(err));
  }
}

module.exports = thoughtController;