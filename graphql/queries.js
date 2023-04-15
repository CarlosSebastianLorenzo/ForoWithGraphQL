const {GraphQLString} = require('graphql')

const hello = {
    type: GraphQLString,
    description: "Returns a string",
    resolve: () => 'Hello Pibe'
}

module.exports = { hello };