import dotenv from 'dotenv'
import * as path from 'path'

const config = dotenv.config({
  path: '.env.dev',
}).parsed
const env = Object.create(null);
Object.keys(config).forEach((key) => {
  if (config[key] === 'true') {
    env[key] = true
  } else if (config[key] === 'false') {
    env[key] = false
  } else {
    env[key] = '"' + config[key] + '"'
  }
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
