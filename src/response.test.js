const {respond, text, image, quickReplies, buttonElement, card, button, end, webhook, goto} = require('./response')

describe('response module', () => {
	test('respond', async () => {
		const payload = await respond()()

		expect(payload.responses).toEqual([])
	})

	test('respond takes async functions', async () => {
		const payload = await respond(
			async () => ({item: 'works!'})
		)()

		expect(payload.responses[0].item).toEqual('works!')
	})

	test('text', () => {
		const payload = text('example')

		expect(payload).toEqual({
			elements: ['example'],
			type: 'text',
			filters: []
		})
	})

	test('text advanced', () => {
		const payload = text({ elements: ['example']})

		expect(payload).toEqual({
			elements: ['example'],
			type: 'text',
			filters: []
		})
	})

	test('image', () => {
		const payload = image('https://example.com/image.jpg')

		expect(payload).toEqual({
			imageUrl: 'https://example.com/image.jpg',
			type: 'image',
			filters: []
		})
	})

	test('image advanced', () => {
		const payload = image({
			imageUrl: 'https://example.com/image.jpg'
		})

		expect(payload).toEqual({
			imageUrl: 'https://example.com/image.jpg',
			type: 'image',
			filters: []
		})
	})

	test('quickReplies', () => {
		const payload = quickReplies({
			title: 'lorem',
			buttons: [],
			filters: []
		})

		expect(payload).toEqual({
			type: 'quickReplies',
			title: 'lorem',
			buttons: [],
			filters: []
		})
	})

	test('buttonElement', () => {
		const payload = buttonElement({
			title: 'lorem',
			type: 'postback',
			value: 'value'
		})

		expect(payload).toEqual({
			title: 'lorem',
			type: 'postback',
			value: 'value'
		})
	})

	test('card', () => {
		const payload = card({
			title: 'title',
			subtitle: 'subtitle',
			imageUrl: 'https://l.com/a.jpg',
			buttons: []
		})

		expect(payload).toEqual({
			type: 'card',
			title: 'title',
			subtitle: 'subtitle',
			imageUrl: 'https://l.com/a.jpg',
			buttons: [],
			filters: [],
		})
	})

	test('button', () => {
		const payload = button({
			title: 'title',
			buttons: []
		})

		expect(payload).toEqual({
			type: 'button',
			title: 'title',
			buttons: [],
			filters: [],
		})
	})

	test('end', () => {
		const payload = end()

		expect(payload).toEqual({
			type: 'end',
			filters: [],
		})
	})

	test('webhook', () => {
		const payload = webhook({
			webhookId: '1',
		})

		expect(payload).toEqual({
			type: 'webhook',
			webhookId: '1',
			filters: [],
		})
	})

	test('goto', () => {
		const payload = goto({
			interactionId: '1',
		})

		expect(payload).toEqual({
			type: 'goto',
			interactionId: '1',
			filters: [],
		})
	})


})
