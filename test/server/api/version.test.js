var request = require('request')

describe('/api/version', function () {
  before(test.startServer)
  after(test.stopServer)

  it('tests version', function (done) {
    request.get({
      uri: test.variables.apiendpoint + '/version',
      headers: {}
    }, function (err, res, body) {
      if (err) return done(err)

      expect(res.statusCode).to.eq(200)
      return done()
    })
  })
})
