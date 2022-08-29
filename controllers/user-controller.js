const { User } = require('../models');

const userController = {
  getUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  addUser({ body }, res) {
    User.create(body)
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err));
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this ID.' });
          return;
        }
        res.status(400).json(err);
      })
      .catch(err => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'Please enter valid data' });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this ID.' });
        }
        return Thought.deleteMany(
          { username: userData.username }
        );
      })
      .then(deletedThoughts => {
        if (!deletedThoughts) {
          res.status(404).json({ message: 'User has been deleted, there are no thoughts' })
        }
        res.json(deletedThoughts);
      })
      .catch(err => res.status(400).json(err));
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { runValidators: true, new: true }
    )
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this ID.' });
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.frindId } },
      { new: true }
    )
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this ID.' });
          return
        }
        res.json(userData);
      })
      .catch(err => res.json(err));
  }
};


module.exports = userController