const httpMocks = require('node-mocks-http');
const verify = require('./verify');

const challenge = 'challenge';
const token = 'token';

describe('verify', () => {
	test('checks token', () => {
		const req = httpMocks.createRequest({
			method: 'POST',
			url: `/?token=invalid`,
		});

		const app = verify(token)(() => 'works');
		expect(() => app(req)).toThrow();
	});

	test('responds to challenge', async () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: `/?challenge=${challenge}&token=${token}`,
		});

		const app = verify(token)(() => 'works');
		expect(app(req)).toEqual(challenge);
	});
});
