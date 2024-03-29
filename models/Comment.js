const { Schema, model, Types } = require('mongoose');
const dateFormate = require('../utils/dateFormate')

const ReplySchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment_id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
            replyBody: {
            type: String,
            required: true,
            trim: true
        },
           writtenBy: {
            type: String,
            required: true
        },
            createdAt: {
             type: Date,
            default: Date.now,
            get: createdAtVal => dateFormate(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String,
            required: true
        },
        commentBody: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormate(createdAtVal)
        },

        // gets value from the reply Schema
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of comments and replies on retrieval
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});


const Comment = model('Comment', CommentSchema);

module.exports = Comment;