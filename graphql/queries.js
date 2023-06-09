const { GraphQLList, GraphQLID} = require('graphql');
const { UserType, PostType, CommentType } = require('./types');
const { User, Post, Comment} = require('../models')

const users = {
    type: new GraphQLList(UserType),
    description: 'Return a list of users',
    resolve(){
        return User.find();
    }
}

const user = {
    type: UserType,
    description: "Return a user by id",
    args: {
        id: {type: GraphQLID}
    },
    resolve(_, args){
        return User.findById(args.id)
    }
}

const posts = {
    type: new GraphQLList(PostType),
    description: "Return a list of posts",
    resolve(){
        return Post.find();
    }
}

const post = {
    type: PostType,
    description: "Return a post by id",
    args: {
        id: {type: GraphQLID}
    },
    resolve(_, args){
        return Post.findById(args.id)
    }
}

const comments = {
    type: new GraphQLList(CommentType),
    description: "Return a list of comments",
    resolve: () => Comment.find()
}

const comment = {
    type: CommentType,
    description: "Return a comment by id",
    args: {
        id: {type: GraphQLID}
    },
    resolve: (_, args) => Comment.findById(args.id)
}

module.exports = { users, user, posts, post , comments, comment};