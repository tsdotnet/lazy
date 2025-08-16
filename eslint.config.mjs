import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import nodePlugin from 'eslint-plugin-n';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			n: nodePlugin
		},
		rules: {
			"semi": ["warn", "always"],
			"indent": ["warn", "tab", { "SwitchCase": 1 }],
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/ban-types": "off",
			"@typescript-eslint/no-inferrable-types": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-this-alias": "off",
			"@typescript-eslint/no-use-before-define": "off",
			"no-inner-declarations": "off"
		},
		files: ['src/**/*.ts'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				console: 'readonly',
				process: 'readonly'
			}
		}
	}
);
