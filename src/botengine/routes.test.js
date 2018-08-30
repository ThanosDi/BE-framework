const handler = jest.fn().mockReturnValue('works');

beforeEach(jest.resetAllMocks);

describe('botengine', () => {
	test('action picks result.interaction.action');
	test('name picks result.interaction.name');
});
