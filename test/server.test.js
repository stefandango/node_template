import request from 'supertest';
import app from '../main';

before(done => {
	// runs before all tests in this block
	setTimeout(() => {
		done();
	}, 1000);
});

it('responds to /', function testSlash(done) {
	request(app)
		.get('/')
		.expect(200, done);
});
it('404 to random..', function testPath(done) {
	request(app)
		.get('/foo/barr')
		.expect(404, done);
});

export {};
