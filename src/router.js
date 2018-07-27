const {cond, curry, pathEq, T, pipeP, pipe} = require('ramda')
const {json} = require('micro')

const router = async (...routes) => pipeP(
	async (req, res) => {
		const payload = await json(req)

		return {
			req,
			res,
			payload,
		}
	},
	cond(routes)
)

const route = curry((predicate, handler) => [
	predicate,
	handler,
])

const story = id => route(
	pipe(
		prop('payload'),
		pathEq(['result', 'storyId'], id)
	)
)

const interaction = id => route(
	pipe(
		prop('payload'),
		pathEq(['result', 'interaction', 'id'], id),
	)
)

const trigger = trigger => route(
	pipe(
		prop('payload'),
		pathEq(['result', 'trigger'], trigger)
	)
)

const source = source => route(
	pipe(
		prop('payload'),
		pathEq(['result', 'source'], source)
	)
)

const headers = ([key, value]) => route(
	pipe(
		prop('req'),
		pathEq(['headers', key], value)
	)
)

const always = route(T)

module.exports = {
	router,
	route,
	story,
	interaction,
	trigger,
	source,
	headers,
	always,
}
