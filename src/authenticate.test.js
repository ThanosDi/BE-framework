const httpMocks = require('node-mocks-http');
const authenticate = require('./authenticate');

const username = 'username'
const password = 'password'

describe('authenticate', () => {
	test('requires basic auth', () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: `/`,
			headers: {
				'Authorization': 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
			}
		});

		const app = authenticate({username, password,})(() => 'works')

		expect(() => app(req)).not.toThrow()
		expect(app(req)).toEqual('works')
	})

	test('throws if not authenticated', () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: `/`,
			headers: {
				'Authorization': 'Basic invalid=',
			}
		});

		const app = authenticate({username, password,})(() => 'works')

		expect(() => app(req)).toThrowError('Authentication failed')
	})
});
