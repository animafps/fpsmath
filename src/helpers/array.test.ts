import { array, games, getObject } from './array';

describe('Check array api functions', () => {
	test('Check the Array is an object, should return an object', () => {
		expect(typeof array).toBe('object');
	});

	test('Check getObject is a function, should return function', () => {
		expect(typeof getObject).toBe('function');
	});

	describe('Get callback from getObject function', () => {
		test('Check getObject FILM with "bf", should return "vML"', () => {
			expect(getObject('bf', 'FILM')).toBe('vML');
		});

		test('Check getObject aliases with "r6", should return ["r6", "rainbow6", "r6s", "siege"]', () => {
			expect(getObject('r6', 'aliases')).toStrictEqual(['r6', 'rainbow6', 'r6s', 'siege']);
		});

		test('Check getObject Yaw with "dbt", should return 0.022', () => {
			const actual = getObject('dbt', 'yaw');

			expect(actual).toBe(0.022);
		});
	});

	test('Check games function output to be a string', () => {
		const actual = games();
		expect(typeof actual === 'string').toBeTruthy();
	});
});
