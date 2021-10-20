import dotenv from 'dotenv'
import * as path from 'path'

const config = dotenv.config({
  path: '.env.dev',
}).parsed
const env = Object.create(null);
Object.keys(config).forEach((key) => {
  if (config[key] === 'true') return env[key] = true
  if (config[key] === 'false') return env[key] = false
  env[key] = '"' + config[key] + '"'
});

module.exports = {
  env: Object.assign({
    NODE_ENV: '"development"'
  }, env),
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  },
  defineConstants: {},
  mini: {},
  h5: {}
}
