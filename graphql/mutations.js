const { GraphQLString, GraphQLID } = require("graphql");
const {User, Post, Comment} = require('../models');
const {createJWTToken}= require('../util/auth');
const{PostType, CommentType} = require('./types');

const register = {
    type: GraphQLString,
    description: "Register a new user and returns a token",
    args: {
        username: { type: GraphQLString},
        email: { type: GraphQLString},
        password: { type: GraphQLString},
        displayName: { type: GraphQLString}
    },
    async resolve(_, args) {
        const { username, email, password, displayName } = args;

        const user = new User({username, email, password, displayName})
        await user.save();

        const token = createJWTToken({_id : user._id, username: user.username, email: user.email});

        return token;
    }
};

const login = {
    type: GraphQLString,
    description: 'Login a user and returns a token',
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    async resolve(_, args){
        
        const user = await User.findOne({email: args.email}).select('+password')

        if(!user || args.password !== user.password)
            throw new Error('Invalid Credentials'); 

        const token = createJWTToken({_id : user._id, username: user.username, email: user.email});

        return token;
    }
};

const createPost = {
    type: PostType,
    description: 'Create a new post and return id of the post, title, body and author',
    args: {
        title: { type: GraphQLString},
        body: { type: GraphQLString}
    },
    async resolve(_, args, { verifiedUser}){
        const post = new Post({
            title: args.title,
            body: args.body,
            authorId: verifiedUser._id
        })
        await post.save();

        return post
    }
};

const updatePost = {
    type: PostType,
    description: 'Update a post',
    args: {
        id: { type: GraphQLID},
        title: { type: GraphQLString},
        body: { type: GraphQLString}
    },
    async resolve(_, {id, title, body}, { verifiedUser}){

        if (!verifiedUser) throw new Error("Unauthorized");

        const updatedPost = await Post.findByIdAndUpdate(
            {_id: id, authorId: verifiedUser._id},
            {
                title,
                body
            },
            {
                new: true,
                runValidators: true
            }
            )

        return updatedPost
    }
};

const deletePost = {
    type: GraphQLString,
    description: "Delete a post",
    args: {
        postId: { type: GraphQLID},
    },
    async resolve(_, {postId}, {verifiedUser}) {
        if (!verifiedUser) throw new Error ("Unhautorized")
        
        const postDeleted = await Post.findByIdAndDelete({
            _id: postId,
            authorId: verifiedUser._id,
        });

        if (!postDeleted) throw new Error ("Post not found");

        return "Post deleted";
    }
}

const addComment = {
    type: CommentType,
    description: "Add a comment to a post",
    args:{
        comment: {type: GraphQLString},
        postId: {type: GraphQLID}
    },
    async resolve(_, {comment, postId}, {verifiedUser}){
        const newComment = new Comment({
            comment,
            postId,
            userId:verifiedUser._id
        })
        await newComment.save();

        return newComment
    }
}

module.exports = {
    register,
    login,
    createPost,
    updatePost,
    deletePost,
    addComment
}