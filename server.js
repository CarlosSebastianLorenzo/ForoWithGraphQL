const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./graphql/schema')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(3000)
console.log('Server is running on port 3000 http://localhost:3000/ ')