const httpMocks = require('node-mocks-http');
const {F, T} = require('ramda');
const {router} = require('../router');
const {path, method} = require('./routes');

const handler = jest.fn().mockReturnValue('works');

beforeEach(jest.resetAllMocks);

describe('rest routes', () => {
	test('method', async () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: `/`,
		});

		const app = router(method('GET', handler));
		await app(req)

		expect(handler).toHaveBeenCalled();
	})

	test('method negative', async () => {
		const req = httpMocks.createRequest({
			method: 'POST',
			url: `/`,
		});

		const app = router(method('GET', handler));

		await expect(app(req)).rejects.toThrow()
		expect(handler).not.toHaveBeenCalled();
	});

	test('path', async () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: `/users/2`,
		});

		const app = router(path('/users/:id', handler));
		await app(req)

		expect(handler).toHaveBeenCalled();
	})

	test('path negative', async () => {
		const req = httpMocks.createRequest({
			method: 'POST',
			url: `/users/2`,
		});

		const app = router(path('/about', handler));

		await expect(app(req)).rejects.toThrow()
		expect(handler).not.toHaveBeenCalled();
	});
});
