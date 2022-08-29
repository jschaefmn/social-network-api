const { Schema, model, Types} = require('mongoose');
const formatDate = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type:Date,
      default: new Date(),
      get: (createdAtVal) => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minLength: [1, 'Please add more to your thought!'],
      maxLength: [280, 'Your thought is too long, please condense it!']
    },
    createdAt: {
      type: Date,
      default: new Date(),
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;