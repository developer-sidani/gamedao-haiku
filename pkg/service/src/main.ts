import { ApolloServer, gql } from 'apollo-server-express'
import 'dotenv/config'
import express from 'express'
import * as fs from 'fs'
import { graphqlUploadExpress } from 'graphql-upload'

import { resolvers } from './resolvers/resolvers'

const typeDefs = gql(fs.readFileSync(process.cwd() + '/src/schema.graphql').toString())

async function startServer() {
	const server = new ApolloServer({
		typeDefs,
		resolvers: resolvers(),
		cache: 'bounded',
	})
	await server.start()

	const app = express()

	// This middleware should be added before calling `applyMiddleware`.
	app.use(graphqlUploadExpress())

	server.applyMiddleware({ app })

	await new Promise<void>((r) => app.listen({ port: process.env.SERVER_PORT }, r))

	console.log(`🚀 Server ready at http://localhost:${process.env.SERVER_PORT}${server.graphqlPath}`)
}

startServer()