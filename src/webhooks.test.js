const httpMocks = require('node-mocks-http');
const {F, T} = require('ramda');
const {route, router, always} = require('./webhooks');

const handler = jest.fn().mockReturnValue('works');

beforeEach(jest.resetAllMocks);

describe('webhooks', () => {
	test('router is an enhancer', () => {
		const req = httpMocks.createRequest({
			method: 'POST',
			url: `/`,
		});

		const app = router(() => () => 'works');
		expect(app(req)).toEqual('works');
	});

	test('router throws not found', () => {
		const req = httpMocks.createRequest({
			method: 'POST',
			url: `/`,
		});

		const app = router(next => next);

		expect(() => app(req)).toThrowError('Not found');
	});

	test('route takes a predicate and a handler', async () => {
		await route(T, handler)(T)();
		await route(F, handler)(T)();

		expect(handler).toHaveBeenCalledTimes(1);
	});

	test('always executed the handler always', async () => {
		await always(handler)()();
		await always(handler)()();
		await always(handler)()();

		expect(handler).toHaveBeenCalledTimes(3);
	});

	test('action picks result.interaction.action');
	test('name picks result.interaction.name');
});
