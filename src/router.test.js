const {router, route, story, interaction, trigger, source, headers, always} = require('./router')
const {F, T} = require('ramda')
const httpMocks = require('node-mocks-http');

const handler = jest.fn()

beforeEach(jest.resetAllMocks)

describe('router', () => {
	test('minimal example', async () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/',
		})

		const app = router(
			[T, handler]
		)

		await app(req, {})
		expect(handler).toHaveBeenCalled()
	})

	test('multiple routes', async () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/',
		})

		const notToCall = jest.fn()

		const app = router(
			[F, notToCall],
			[T, handler]
		)

		await app(req, {})
		expect(notToCall).not.toHaveBeenCalled()
		expect(handler).toHaveBeenCalled()
	})
})

describe('route', () => {
	test('minimal example', () => {
		const [predicate, handler] = route(T, () => 'works!')

		expect(predicate()).toEqual(true)
		expect(handler()).toEqual('works!')
	})

	test('is curried', () => {
		const fallbackRoute = route(T)
		const [predicate, handler] = fallbackRoute(() => 'works!')

		expect(predicate()).toEqual(true)
		expect(handler()).toEqual('works!')
	})
})

describe('story', () => {
	test('minimal example', () => {
		const [predicate] = story('1')(() => 'works!')
		const props = {
			payload: {
				result: {
					storyId: '1'
				}
			}
		}

		expect(predicate()).toEqual(false)
		expect(predicate(props)).toEqual(true)
	})
})

describe('interaction', () => {
	test('minimal example', () => {
		const [predicate] = interaction('1')(() => 'works!')
		const props = {
			payload: {
				result: {
					interaction: {
						id: '1'
					}
				}
			}
		}

		expect(predicate()).toEqual(false)
		expect(predicate(props)).toEqual(true)
	})
})

describe('trigger', () => {
	test('minimal example', () => {
		const [predicate] = trigger('1')(() => 'works!')
		const props = {
			payload: {
				result: {
					trigger: '1'
				}
			}
		}

		expect(predicate()).toEqual(false)
		expect(predicate(props)).toEqual(true)
	})
})

describe('source', () => {
	test('minimal example', () => {
		const [predicate] = source('1')(() => 'works!')
		const props = {
			payload: {
				result: {
					source: '1'
				}
			}
		}

		expect(predicate()).toEqual(false)
		expect(predicate(props)).toEqual(true)
	})
})

describe('headers', () => {
	test('minimal example', () => {
		const [predicate] = headers(['content-type', 'application/json'])(() => 'works!')
		const props = {
			req: httpMocks.createRequest({
				method: 'GET',
				path: '/',
				headers: {
					'content-type': 'application/json'
				}
			})
		}

		expect(predicate()).toEqual(false)
		expect(predicate(props)).toEqual(true)
	})
})

describe('always', () => {
	test('minimal example', () => {
		const [predicate] = always(() => 'It works!')

		expect(predicate()).toEqual(true)
	})
})
