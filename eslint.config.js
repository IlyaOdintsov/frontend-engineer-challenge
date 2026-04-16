module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['react', '@typescript-eslint', 'import'],
	settings: {
		'import/resolver': {
			typescript: {},
			node: {
				extensions: ['.ts', '.tsx'],
			},
		},
	},
	rules: {
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/no-unused-vars': 'error',
	},
};