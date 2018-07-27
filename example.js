const {router, route, story, always} = require('./src/router')
const {respond, text, image} = require('./src/response')
const delay = require('delay')

module.exports = router(
	always(respond(
		image({imageUrl: 'https://placekitten.com/g/300/100'}),
		async ({payload}) => {
			await delay(1000);
			return text({elements: [payload.result]})
		},
	))
)
