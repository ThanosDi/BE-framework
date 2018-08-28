const httpMocks = require('node-mocks-http');
const validate = require('./validate');

const challenge = 'challenge';
const token = 'token';

describe('validate', () => {
	test('checks token', () => {
		const req = httpMocks.createRequest({
			method: 'POST',
			url: `/?token=invalid`,
		});

		const app = validate(token)(() => 'works');
		expect(() => app(req)).toThrow();
	});

	test('responds to challenge', async () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: `/?challenge=${challenge}&token=${token}`,
		});

		const app = validate(token)(() => 'works');
		expect(app(req)).toEqual(challenge);
	});
});
