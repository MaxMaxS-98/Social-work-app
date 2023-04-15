const {Schema, model} = require('mongoose');
const moment = require('moment');
// const { time } = require('console'); 

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => moment(timestamp).format('MMM DD, YYYY'),
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = reactionSchema;