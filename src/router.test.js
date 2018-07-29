const {F, T} = require('ramda');
const httpMocks = require('node-mocks-http');
const {
	router,
	route,
	story,
	interaction,
	trigger,
	source,
	headers,
	always,
	method,
	path,
} = require('./router');

const handler = jest.fn();

beforeEach(jest.resetAllMocks);

describe('router', () => {
	test('router', async () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/',
		});

		const app = router([T, handler]);

		await app(req, {});
		expect(handler).toHaveBeenCalled();
	});

	test('multiple routes', async () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/',
		});

		const notToCall = jest.fn();

		const app = router([F, notToCall], [T, handler]);

		await app(req, {});
		expect(notToCall).not.toHaveBeenCalled();
		expect(handler).toHaveBeenCalled();
	});

	test('route', () => {
		const [predicate, handler] = route(T, () => 'works!');

		expect(predicate()).toEqual(true);
		expect(handler()).toEqual('works!');
	});

	test('route is curried', () => {
		const fallbackRoute = route(T);
		const [predicate, handler] = fallbackRoute(() => 'works!');

		expect(predicate()).toEqual(true);
		expect(handler()).toEqual('works!');
	});

	test('story', () => {
		const [predicate] = story('1')(() => 'works!');
		const props = {
			payload: {
				result: {
					storyId: '1',
				},
			},
		};

		expect(predicate()).toEqual(false);
		expect(predicate(props)).toEqual(true);
	});

	test('interaction', () => {
		const [predicate] = interaction('1')(() => 'works!');
		const props = {
			payload: {
				result: {
					interaction: {
						id: '1',
					},
				},
			},
		};

		expect(predicate()).toEqual(false);
		expect(predicate(props)).toEqual(true);
	});

	test('trigger', () => {
		const [predicate] = trigger('1')(() => 'works!');
		const props = {
			payload: {
				result: {
					trigger: '1',
				},
			},
		};

		expect(predicate()).toEqual(false);
		expect(predicate(props)).toEqual(true);
	});

	test('source', () => {
		const [predicate] = source('1')(() => 'works!');
		const props = {
			payload: {
				result: {
					source: '1',
				},
			},
		};

		expect(predicate()).toEqual(false);
		expect(predicate(props)).toEqual(true);
	});

	test('headers', () => {
		const [predicate] = headers(['content-type', 'application/json'])(
			() => 'works!',
		);
		const props = {
			req: httpMocks.createRequest({
				method: 'GET',
				path: '/',
				headers: {
					'content-type': 'application/json',
				},
			}),
		};

		expect(predicate()).toEqual(false);
		expect(predicate(props)).toEqual(true);
	});

	test('always', () => {
		const [predicate] = always(() => 'It works!');

		expect(predicate()).toEqual(true);
	});

	test('method', () => {
		const [predicate] = method('GET')(() => 'works!');

		const props = {
			req: httpMocks.createRequest({
				method: 'GET',
				path: '/',
				headers: {
					'content-type': 'application/json',
				},
			}),
		};

		expect(predicate()).toEqual(false);
		expect(predicate(props)).toEqual(true);
	});

	test('path', () => {
		const [predicate, handler] = path('/user/:id')(props => props);

		const props = {
			req: httpMocks.createRequest({
				method: 'GET',
				url: '/user/23',
				headers: {
					'content-type': 'application/json',
				},
			}),
		};

		expect(predicate()).toEqual(false);
		expect(predicate(props)).toBeTruthy();

		expect(handler(props).params).toBeInstanceOf(Object);
	});
});
