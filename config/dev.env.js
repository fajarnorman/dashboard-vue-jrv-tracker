'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://api-jarvisv2.dev.mobayar.com/"',
  VERSION_DASHBOARD: '"v 1.0.0"',
  VERSION_LINK: "'v1/'",
  CMSAPI_URL: "'cms/'",
  KEY_UNLOCK: "'ZoiCiz824O6wEiwczwGRDQfihdzYjFsc'",
  BASE_PATH: "'localhost'"
})
