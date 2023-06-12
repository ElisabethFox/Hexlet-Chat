'use strict'

const warning = require('process-warning')()
warning.create('FastifyWarning.fastify-jwt', 'FST_MODULE_DEP_fastify-jwt'.toUpperCase(), 'fastify-jwt has been deprecated. Use @fastify/jwt@5.0.0 instead.')
warning.emit('FST_MODULE_DEP_fastify-jwt'.toUpperCase())

module.exports = require('fastify-jwt-deprecated')
