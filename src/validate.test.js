const httpMocks = require('node-mocks-http');
const validate = require('./validate');

const challenge = 'challenge'
const token = 'token'

describe('validate', () => {
	test('no need for token', () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: `/?challenge=${challenge}&token=${token}`,
		});

		const app = validate()(() => 'works')

		expect(() => app(req)).not.toThrow()
		expect(app(req)).toEqual(challenge)
	})

	test('checks token', () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: `/?challenge=${challenge}&token=invalid`,
		});

		const app = validate(token)(() => 'works')

		expect(() => app(req)).toThrowError('Invalid token')
	})
});
