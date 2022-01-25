import request from 'supertest';
import app from '../main';

before(done => {
	// runs before all tests in this block
	setTimeout(() => {
		done();
	}, 1500);
});

describe('Server', () => {
	describe('GET /', () => {
		it('responds to /', done => {
			request(app)
				.get('/')
				.expect(200)
				.end(done);
		});
	});
	describe('GET /foo/barr', () => {
		it('404 to random..', done => {
			request(app)
				.get('/foo/barr')
				.expect(404)
				.end(done);
		});
	});
});

export {};
