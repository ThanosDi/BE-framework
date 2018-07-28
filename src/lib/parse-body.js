const {cond, T, prop, propEq, pipe} = require('ramda')
const {json} = require('micro')

const isJson = pipe(prop('headers'), propEq('content-type', 'application/json'))

module.exports = cond([
	[isJson, json],
	[T, () => ({})],
])
