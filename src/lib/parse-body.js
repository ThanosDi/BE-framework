const {cond, T, prop, propEq, pipe} = require('ramda')
const {json, text, buffer} = require('micro')

const isJson = pipe(prop('headers'), propEq('content-type', 'application/json'))
const isText = pipe(prop('headers'), propEq('content-type', 'text-plain'))

module.exports = cond([
	[isJson, json],
	[isText, text],
	[T, buffer],
])
