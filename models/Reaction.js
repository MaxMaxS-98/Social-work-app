const {Schema, Types, model} = require('mongoose');
const moment = require('moment');
// const { time } = require('console'); 

// Schema to create Post model 
const reactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought _id
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