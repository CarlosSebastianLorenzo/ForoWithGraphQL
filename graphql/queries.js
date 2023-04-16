const { GraphQLList, GraphQLID} = require('graphql');
const { UserType, PostType } = require('./types');
const { User, Post} = require('../models')

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

module.exports = { users, user, posts };