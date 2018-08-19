const httpMocks = require('node-mocks-http');
const {action, webhooks} = require('./webhooks');

const handler = jest.fn().mockReturnValue('works')

describe('webhooks', () => {
	test('works', () => {
		const req = httpMocks.createRequest({
			method: 'POST',
			url: `/test`,
		});

		const app = webhooks(action('test', handler))

		expect(app(req)).toEqual('works')
	})

	test('can handle multiple', () => {
		const req = httpMocks.createRequest({
			method: 'POST',
			url: `/test2`,
		});

		const app = webhooks(
			action('test1', handler),
			action('test2', handler),
		)

		expect(app(req)).toEqual('works')
	})

	test('throws not found', () => {
		const req = httpMocks.createRequest({
			method: 'POST',
			url: `/unknown`,
		});

		const app = webhooks(action('test', handler))

		expect(() => app(req)).toThrowError('Not found')
	})


});
