var path = require('path')
module.exports = function (p) {
  return path.join(process.cwd(), 'server', p)
}
